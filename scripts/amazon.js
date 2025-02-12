import { cart, addtoCart, getCartTotal } from "../data/cart.js";
import { products } from "../data/products.js";
//here  we can use alias to name cart to avoid naming conflicts import { cart as myCart} from "../data/cart.js";
//import的另一种语法  import * as cartModule from "../data/cart.js";  这样会把所有在cart.js里面注明export的都import 进来

let productsHTML = "";

products.forEach((product) => {
  const isShow = product.type === "clothing" ? "display" : "hidden";

  productsHTML += `  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${
              product.id
            }" data-product-id=${product.id}>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>
          <div class="size-chart-link js-size-chart-link ${isShow}"> <a href="${
    product.sizeChartLink
  }" target ="_blank">Size Chart</a> </div>

          <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>`;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

// let cart = JSON.parse(localStorage.getItem("cart")) || 0;

// function updateCartQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//   });

// }

document.querySelector(".js-cart-quantity").innerText = getCartTotal();

document.querySelectorAll(".js-add-to-cart-button").forEach((item) => {
  item.addEventListener("click", () => {
    const productId = item.dataset.productId;
    // const {productId} = item.dataset; 简写形式
    addtoCart(productId);

    document.querySelector(".js-cart-quantity").innerText = getCartTotal();
  });
});

function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
