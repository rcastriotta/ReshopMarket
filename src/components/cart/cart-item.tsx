import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useCheckoutMutation } from '@framework/checkout/use-checkout';
import { useUI } from '@contexts/ui.context';
type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItemFromCart } = useCart();
  const { mutate: checkout, isLoading } = useCheckoutMutation();
  const router = useRouter();
  const { closeDrawer } = useUI();

  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal,
    currencyCode: 'USD',
    showDecimal: true,
  });

  const { price: shippingFee } = usePrice({
    amount: item?.shippingFee,
    currencyCode: 'USD',
    showDecimal: true,
  });
  function buyNowPress() {
    checkout({ id: item?.id });
  }
  function navigateToProductPage() {
    closeDrawer();
    router.push(`${ROUTES.ITEM}/${item.id}`, undefined, {
      locale: router.locale,
    });
  }

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center bg-skin-fill py-4 md:py-7 border-b border-skin-one border-opacity-70 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden flex-shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-skin-thumbnail"
        />
        <div
          className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
          onClick={() => removeItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="mb-2 flex w-full overflow-hidden items-start justify-between">
        <div className="ps-3 md:ps-4 space-y-3">
          <span
            onClick={navigateToProductPage}
            className="cursor-pointer block text-skin-base text-13px sm:text-sm lg:text-15px transition-all leading-5 hover:text-skin-primary"
          >
            {item?.name}
          </span>

          <button
            onClick={buyNowPress}
            className={
              'px-5 py-1.5 flex items-center justify-center bg-heading rounded font-semibold text-xs text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90'
            }
          >
            Buy now
          </button>
        </div>

        <div className="in">
          <div className="flex font-semibold text-sm md:text-base text-skin-base leading-5 flex-shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
            {totalPrice}
          </div>
          <div className="flex  text-xs lg:text-sm leading-5 flex-shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
            + {shippingFee}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
