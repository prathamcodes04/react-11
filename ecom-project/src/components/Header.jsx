import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import logoWhite from "../assets/images/logo-white.png";
import { useState } from "react";

export function Header({ cart = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  const [search, setSearch] = useState(searchText || '');

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  const handleLogoClick = (event) => {
    if (location.pathname === "/") {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link" onClick={handleLogoClick}>
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={"images/mobile-logo-white.png"} />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={updateSearchInput}
        />

        <button className="search-button" onClick={searchProducts}>
          <img
            className="search-icon"
            src="src/assets/images/icons/search-icon.png"
          />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src="src/assets/images/icons/cart-icon.png"
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
