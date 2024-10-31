import express from "express";
import cors from "cors";

//SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";

//Agregar credenciales
const client = new MercadoPagoConfig({
	accessToken: "",
});

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
 
app.get("/", (req, res)  =>{
	res.send("soy el server :");
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
				}
			],
			back_urls: {
				"success": "http://localhost:8080",
				"failure": "http://localhost:8080",
				"pending": "",
			},
			auto_return: "approved",
		};
	
		const preference = new Preference(client);
		const result = await preference.create({body});
		res.json({
			id: result.id,
		});
	}catch(error){
		console.log(error);
		res.status(500)-json({
			error: "Error al crear la preferencia :(",
		})
	};
});
	

app.listen(port, () => {
	console.log("El servidor está corriendo en el puerto 8080");
});

