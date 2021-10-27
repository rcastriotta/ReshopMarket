export interface Item {
  id: string | number;
  price: number;
  shippingFee: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  const alreadyExists = !!items.find(
    (existingItem) => existingItem.id === item.id
  );
  if (alreadyExists) return items;
  return [...items, item];
}

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  if (item) return item['quantity']! < item['stock']!;
  return false;
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.price, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum) => sum + 1, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
