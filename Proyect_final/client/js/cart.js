const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = ""; // Limpiar el contenido previo del modal
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // modal Header
  const modalHeader = document.createElement("div");

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
        <div class="products">
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

      const decrese = modalBody.querySelector(".quantity-btn-decrease");
      decrese.addEventListener("click", () => {
        if (product.quanty > 1) {
          product.quanty--;
        } else {
          // Eliminar el producto del carrito si la cantidad es 1
          cart = cart.filter((item) => item.id !== product.id);
        }
        displayCart(); // Actualizar el modal
        displayCartCounter();
      });

      const increse = modalBody.querySelector(".quantity-btn-increase");
      increse.addEventListener("click", () => {
        product.quanty++;
        displayCart(); // Actualizar el modal
        displayCartCounter();
      });

      // Funcionalidad para eliminar el producto
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
        <button class="btn-primary" id="checkout-btn"> go to checkout </button>
       <div id="wallet_container"></div>
  `;
    modalContainer.append(modalFooter);
    // mp public key
    const mp = new MercadoPago("APP_USR-50a86a18-e45d-4225-b49a-fc1f782a6bb6", {
      locale: "es-AR",
    });

    //funcion para crear titulo del la info del carrito 
    const generateCartDescription = () => {
        return cart.map(product => `${product.name} (x${product.quanty})`).join(', ');
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
          console.error("Error:", error); // Log the error for debugging
          alert("Hubo un error al crear la preferencia");
        }
      });
      

      let isButtonCreated = false; // Flag to check if the Mercado Pago button is already created

      const createCheckoutButton = (preferenceId) => {
        if (isButtonCreated) return; // Prevent multiple buttons from being created
      
        const bricksBuilder = mp.bricks();
      
        const renderComponent = async () => {
          if (window.checkoutButton) window.checkoutButton.unmount(); // Clean previous button if it exists
      
          await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
              preferenceId: preferenceId,
            },
          });
      
          isButtonCreated = true; // Set the flag to true after the button is created
        };

      renderComponent();
    };
  } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "your cart is empty";
    modalContainer.append(modalText);
  }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = cart.findIndex((element) => element.id === id);
  cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
};

const displayCartCounter = () => {
  const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
  if (cartLength > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  } else {
    cartCounter.style.display = "none";
  }
};
