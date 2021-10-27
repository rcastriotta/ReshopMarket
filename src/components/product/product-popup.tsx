import React from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import { useProductQuery } from '@framework/product/get-product';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { productGalleryPlaceholder } from '@assets/placeholders';
import ProductSeller from './product-seller';
import Divider from '../ui/divider';
import ProductInfo from './product-info';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ProductPopup() {
  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  const router = useRouter();

  const { id } = modalData;
  const { data, isLoading } = useProductQuery(id as string);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="white" size={50} />
      </div>
    );

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.ITEM}/${id}`, undefined, {
      locale: router.locale,
    });
  }

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 pt-4 md:pt-7 2xl:pt-10">
          <div className="lg:flex items-start justify-between">
            <div className="flex-col overflow-hidden">
              <div className="xl:flex items-center justify-center overflow-hidden mb-6 md:mb-8 lg:mb-0">
                {!!data?.gallery?.length ? (
                  <ThumbnailCarousel gallery={data?.gallery} />
                ) : (
                  <div className="w-auto flex items-center justify-center">
                    <Image
                      src={data?.image?.original ?? productGalleryPlaceholder}
                      alt={data?.name!}
                      width={650}
                      height={590}
                    />
                  </div>
                )}
              </div>
              {data?.seller && (
                <div className="hidden lg:block">
                  <Divider className="my-[30px]" />
                  <ProductSeller seller={data.seller} />
                </div>
              )}
            </div>

            {data && (
              <ProductInfo
                navigateToProductPage={navigateToProductPage}
                data={data}
                className="flex-shrink-0 flex flex-col lg:ps-5 xl:ps-8 2xl:ps-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]"
              />
            )}
            {data?.seller && (
              <div className="block lg:hidden">
                <Divider className="my-[30px]" />
                <ProductSeller seller={data.seller} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
