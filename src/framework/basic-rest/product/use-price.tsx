import { useMemo } from 'react';

export function formatPrice({
  amount,
  currencyCode,
  locale,
  showDecimal = true,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
  showDecimal?: boolean;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: showDecimal ? undefined : 0,
    maximumFractionDigits: showDecimal ? undefined : 0,
  });

  return formatCurrency.format(amount);
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const hasDiscount = baseAmount > amount;

  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice({
    amount,
    currencyCode,
    locale,
    showDecimal: false,
  });
  const basePrice = hasDiscount
    ? formatPrice({
        amount: baseAmount,
        currencyCode,
        locale,
        showDecimal: false,
      })
    : null;

  return { price, basePrice, discount };
}

export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
    showDecimal?: boolean;
  } | null
) {
  const { amount, baseAmount, currencyCode, showDecimal = true } = data ?? {};
  const locale = 'en';
  const value = useMemo(() => {
    if (typeof amount !== 'number' || !currencyCode) return '';

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale, showDecimal });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value;
}
