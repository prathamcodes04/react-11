export function CheckoutHeader({logo}) {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <a href="/">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </a>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <a className="return-to-home-link" href="/">
            3 items
          </a>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src="src/assets/images/icons/font-awesome-money-check.svg" />
        </div>
      </div>
    </div>
  );
}
