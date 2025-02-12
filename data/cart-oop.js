const cart = {
  cartItems: undefined,
  timers: [],
  loadFromlocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 3,
          deliveryOptionId: "2",
        },
      ];
    }
  },
  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
  },
  getCartTotal() {
    let number = 0;
    this.cartItems.forEach((element) => {
      number += element.quantity;
    });

    return number;
  },
  removeFromCart(productId) {
    /*
      const index = cart.findIndex((item) => {
        return item.productId == productId;
      });

      //   console.log(index);
      if (index >= 0) {
        cart.splice(index, 1);
      } else {
        console.log("no product is found");
      }

      console.log(cart);*/

    this.cartItems = this.cartItems.filter((e) => e.productId != productId);
    this.saveToStorage();
  },
  addtoCart(productId) {
    if (this.timers[productId]) {
      clearTimeout(this.timers[productId]);
    }

    const matchingProduct = this.cartItems.find(
      (cartItem) => cartItem.productId == productId
    );
    const quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );

    if (!matchingProduct) {
      this.cartItems.push({
        productId, //同样也是简写形式
        quantity,
        deliveryOptionId: "1",
      });
    } else {
      matchingProduct.quantity += quantity;
    }

    const addedEle = document.querySelector(`.js-add-to-cart-${productId}`);
    addedEle.classList.add("added-active");

    this.timers[productId] = setTimeout(() => {
      addedEle.classList.remove("added-active");
    }, 2000);

    this.saveToStorage();
  },
  updateCartQuantity(productId, quantity) {
    const item = this.cartItems.find((e) => e.productId === productId);
    item.quantity = quantity;
    this.saveToStorage();
  },
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingProduct = cartItem;
      }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  },
};

cart.loadFromlocalStorage();
console.log(cart);
