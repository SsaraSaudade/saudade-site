// Login form
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    window.location.href = 'admin.html'; // Redirige vers la page d'ajout
  } else {
    document.getElementById('error').textContent = data.message;
  }
});

// Add clothing form
document.getElementById('addClothingForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) return alert('Non autorisé');

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const imageUrl = document.getElementById('imageUrl').value.trim();

  if (imageUrl && !isValidUrl(imageUrl)) {
    document.getElementById('message').textContent = "L'URL de l'image n'est pas valide.";
    return;
  }

  // Si pas d'URL fournie, tu peux soit envoyer vide, soit gérer ça côté backend
  const res = await fetch('http://localhost:3000/api/clothing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ name, description, price, imageUrl })
  });

  const data = await res.json();
  document.getElementById('message').textContent = data.message || 'Erreur';
});

// Déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Supprimer le token du stockage local
      localStorage.removeItem('token');

      // Rediriger vers la page de connexion admin
      window.location.href = 'admin-login.html';
    });
  }
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}