import axios from 'axios';
import { decodeId } from '../../utils/api';
import { shippingRates } from '../../utils/api';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const baseURL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export default async function handler(req, res) {
  const { id, affiliate } = req.body;
  const { price, name, description, gallery, isSold, shippingFee } = await axios
    .get(`${baseURL}/items/${id}`)
    .then(({ data }) => data);
  if (isSold) return res.status(400);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: [shippingRates[Math.floor(shippingFee)]],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    metadata: { sku: decodeId(id), affiliate },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: {
            name,
            description: `${description
              .split(' ')
              .slice(0, 20)
              .join(' ')
              .trim()}...`,
            images: [gallery[0].thumbnail],
          },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round((+price + +shippingFee) * 12),
          product_data: {
            name: 'Tax & fees',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/complete-order?itemId=${id}`,
    cancel_url: `http://localhost:3000/item/${id}`,
  });
  res.send(session.url);
}
