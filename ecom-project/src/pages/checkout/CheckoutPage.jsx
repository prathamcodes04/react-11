import axios from "axios";
import "./CheckoutPage.css";
import "./checkout-header.css";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PayementSummary";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async() => {
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(response.data);
    }

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };

    fetchPaymentSummary();
}, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader logo={logo} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
