export const cart = [];

const timers = [];

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
