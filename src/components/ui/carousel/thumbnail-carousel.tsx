import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect } from 'react';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  containerClassName?: string;
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = ' xl:w-[480px] 2xl:w-[650px] h-[480px] 2xl:h-[650px] ',
  galleryClassName = 'xl:w-28 2xl:w-[130px]',
  containerClassName = 'xl:h-[480px] 2xl:h-[650px]',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<Number>(0);
  const { locale } = useRouter();
  const dir = getDirection(locale);

  useEffect(() => {
    const doc = document.getElementById('thumbnail-scroll');
    if ((doc?.clientHeight || 0) < (doc?.scrollHeight || 0)) {
      doc?.classList.add('xl:w-[120px]');
    }
  }, []);

  return (
    <div
      className={`w-full  xl:flex xl:flex-row-reverse ${containerClassName} overflow-hidden`}
    >
      <div
        className={cn(
          'xl:ms-5 w-full mb-2.5 md:mb-3 border-2 border-skin-base overflow-hidden rounded-md relative',
          thumbnailClassName
        )}
      >
        <Swiper
          onSwiper={setSwiper}
          id="productGallery"
          thumbs={{ swiper: thumbsSwiper }}
          onActiveIndexChange={({ activeIndex }) => setActiveIndex(activeIndex)}
          modules={[Navigation, Thumbs]}
          className="h-full w-full"
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide key={`product-gallery-${item.id}`}>
              <Image
                src={item?.original ?? productGalleryPlaceholder}
                alt={`Product gallery ${item.id}`}
                layout="fill"
                objectFit="cover"
                className="position-relative noselect"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-fill  transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}
      <div
        className={`flex xl:inline flex-shrink-0 overflow-y-auto overflow-x-auto `}
        id="thumbnail-scroll"
      >
        {gallery?.map((item: any, i: Number) => (
          <div
            key={`thumbnail-${i}`}
            onClick={() => swiper?.slideTo(i)}
            className={`${
              activeIndex === i ? 'border-skin-primary' : ''
            } w-[80px] h-[80px] xl:h-[100px] xl:w-[100px] mr-1 flex-shrink-0  xl:mr-0 mt-1 xl:mb-1 xl:mt-0 cursor-pointer rounded overflow-hidden border-2 border-skin-base transition hover:opacity-75`}
          >
            <Image
              src={item?.thumbnail ?? productGalleryPlaceholder}
              alt={`Product thumb gallery ${item.id}`}
              width={100}
              height={100}
              className="position-relative noselect"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
