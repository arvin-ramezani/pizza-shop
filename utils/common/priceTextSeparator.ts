export default function priceToText(price: number, quantity?: number) {
  let formattedPrice;
  if (typeof quantity === 'number' && quantity > 0) {
    formattedPrice = price * quantity;
  }

  formattedPrice = formattedPrice
    ? `${formattedPrice.toString()}000`
    : `${price.toString()}000`;

  return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
