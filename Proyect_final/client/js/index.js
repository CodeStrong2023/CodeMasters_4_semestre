// index.js
const shopContent = document.getElementById("shopContent");

//Función del carousel
document.addEventListener("DOMContentLoaded", () =>{
  let currentIndex = 0;//indice de a imagén actual
  const items = document.querySelectorAll(".carousel-item");// Selecciona todos los elementos del carrusel
  
  //Muestra la primera imagen
  items[currentIndex].classList.add("active");

  function showNextImage() {
    //Oculata la imagen actual
    items[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % items.length; // Incrementa el índice
    items[currentIndex].classList.add("active"); // Muestra la siguiente imagen
  }

  function showPreviousImage() {
    items[currentIndex].classList.remove("active"); // Oculta la imagen actual
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Retrocede
    items[currentIndex].classList.add("active"); // Muestra la imagen anterior
  }

  // Cambia la imagen cada 3 segundos (3000 milisegundos)
  setInterval(showNextImage, 3000);

   // Asigna eventos a los botones
  document.querySelector('.next').addEventListener('click', showNextImage);
  document.querySelector('.prev').addEventListener('click', showPreviousImage);

});

// Usar el cart definido en cart.js
products.forEach((product) => {
  const content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <div class="tarjetas">
      <div class="pequeña_tarjeta">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-share"></i>
      </div>
      <div class="image">  
        <img src="${product.img}">
      </div> 
      <div class="product_text"> 
        <h3>${product.productName}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <h3>$${product.price}</h3>
        <div class="product_stars">
          ${generarEstrellas(product.stars)}
        </div>
        <button class="btn add-to-cart text-white" style="border-radius: 20px">Añadir al carrito</button>
      </div>
    </div>  
  `;
  shopContent.append(content);

  const buyButton = content.querySelector(".add-to-cart");
  
  buyButton.addEventListener("click", () => {
    const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quanty++;
        }
        return prod;
      });
    } else {
      cart.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quanty: 1,
        img: product.img,
      });
    }
    saveCart(); // Guardar en localStorage
    updateCartCounter(); // Actualizar contador
  });
});

function generarEstrellas(stars) {
  const estrellasLlenas = Math.floor(stars);
  const mediaEstrella = stars % 1 !== 0;
  let htmlEstrellas = '';

  for (let i = 0; i < estrellasLlenas; i++) {
    htmlEstrellas += '<i class="fa-solid fa-star"></i>';
  }
  if (mediaEstrella) {
    htmlEstrellas += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  while (htmlEstrellas.split('i').length - 1 < 5) {
    htmlEstrellas += '<i class="fa-sharp fa-regular fa-star"></i>';
  }

  return htmlEstrellas;
}