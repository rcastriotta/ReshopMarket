import ContentLoader from 'react-content-loader';

const CategoryListCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={389}
    height={88}
    viewBox="0 0 389 88"
    backgroundColor="#F3F6FA"
    foregroundColor="#E7ECF3"
    className="rounded-md w-full"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="200" height="25" />
    <rect x="350" y="2.5" rx="3" ry="3" width="20" height="20" />
  </ContentLoader>
);

export default CategoryListCardLoader;
