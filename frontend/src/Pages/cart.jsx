import { useState } from "react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const { token } = useUser();
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("¡Compra realizada con éxito!");
      } else {
        setMessage(data.error || "Error al procesar la compra.");
      }
    } catch (error) {
      setMessage("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Detalles del pedido:</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="list-group">
          {cart.map((pizza) => (
            <li
              key={pizza.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <img src={pizza.img} alt={pizza.name} width="50" className="me-3" />
              <span>{pizza.name} - ${pizza.price.toLocaleString()}</span>
              <div>
                <button onClick={() => removeFromCart(pizza.id)} className="btn btn-outline-danger">
                  -
                </button>
                <span className="mx-2">{pizza.quantity}</span>
                <button onClick={() => addToCart(pizza)} className="btn btn-outline-primary">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-3">Total: ${total.toLocaleString()}</h3>

      <button
        className="btn btn-success mt-3"
        disabled={!token || cart.length === 0}
        onClick={handleCheckout}
      >
        Pagar
      </button>

      {!token && <p className="text-danger mt-2">Debes estar logueado para pagar.</p>}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Cart;
