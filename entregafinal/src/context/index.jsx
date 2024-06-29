import { createContext, useState, useContext } from "react";

export const Context = createContext();

export const UseCartContext = () => useContext(Context);

export function CustomProvider({ children }) {
  const [productsAdded, setProductsAdded] = useState([]);

  const onAdd = (newProduct) => {
    const idProd = productsAdded.findIndex(
      (product) => product.id === newProduct.id
    );

    if (idProd !== -1) {
      productsAdded[idProd].selectedQuantity += newProduct.selectedQuantity;
      setProductsAdded([...productsAdded]);
    } else {
      setProductsAdded([...productsAdded, newProduct]);
    }
  };

  const totalPrice = () =>
    productsAdded.reduce(
      (count, prod) => (count += prod.selectedQuantity * prod.precio),
      0
    );

  const totalQuantity = () =>
    productsAdded.reduce((count, prod) => (count += prod.selectedQuantity), 0);

  const deleteProduct = (id) => {
    setProductsAdded(productsAdded.filter((prod) => prod.id !== id));
  };

  const emptyCart = () => {
    setProductsAdded([]);
  };

  return (
    <Context.Provider
      value={{
        productsAdded,
        onAdd,
        totalPrice,
        totalQuantity,
        deleteProduct,
        emptyCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
