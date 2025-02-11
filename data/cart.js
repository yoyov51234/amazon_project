export const cart = [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 },
  { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 3 },
];

const timers = [];

export function removeFromCart(productId) {
  const index = cart.findIndex((item) => {
    item.productId === productId;
  });

  cart.splice(index, 1);
}

export function addtoCart(productId) {
  if (timers[productId]) {
    clearTimeout(timers[productId]);
  }

  const matchingProduct = cart.find(
    (cartItem) => cartItem.productId === productId
  );
  const quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  if (!matchingProduct) {
    cart.push({
      productId, //同样也是简写形式
      quantity,
    });
  } else {
    matchingProduct.quantity += quantity;
  }

  const addedEle = document.querySelector(`.js-add-to-cart-${productId}`);
  addedEle.classList.add("added-active");

  timers[productId] = setTimeout(() => {
    addedEle.classList.remove("added-active");
  }, 2000);
}
