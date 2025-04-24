import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";

const PizzaDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`http://localhost:5002/api/pizzas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrada");
        return res.json();
      })
      .then((data) => {
        setPizza(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar pizza:", err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando pizza...</p>;
  if (notFound || !pizza) return <p>Pizza no encontrada</p>;

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <img src={pizza.img} className="card-img-top" alt={pizza.name} />
        <div className="card-body">
          <h2 className="card-title">{pizza.name}</h2>
          <p>Ingredientes:</p>
          <ul>
            {pizza.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
          <h4 className="mt-3">Precio: ${pizza.price.toLocaleString()}</h4>
          <button className="btn btn-success mt-3" onClick={() => addToCart(pizza)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
