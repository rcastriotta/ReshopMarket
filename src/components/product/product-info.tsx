import React, { useState, useRef } from 'react';
import Button from '@components/ui/button';
import useWindowSize from '@utils/use-window-size';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductSize from '@components/product/product-size';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { Product } from '../../framework/basic-rest/types';
import Text from '@components/ui/text';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useModalAction } from '@components/common/modal/modal.context';
import { useCheckoutMutation } from '@framework/checkout/use-checkout';
import SocialShareBox from '@components/ui/social-share-box';
import { IoArrowRedoOutline, IoHeartOutline } from 'react-icons/io5';
import Divider from '../ui/divider';
import ShieldIcon from '@components/icons/shield-icon';
import { useEffect } from 'react';

interface Props {
  data: Product;
  className?: string;
  navigateToProductPage?: Function;
}

const ProductInfo: React.FC<Props> = ({
  data,
  className = 'w-full flex flex-col col-span-5 xl:col-span-4 xl:ps-2',
  navigateToProductPage,
}) => {
  const { mutate: checkout, isLoading } = useCheckoutMutation();
  const { addItemToCart, isInCart } = useCart();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const productUrl = useRef('');
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const { t } = useTranslation('common');
  const router = useRouter();

  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.price,
      baseAmount: data.originalPrice,
      currencyCode: 'USD',
      showDecimal: false,
    }
  );
  const { width } = useWindowSize();
  const { price: shippingFee } = usePrice(
    data && {
      amount: data.shippingFee,
      currencyCode: 'USD',
      showDecimal: true,
    }
  );

  useEffect(() => {
    productUrl.current = window.location.toString();
  }, []);

  function addToCart() {
    if (data?.isSold) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(data!);
    addItemToCart(item, item.id);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  function buyNow() {
    if (data?.isSold) return;
    checkout({ id: data?.id });
  }
  return (
    <div className={className}>
      <div className="pb-3 lg:pb-5">
        <div className="md:mb-2.5 block space-y-1.5">
          <small className="md:text-11px ">{data?.lastUpdated}</small>
          {!navigateToProductPage ? (
            <h2 className="noselect text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300">
              {data?.name}
            </h2>
          ) : (
            <div
              className="block"
              onClick={() => navigateToProductPage()}
              role="button"
            >
              <h2 className="noselect text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300 hover:text-skin-primary">
                {data?.name}
              </h2>
            </div>
          )}

          <h4 className="text-skin-primary font-medium">{data?.brand}</h4>
        </div>

        <div className="mt-5 space-y-1.5 xl:space-y-3">
          <div className="flex items-center">
            <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
              {price}
            </div>
            {discount && (
              <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50">
                {basePrice}
              </del>
            )}
          </div>
          <div className="bg-gray-200 pb-0.5 px-3 inline-block rounded">
            <span className="text-skin-base text-xs font-semibold ">
              {data?.shippingFee === 0
                ? 'Free shipping'
                : `+ ${shippingFee} delivery fee`}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
        <Button
          onClick={buyNow}
          className="w-full px-1.5"
          disabled={data?.isSold}
        >
          {!data?.isSold ? t('Buy now') : t('Item sold')}
        </Button>
        {!data?.isSold && (
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative group">
              <Button
                variant="border"
                loading={addToCartLoader}
                className="w-full hover:text-skin-primary"
                onClick={addToCart}
              >
                <CartIcon className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                {t('text-add-to-cart')}
              </Button>
            </div>
            <div className="relative group">
              <Button
                variant="border"
                className={`w-full hover:text-skin-primary ${
                  shareButtonStatus === true && 'text-skin-primary'
                }`}
                onClick={handleChange}
              >
                <IoArrowRedoOutline className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                {t('text-share')}
              </Button>
              <SocialShareBox
                className={`absolute z-10 end-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                  shareButtonStatus === true
                    ? 'visible opacity-100 top-full'
                    : 'opacity-0 invisible top-[130%]'
                }`}
                shareUrl={productUrl.current}
              />
            </div>
          </div>
        )}
      </div>

      <div className="text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-6 mt-4">
        {data?.size && <ProductSize size={data?.size} />}
        {data?.condition && (
          <div>
            <h4 className="text-15px text-skin-base text-opacity-100 font-medium capitalize">
              Condition
            </h4>
            <span>{data?.condition}</span>
          </div>
        )}
        <div className="noselect">
          <h4 className="text-15px text-skin-base text-opacity-100 font-medium capitalize ">
            Description
          </h4>
          {!navigateToProductPage ? (
            <p>{data?.description}</p>
          ) : (
            <Text variant="small">
              {data?.description?.split(' ').slice(0, 40).join(' ')}
              {'...'}
              <span
                onClick={() => navigateToProductPage()}
                role="button"
                className="text-skin-primary ms-0.5"
              >
                {t('text-read-more')}
              </span>
            </Text>
          )}
        </div>

        <h4 className="text-15px p-0 text-skin-base text-opacity-100 font-medium capitalize ">
          Shipping
        </h4>
        <span className="p-0">
          {shippingFee} | {data.shippingETA} | Ships from {data.shipsFrom}
        </span>
        {!!data?.tag?.length && (
          <ul>
            <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
              <LabelIcon className="me-2" /> {t('text-tags')}:
            </li>
            {data?.tag?.map((item: any) => (
              <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                <TagLabel data={item} />
              </li>
            ))}
          </ul>
        )}
        <Divider />
        <div className="items-center space-x-5 flex p-4 border rounded border-text-skin-base dot">
          <ShieldIcon height="50" width="50" />
          <div>
            <h3 className="text-15px p-0 text-skin-base text-opacity-100 font-medium capitalize ">
              Buyer Protection
            </h3>
            <p className="p-0 leading-snug text-xs lg:text-sm lg:leading-normal">
              Receive your item as described or your money back for eligible
              orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
