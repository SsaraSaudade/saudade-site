// Login form
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

const API_BASE_URL = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  ? 'http://localhost:3001'
  : 'https://saudade-backend.onrender.com';

  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    window.location.href = 'admin-dashboard.html'; // Redirige vers la page d'ajout
  } else {
    document.getElementById('error').textContent = data.message;
  }
});

// Add clothing form
document.getElementById('addClothingForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) return alert('Non autorisé');

  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch(`${API_BASE_URL}/api/clothing`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    });

    const data = await res.json();
    document.getElementById('message').textContent = data.message || 'Erreur';
  } catch (err) {
    console.error(err);
    document.getElementById('message').textContent = 'Erreur réseau';
  }
});

// Déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Supprimer le token du stockage local
      localStorage.removeItem('token');

      // Rediriger vers la page de connexion admin
      window.location.href = 'index.html';
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