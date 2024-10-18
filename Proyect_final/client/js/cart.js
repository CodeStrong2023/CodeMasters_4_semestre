const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = ""; // Clear the modal content
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // modal Header
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  // modal Body
  if (cart.length > 0) {
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
        <div class="product">
            <img class="product-img" src="${product.img}" />
            <div class="product-info">
                <h4>${product.productName}</h4>
            </div>
            <div class="quantity">
                <span class="quantity-btn-decrease">-</span>
                <span class="quantity-input">${product.quanty}</span>
                <span class="quantity-btn-increase">+</span>
            </div>
            <div class="price">${product.price * product.quanty} $</div>
            <div class="delete-product">❌</div>
        </div>
      `;
      modalContainer.append(modalBody);

      const decrease = modalBody.querySelector(".quantity-btn-decrease");
      decrease.addEventListener("click", () => {
        if (product.quanty > 1) {
          product.quanty--;
        } else {
          cart = cart.filter((item) => item.id !== product.id);
        }
        displayCart();
        displayCartCounter();
      });

      const increase = modalBody.querySelector(".quantity-btn-increase");
      increase.addEventListener("click", () => {
        product.quanty++;
        displayCart();
        displayCartCounter();
      });

      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(product.id);
      });
    });

    // modal Footer
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
      <div class="total-price">Total: ${cart.reduce(
        (acc, item) => acc + item.price * item.quanty,
        0
      )} $</div>
      <button class="btn-primary" id="checkout-btn">Go to checkout</button>
      <div id="wallet_container"></div>
    `;
    modalContainer.append(modalFooter);

    // Mercado Pago integration
    const mp = new MercadoPago("APP_USR-50a86a18-e45d-4225-b49a-fc1f782a6bb6", {
      locale: "es-AR",
    });

    const generateCartDescription = () => {
      return cart.map(product => `${product.productName} (x${product.quanty})`).join(', ');
    };

    document.getElementById("checkout-btn").addEventListener("click", async () => {
      try {
        const total = cart.reduce((acc, item) => acc + item.price * item.quanty, 0);
        const orderData = {
          title: generateCartDescription(),
          quantity: 1,
          price: total,
        };

        const response = await fetch("http://localhost:3000/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al crear la preferencia");
      }
    });

    // Function to create the Mercado Pago checkout button
    const createCheckoutButton = (preferenceId) => {
      // Remove the existing checkout button
      const existingCheckoutButton = document.querySelector(".mercadopago-button");
      if (existingCheckoutButton) {
        existingCheckoutButton.remove();
      }

      const walletContainer = document.getElementById("wallet_container");
      walletContainer.innerHTML = ""; // Clear previous content

      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: "#wallet_container",
          label: "Pagar con Mercado Pago",
        },
      });
    };

  } else {
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.className = "empty-cart";
    emptyCartMessage.innerHTML = `<h4>Tu carrito está vacío</h4>`;
    modalContainer.append(emptyCartMessage);
  }
};

const deleteCartProduct = (id) => {
  cart = cart.filter((product) => product.id !== id);
  displayCart();
  displayCartCounter();
};

cartBtn.addEventListener("click", () => {
  displayCart();
});