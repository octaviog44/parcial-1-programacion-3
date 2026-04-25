const USERS_KEY = "users";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: any[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registrar(email: string, password: string) {
  const users = getUsers();

  const exists = users.find((u: any) => u.email === email);

  if (exists) {
    alert("El usuario ya existe");
    return;
  }

  users.push({ email, password });

  saveUsers(users);

  alert("Usuario registrado correctamente");
}