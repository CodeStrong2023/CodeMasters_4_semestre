//E-commerce\server.js
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "./src/data/db.js";

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

const client = new MercadoPagoConfig({
  accessToken: "TEST-1027613778018798-091619-0ac2e40d26b9e09085d039ee622197a3-239972847",
});

app.post("/api/create-preference", async (req, res) => {
    try {
      console.log("Recibida solicitud para crear preferencia:", req.body);
  
      const { items } = req.body;
  
      const itemsForPreference = items.map((item) => {
        const product = db.find((p) => p.id === item.id);
        if (!product) {
          throw new Error(`Producto no encontrado para el ID: ${item.id}`);
        }
        return {
            title: product.name,
            unit_price: Number(product.price),
            quantity: Number(item.quantity),
            currency_id: "ARS",
            description: product.description,
            picture_url: `http://localhost:3001/img/${product.image}.jpg`, // Añadir esta línea
          };
          
      });
  
      console.log("Items for preference:", itemsForPreference); // Añadir esta línea

      
  
      const preference = new Preference(client);
      const result = await preference.create({
        items: itemsForPreference,
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
        auto_return: "approved",
        notification_url: "https://your-domain.com/webhook", // Reemplaza con tu URL de webhook
      });
  
      console.log("Preferencia creada:", result);
      res.json({ preferenceId: result.id });
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      res.status(500).json({
        error: "Ocurrió un error al crear la preferencia",
        details: error.message,
      });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});