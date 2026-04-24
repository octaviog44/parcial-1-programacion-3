import { PRODUCTS } from "../../../data/data";
const CART_KEY = "cart";

const container = document.getElementById("products");

function renderProducts(products: any[]) {
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${product.nombre}</h3>
      <p>${product.descripcion}</p>
      <p>Precio: $${product.precio}</p>
      <button class="add-btn">Agregar</button>
    `;

    const button = div.querySelector(".add-btn");

    button?.addEventListener("click", () => {
      addToCart(product);
    });

    container.appendChild(div);
  });
}

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}


function saveCart(cart: any[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product: any) {
  const cart = getCart();

  const existing = cart.find((item: any) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      quantity: 1,
    });
  }

  saveCart(cart);
  alert("Producto agregado al carrito");
}
renderProducts(PRODUCTS);