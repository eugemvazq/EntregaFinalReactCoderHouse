import { UseCartContext } from "@CartContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Checkout = () => {
  const { productsAdded, totalQuantity, totalPrice, deleteProduct, emptyCart } =
    UseCartContext();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isOrdered, setOrdered] = useState(false);
  const [idCompra, setIdCompra] = useState("");
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [emailRepeated, setEmailRepeated] = useState("");
  const [isEmailRepeated, setEmailValidator] = useState(false);

  const handleEmailValidator = () => {
    try {
      if (email.toLowerCase() !== emailRepeated.toLocaleLowerCase()) {
        setEmailValidator(false);
      } else {
        setEmailValidator(true);
      }
    } catch (error) {
      setEmailValidator(false);
      alert(error.message);
    }
  };

  const insertOrder = async () => {
    setLoader(true);
    const order = {
      buyer: { name: "", email: "", phone: "" },
      items: [],
      total: 0,
    };
    order.buyer = { name, email, phone };
    order.items = productsAdded.map((list) => {
      return list;
    });
    order.total = totalPrice();

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, order)
      .then((response) => {
        setIdCompra(response.id);
        setOrdered(true);
        emptyCart();
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    handleEmailValidator();
  }, [email, emailRepeated]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="tittleProductList">Carrito</h1>
          </div>
        </div>
        {loader ? (
          <p>cargando...</p>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              {isOrdered ? (
                <div className="text-center">
                  <div className="circleBag">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="bi bi-bag-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </div>
                  <h1 className="mt-4">Tu compra fue realizada con exito</h1>
                  <h2>Id de la compra {idCompra}</h2>
                </div>
              ) : productsAdded.length > 0 ? (
                <>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Precio</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsAdded.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.selectedQuantity}</td>
                            <td>{data.titulo}</td>
                            <td>{data.categoria}</td>
                            <td>${data.precio * data.selectedQuantity}</td>
                            <td className="text-end">
                              <button
                                onClick={() => deleteProduct(data.id)}
                                className="link-danger"
                              >
                                Eliminar producto
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="text-end my-1">
                    Cantidad total de productos elegidos: {totalQuantity()}
                  </div>
                  <div className="text-end  my-1">Total: $ {totalPrice()}</div>
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={emptyCart}
                      className="btn btn-danger"
                    >
                      Vaciar carrito
                    </button>
                  </div>

                  <h1>Datos personales</h1>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="name" className="col-form-label">
                              Nombre completo:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-md-6">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="phone" className="col-form-label">
                              Telefono:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-md-6">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="email" className="col-form-label">
                              Email:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-md-6">
                        <form>
                          <div className="mb-3">
                            <label
                              htmlFor="repeatEmail"
                              className="col-form-label"
                            >
                              Repetir email:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="repeatEmail"
                              value={emailRepeated}
                              onChange={(e) => setEmailRepeated(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    {!isEmailRepeated && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="alert alert-danger" role="alert">
                            Los mails ingresados no coinciden
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-end">
                          <button
                            type="button"
                            onClick={() => {
                              name.length &&
                                phone.length > 0 &&
                                isEmailRepeated &&
                                insertOrder();
                            }}
                            className={`btn ${
                              name.length && phone.length > 0 && isEmailRepeated
                                ? "btn-primary"
                                : "btn-secondary"
                            }`}
                          >
                            Completar compra
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h2>
                    No tenes agregado ningun producto, pero puedes visitar
                    nuestro catalogo de productos
                  </h2>
                  <Link to={"/"}>
                    <button type="button" className="btn btn-primary">
                      Categoria
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
