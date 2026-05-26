import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDeatilsGrid";

export function OrderGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            < OrderHeader order={order} />

            {/* displays list of products inside order */}
            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  );
}
