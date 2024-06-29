import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ items }) => {
  const { imagen, nombre, detalle, precio } = items;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Detalle de producto</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <img className="w-100" src={imagen} alt={nombre} />
        </div>
        <div className="col-lg-6">
          <h2>{nombre}</h2>
          <p>{detalle}</p>
          <p>Precio: ${precio}</p>
          <ItemCount className="itemCount pr-2" item={items} />
          <Link to="/cart">
            <button className="btn btn-secondary">Terminar mi compra</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
