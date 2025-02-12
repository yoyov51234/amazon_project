import { cart, getCartTotal } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../untils/money.js";

export function renderPaymentSummary() {
  let totalProductCents = 0;
  let totalDeliveryFeeCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliverOption = getDeliveryOption(cartItem.deliveryOptionId);
    totalProductCents += product.priceCents * cartItem.quantity;
    totalDeliveryFeeCents += deliverOption.priceCents;
  });

  const totalBeforeTaxCents = totalDeliveryFeeCents + totalProductCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = ` <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${getCartTotal()}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalProductCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalDeliveryFeeCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
