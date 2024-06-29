import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);

  const fetchUserData = async () => {
    await getDocs(collection(db, "amimevaRopa"))
      .then((response) => {
        const obtenerDocumentos = response.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }));

        const filtredData = obtenerDocumentos.filter((rp) => {
          return rp.id === itemId;
        });

        setProducts(filtredData[0]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {loader ? (
        <p>cargandoooo</p>
      ) : products ? (
        <div className="d-flex flex-column flex-grow-1">
          <ItemDetail items={products} />
        </div>
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
};

export default ItemDetailContainer;
