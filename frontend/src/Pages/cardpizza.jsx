import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={pizza.img} alt={pizza.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{pizza.name}</h5>
        <p className="card-text">${pizza.price.toLocaleString()}</p>
        

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => addToCart(pizza)}>
            Añadir
          </button>

          <Link to={`/pizza/${pizza.id}`}>
            <button className="btn btn-outline-secondary">Ver más</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
