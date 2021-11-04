import { NextSeo, NextSeoProps } from 'next-seo';
const Seo = ({ title, description, path, images }: any) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
        title,
        description,
        images: Array.isArray(images)
          ? images
          : [
              {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/og-image-01.png`,
                width: 680,
                height: 800,
                alt: 'Og Image Alt',
              },
            ],
      }}
    />
  );
};

export default Seo;
