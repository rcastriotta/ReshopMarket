import { useTranslation } from 'next-i18next';
import { Attachment } from '@framework/types';
import useWindowSize from '@utils/use-window-size';
import Breadcrumb from '@components/ui/breadcrumb';

interface HeaderProps {
  backgroundThumbnail?: Attachment;
  heroTitle?: string;
  mobileBackgroundThumbnail?: Attachment;
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.png',
  heroTitle = 'text-page-title',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg-mobile.png',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className="flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full bg-cover bg-no-repeat bg-center page-header-banner"
      style={{
        backgroundImage: `url(${
          width! > 480 ? backgroundThumbnail : mobileBackgroundThumbnail
        })`,
      }}
    >
      <div className="w-full flex flex-col items-center justify-center relative">
        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-[40px] font-bold text-skin-base text-center">
          <span className="font-manrope block font-bold mb-3 md:mb-4 lg:mb-5 2xl:mb-7 ">
            {t(`${heroTitle}`)}
          </span>
        </h2>
        <Breadcrumb />
      </div>
    </div>
  );
};

export default PageHeroSection;
