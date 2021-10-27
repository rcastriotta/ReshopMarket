import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import Text from '@components/ui/text';
import { useForm } from 'react-hook-form';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useUI } from '@contexts/ui.context';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
type Props = {
  buttonText?: string;
  getToken?: any;
};
const StripeForm: React.FC<Props> = ({ buttonText, getToken }) => {
  // Get a reference to Stripe or Elements using hooks.
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Use elements.getElement to get a reference to the mounted Element.
    const cardElement: any = elements.getElement(CardElement);

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    const { token } = await stripe.createToken(cardElement);
    getToken(token);
    if (token) {
      console.log(token, 'token');
    }
  };

  return (
    <div className="w-full bg-white rounded-xl xl:w-[500px]">
      <h3 className="text-skin-base opacity-60 mb-3">Enter card info</h3>
      <CardElement />
      <Button
        className="h-11 md:h-12  mt-5"
        type="button"
        onClick={handleSubmit}
        variant="formButton"
      >
        {buttonText ? buttonText : 'Pay Now'}
      </Button>
    </div>
  );
};

type Item = {
  item: {
    price: any;
    buttonText: string;
  };
};

const StripePaymentForm = ({ item: { price, buttonText } }: Item) => {
  const sendTokenToServer = async (token: any) => {};

  return (
    <Elements stripe={stripePromise}>
      <StripeForm
        getToken={(token: any) => sendTokenToServer(token)}
        buttonText={buttonText}
      />
    </Elements>
  );
};

export default StripePaymentForm;
