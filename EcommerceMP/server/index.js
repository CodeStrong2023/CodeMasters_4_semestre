import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

// agregar credenciales
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-1160660466312499-092315-3c58f5fb00de223a71ac4953764a2f38-1995390814",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("soy el server");
});

app.post("/create_preference", async (req, res) => {
    try {
      const body = {
        items: [
          {
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://www.youtube.com/@virginiacastellano1789",
          failure: "https://www.youtube.com/@virginiacastellano1789",
          pending: "https://www.youtube.com/@virginiacastellano1789",
        },
        auto_return: "approved",
      };
  
      const preference = new Preference(client);
      const result = await preference.create({ body });
      res.json({
        id: result.id,
      });
    } catch (error) {
      console.error("Error creating preference:", error);
      res.status(500).json({ error: "An error occurred while creating the preference" });
    }
  });

app.listen(port, () => {
  console.log("The server is now running on Port 3000");
});