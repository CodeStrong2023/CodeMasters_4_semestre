//E-commerce\src\App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import { useCart } from "./hooks/useCart";
import { initMercadoPago, createPreference } from "./mercadopago/mercadopago";

function App() {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpaty,
    cartTotal,
  } = useCart();

  useEffect(() => {
    initMercadoPago();
  }, []);

  const handlePayment = async () => {
    try {
      console.log("Iniciando proceso de pago...");
      const preferenceId = await createPreference(cart);
      console.log("Preference ID recibido:", preferenceId);
      
      // Iniciar el checkout de Mercado Pago
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
    }
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpaty={isEmpaty}
        cartTotal={cartTotal}
        handlePayment={handlePayment}
      />

      <main className="container-xl mt-5">
        <h1 className="text-center">Nuestra Colección</h1>

        <div className="row mt-5">
          {db.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;