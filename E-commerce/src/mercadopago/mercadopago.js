//E-commerce\src\mercadopago\mercadopago.js
import { MP_PUBLIC_KEY } from "./config";

export function initMercadoPago() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      if (typeof window.MercadoPago !== "undefined") {
        const mp = new window.MercadoPago(MP_PUBLIC_KEY);
        resolve(mp);
      } else {
        reject(new Error("MercadoPago no está definido después de cargar el script."));
      }
    };
    script.onerror = () => reject(new Error("Error al cargar el SDK de MercadoPago."));
    document.body.appendChild(script);
  });
}

export async function createPreference(cartItems) {
  try {
    console.log("Creando preferencia de pago...");
    const response = await fetch("http://localhost:3001/api/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      throw new Error("No se pudo crear la preferencia de pago.");
    }

    const data = await response.json();
    console.log("Preferencia creada:", data);
    return data.preferenceId;
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    throw error;
  }
}