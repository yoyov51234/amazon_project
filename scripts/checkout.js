import {
  cart,
  removeFromCart,
  getCartTotal,
  updateCartQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./untils/money.js";

// let cartSummaryHtml = "";
function renderCartHtml() {
  let cartSummaryHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    //   const matchingProduct = products.forEach((product) => {
    //     if (product.id == productId) {
    //       return product;
    //     }
    //   });
    // foreach 没有 返回值， 就算写了return 也没有返回值； 它的返回值是undefined， 所以要用下面这种写法

    let matchingProduct;
    products.forEach((product) => {
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }" data-product-id=${matchingProduct.id}>
                  <div class="delivery-date">Delivery date: Wednesday, June 15</div>
      
                  <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
      
                    <div class="cart-item-details">
                      <div class="product-name">${matchingProduct.name}</div>
                      <div class="product-price">$${formatCurrency(
                        matchingProduct.priceCents
                      )}</div>
                      <div class="product-quantity">
                        <span> Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span> </span>
                        <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id=${
                          matchingProduct.id
                        }>
                          Update
                        </span>
                          <input class="quantity-input">
                        <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id=${
                          matchingProduct.id
                        }>Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                          matchingProduct.id
                        }>
                          Delete
                        </span>
                      </div>
                    </div>
      
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
      
                      <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${
                          matchingProduct.id
                        }">
                        <div>
                          <div class="delivery-option-date">Tuesday, June 21</div>
                          <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${
                          matchingProduct.id
                        }">
                        <div>
                          <div class="delivery-option-date">Wednesday, June 15</div>
                          <div class="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${
                          matchingProduct.id
                        }">
                        <div>
                          <div class="delivery-option-date">Monday, June 13</div>
                          <div class="delivery-option-price">$9.99 - Shipping</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  });

  document.querySelector(".js-checkout-header-middle-section").innerText =
    getCartTotal() + " items";

  document.querySelector(".order-summary").innerHTML = cartSummaryHtml;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderCartHtml();

      //then remove a productId from the cart
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container
        .querySelector(".quantity-input")
        .classList.add("is-editing-quantity");

      container
        .querySelector(".save-quantity-link")
        .classList.add("is-editing-quantity");

      container
        .querySelector(".js-update-quantity-link")
        .classList.add("is-editing-quantity-update");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      const updatedQuantity = Number(
        container.querySelector(".quantity-input").value
      );
      console.log(updatedQuantity);
      if (!checkQuantityLimit(updatedQuantity)) {
        // 如果数量不符合条件，给出反馈并让用户继续修改
        container.querySelector(".quantity-input").classList.add("input-error"); // 给输入框添加错误样式
        container.querySelector(".quantity-input").focus(); // 聚焦到输入框
        return;
      }
      updateCartQuantity(productId, updatedQuantity);
      renderCartHtml();
    });
  });
}

function checkQuantityLimit(quantity) {
  if (quantity < 0 || quantity > 1000) {
    alert("The quantity should be in this range [0,1000)");
    return false;
  }
  return true;
}
renderCartHtml();
