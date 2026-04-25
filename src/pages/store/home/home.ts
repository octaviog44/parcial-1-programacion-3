import { PRODUCTS, getCategories } from "../../../data/data";

const CART_KEY = "cart";

const container = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search") as HTMLInputElement;

// -------------------
// CARRITO
// -------------------
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
}

function getProductQuantity(id: number): number {
  const cart = getCart();
  const item = cart.find((i: any) => i.id === id);
  return item ? item.quantity : 0;
}

function removeOneFromCart(id: number) {
  const cart = getCart();

  const item = cart.find((i: any) => i.id === id);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    const newCart = cart.filter((i: any) => i.id !== id);
    saveCart(newCart);
  } else {
    saveCart(cart);
  }

  renderProducts(PRODUCTS);
}

// -------------------
// RENDER PRODUCTOS
// -------------------
function renderProducts(products: any[]) {
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");

    const quantity = getProductQuantity(product.id);

    div.innerHTML = `
      <h3>${product.nombre}</h3>
      <p>${product.descripcion}</p>
      <p>Precio: $${product.precio}</p>

      <div>
        <button class="minus-btn">-</button>
        <span>${quantity}</span>
        <button class="plus-btn">+</button>
      </div>
    `;

    const plusBtn = div.querySelector(".plus-btn") as HTMLButtonElement;
    const minusBtn = div.querySelector(".minus-btn") as HTMLButtonElement;

    plusBtn?.addEventListener("click", () => {
      addToCart(product);
      renderProducts(PRODUCTS);
    });

    minusBtn?.addEventListener("click", () => {
      removeOneFromCart(product.id);
    });

    container.appendChild(div);
  });
}

// -------------------
// CATEGORIAS
// -------------------
function renderCategories() {
  if (!categoriesContainer) return;

  const categories = getCategories();

  categoriesContainer.innerHTML = "";

  categories.forEach((cat) => {
    const button = document.createElement("button");

    button.textContent = cat.nombre;

    button.addEventListener("click", () => {
      const filtered = PRODUCTS.filter((product) =>
        product.categorias.some((c: any) => c.id === cat.id)
      );

      renderProducts(filtered);
    });

    categoriesContainer.appendChild(button);
  });

  const allBtn = document.createElement("button");
  allBtn.textContent = "Todos";

  allBtn.addEventListener("click", () => {
    renderProducts(PRODUCTS);
  });

  categoriesContainer.appendChild(allBtn);
}

// -------------------
// BUSQUEDA
// -------------------
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = PRODUCTS.filter((product) =>
    product.nombre.toLowerCase().includes(text)
  );

  renderProducts(filtered);
});

// -------------------
// INIT
// -------------------
renderProducts(PRODUCTS);
renderCategories();