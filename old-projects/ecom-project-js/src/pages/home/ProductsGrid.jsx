import { Products } from "./Products";

export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Products key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
