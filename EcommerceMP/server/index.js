import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";


// agregar credenciales

const client = new MercadoPagoConfig({
  access_token:"TEST-2760494553901973-091619-35ee44502f5cc095aaaf6dc7fcb96bf6-657890611"
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
      const preference = {
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
  
      const result = await mercadopago.preferences.create({ preference });
      res.json({
        id: result.body.id,
      });
    } catch (error) {
      console.error("Error creating preference:", error);
      res.status(500).json({ error: "An error occurred while creating the preference" });
    }
  });

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${3000}`)
});

//5031 7557 3453 0604