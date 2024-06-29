import { Link } from "react-router-dom";

const ItemList = ({ items }) => {
  return (
    <div className="container">
      <div className="row">
        {items.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-4 ">
            <div className="card my-2">
              <Link to={`/item/${item.id}`}>
                <img
                  className="card-img-top"
                  src={item.imagen}
                  alt={item.nombre}
                  loading="lazy"
                />
              </Link>
              <div className="card-body">
                <h2 className="card-title">{item.nombre}</h2>
                <p className="card-text">{item.detalle}</p>
                <p className="card-text">Precio: ${item.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
