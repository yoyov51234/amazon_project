export const deliveryOptions = [
  //export default const deliveryOptions - 这样会报错
  { id: "1", deliveryDays: 7, priceCents: 0 },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  { id: "3", deliveryDays: 1, priceCents: 999 },
];

export function getDeliveryOption(deliverOptionId) {
  return (
    deliveryOptions.find((deliveryOption) => {
      return deliveryOption.id == deliverOptionId;
    }) || deliveryOptions[0]
  );
}
