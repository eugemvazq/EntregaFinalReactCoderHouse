import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import ItemList from "./ItemList";

function ItemListContainer() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchUserData = async () => {
    await getDocs(collection(db, "amimevaRopa"))
      .then((response) => {
        const obtenerDocumentos = response.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }));
        let data = obtenerDocumentos;
        if (typeof categoryId !== "undefined") {
          data = obtenerDocumentos.filter((x) => {
            return x.categoria === categoryId;
          });
        }
        setProducts(data);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [categoryId]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <h1>Lista de Productos</h1>
      {loader ? (
        <p>Cargando...</p>
      ) : products.length > 0 ? (
        <ItemList items={products} />
      ) : (
        <p>No hay productos</p>
      )}
    </div>
  );
}

export default ItemListContainer;
