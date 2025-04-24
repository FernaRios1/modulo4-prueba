// controllers/pizza.controller.js

const pizzas = [
  {
    id: 1,
    name: "Napolitana",
    price: 5950,
    ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
    img: "http://localhost:5002/img/napolitana.png"
  },
  {
    id: 2,
    name: "Española",
    price: 6950,
    ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
    img: "http://localhost:5002/img/espanola.png"
  },
  {
    id: 3,
    name: "Pepperoni",
    price: 6950,
    ingredients: ["mozzarella", "pepperoni", "orégano"],
    img: "http://localhost:5002/img/peperoni.png"
  }
];

export const pizzaController = {
  readPizzas: (req, res) => {
    res.json(pizzas);
  },
  readPizza: (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = pizzas.find((p) => p.id === id);
    if (pizza) {
      res.json(pizza);
    } else {
      res.status(404).json({ error: "Pizza not found" });
    }
  }
};
