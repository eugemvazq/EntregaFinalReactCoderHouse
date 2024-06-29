import { useState } from "react";
import { UseCartContext } from "@CartContext";

const ItemCount = ({ stock, item }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { onAdd } = UseCartContext();

  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecrement = () => {
    setSelectedQuantity(selectedQuantity - 1);
  };

  const handleAddToCart = () => {
    onAdd({ ...item, selectedQuantity });
  };

  return (
    <>
      <div className="mb-2">
        <button
          className="btn btn-secondary  m-2"
          onClick={handleDecrement}
          disabled={selectedQuantity <= 1}
        >
          -
        </button>
        <span className="item-count">{selectedQuantity}</span>
        <button
          className="btn btn-secondary m-2"
          onClick={handleIncrement}
          disabled={selectedQuantity >= stock}
        >
          +
        </button>
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          disabled={selectedQuantity > stock || selectedQuantity < 1}
        >
          Agregar al Carrito
        </button>
        {selectedQuantity > stock && (
          <p className="item-count-error">No hay suficiente stock</p>
        )}
      </div>
    </>
  );
};

export default ItemCount;
