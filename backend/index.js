import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // 👈
import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import pizzaRoute from "./routes/pizza.route.js";
const app = express();

const __filename = fileURLToPath(import.meta.url); // 👈
const __dirname = path.dirname(__filename); // 👈

// 👇 Aquí servimos los archivos estáticos correctamente:
app.use("/img", express.static(path.join(__dirname, "public/img")));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/checkouts", checkoutRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
