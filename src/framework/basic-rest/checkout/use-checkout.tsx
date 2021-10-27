import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';
import Router from 'next/router';
import { getData } from '../../../pages/api/checkout';
export interface CheckoutType {
  id: string | number;
}

async function checkout(input: CheckoutType) {
  const affiliate = sessionStorage.getItem('affiliate');
  return getData({ ...input, affiliate });
}

export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutType) => checkout(input), {
    onSuccess: ({ data: url }) => {
      Router.push(url);
    },
    onError: () => {
      alert(`Couldn't load checkout page`);
    },
  });
};
