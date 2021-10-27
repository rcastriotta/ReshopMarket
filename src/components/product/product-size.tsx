interface Props {
  size?: string;
}

const ProductSize: React.FC<Props> = ({ size }) => {
  return (
    <div className="inline-block">
      <h4 className="text-15px text-skin-base text-opacity-100 font-medium mb-3 capitalize">
        Size
      </h4>

      <div
        className={
          'sm-auto rounded border h-9 md:h-10 p-1 me-2 flex justify-center items-center font-medium text-sm md:text-15px text-skin-base px-3 border-skin-primary text-skin-primary'
        }
      >
        {size}
      </div>
    </div>
  );
};

export default ProductSize;
