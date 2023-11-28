import "../assets/stylesheets/AppHeader.scss";

import GeekUpLogo from "../assets/images/geekup-logo.svg";

const AppHeader = () => {
  return (
    <header className="app-header">
      <section className="app-header__container">
        <a className="app-header__container__image" href="/">
          <img src={GeekUpLogo} alt="GeekUp Logo" />
        </a>
      </section>
    </header>
  );
};

export default AppHeader;
