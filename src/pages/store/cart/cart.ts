const CART_KEY = "cart";

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

const container = document.getElementById("cart-container");
const totalElement = document.getElementById("total");

function renderCart() {
  const cart = getCart();

  if (!container || !totalElement) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>El carrito está vacío</p>";
    totalElement.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item: any) => {
    const div = document.createElement("div");

    const subtotal = item.precio * item.quantity;
    total += subtotal;

    div.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>Precio: $${item.precio}</p>
      <p>Cantidad: ${item.quantity}</p>
      <p>Subtotal: $${subtotal}</p>
      <button class="delete-btn">Eliminar</button>
    `;

    container.appendChild(div);
    
    const btn = div.querySelector(".delete-btn");
    
    btn?.addEventListener("click", () => {
      removeFromCart(item.id);
    });

  });

  totalElement.textContent = `Total: $${total}`;


}


function removeFromCart(id: number) {
  let cart = getCart();

  cart = cart.filter((item: any) => item.id !== id);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  renderCart(); 
}

renderCart();