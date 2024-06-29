import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to={"/"}>
          Ropa store
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/category/vestido"}>
                vestido
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/category/pantalon"}>
                pantalon
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/category/remera"}>
                remera
              </Link>
            </li>
          </ul>
        </div>

        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;
