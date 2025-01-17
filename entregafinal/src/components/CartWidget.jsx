import { Link } from "react-router-dom";
import { UseCartContext } from "@CartContext";

const CartWidget = () => {
  const { productsAdded } = UseCartContext();

  return (
    <div>
      <Link to={"/cart"}>
        <div className="d-flex">
          <svg
            width={30}
            id="i-cart"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
            <circle cx="25" cy="27" r="2" />
            <circle cx="12" cy="27" r="2" />
          </svg>
          <p className="m-2">{productsAdded.length}</p>
        </div>
      </Link>
    </div>
  );
};

export default CartWidget;
