const shopContent = document.getElementById("shopContent");
const cart = [];

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
        <a href="#" class="btn">Añadir al carrito</a>
      </div>
    </div>  
  `;
  shopContent.append(content);

  const buyButton = content.querySelector(".btn");
  
  buyButton.addEventListener("click", () => {
    const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quanty++;
        }
      });
    } else {
      cart.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quanty: 1,
        img: product.img,

      });
      displayCartCounter();
    }
  });

  // Función para generar las estrellas de calificación
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

// Función para actualizar el contador del carrito
  function displayCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  cartCounter.innerText = cart.reduce((acc, prod) => acc + prod.quanty, 0);
}
});
