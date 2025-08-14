// ======= Mobile Menu Toggle =======
const mobileMenuBtn = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.innerHTML = expanded
            ? '<span class="sr-only">Buka menu utama</span><i class="fas fa-bars"></i>'
            : '<span class="sr-only">Tutup menu utama</span><i class="fas fa-times"></i>';
    });
}

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistem Perpustakaan Digital - SMA Negeri 1 Jakarta</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    .book-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .nav-link:hover { border-bottom: 2px solid #3b82f6; }
    .search-box:focus { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); }
  </style>
</head>
<body class="bg-gray-50 font-sans">

<!-- Navbar -->
<nav class="bg-white shadow-lg sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <img src="logo.png" alt="Logo Perpustakaan Digital" class="h-8 w-8 rounded-full">
        <span class="ml-2 text-xl font-bold text-blue-600">PerpusDigi SMA 1 Jakarta</span>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8 ml-6">
          <a href="#home" class="nav-link">Beranda</a>
          <a href="#katalog" class="nav-link">Katalog</a>
          <a href="#fitur" class="nav-link">Fitur</a>
          <a href="#about" class="nav-link">Tentang Kami</a>
          <a href="#admin" class="nav-link">Admin</a>
        </div>
      </div>
      <div class="hidden sm:flex sm:items-center space-x-4">
        <div id="userGreeting" class="hidden text-sm">
          <span class="font-medium"></span>
          <button id="logoutBtn" class="ml-2 text-blue-600">Keluar</button>
        </div>
        <button id="loginBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Masuk/Daftar</button>
      </div>
    </div>
  </div>
</nav>

<!-- Auth Modal -->
<div id="authModal" class="fixed inset-0 z-50 hidden overflow-y-auto bg-black bg-opacity-50">
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="text-lg font-medium" id="authModalTitle">Masuk ke Akun</h3>
        <button id="closeAuthModal" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-6">
        <!-- Login Form -->
        <div id="loginForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="loginEmail" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="loginPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <button id="submitLogin" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Masuk</button>
          <p class="text-center text-sm text-gray-600">
            Belum punya akun? 
            <button id="switchToRegister" class="text-blue-600 hover:text-blue-800">Daftar disini</button>
          </p>
        </div>
        <!-- Register Form -->
        <div id="registerForm" class="hidden space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Depan</label>
              <input type="text" id="firstName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Belakang</label>
              <input type="text" id="lastName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="registerEmail" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="registerPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <button id="submitRegister" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Daftar</button>
          <p class="text-center text-sm text-gray-600">
            Sudah punya akun? 
            <button id="switchToLogin" class="text-blue-600 hover:text-blue-800">Masuk disini</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Firebase Script -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  // Ganti dengan config dari Firebase Console
  const firebaseConfig = {
  apiKey: "AIzaSyAt8wJzeOA1Ewi8ook67NNE6_gXTJuqXxQ",
  authDomain: "smartlib-team.firebaseapp.com",
  projectId: "smartlib-team",
  storageBucket: "smartlib-team.firebasestorage.app",
  messagingSenderId: "765080868030",
  appId: "1:765080868030:web:8905d5487ea2e01a07faef",
  measurementId: "G-0LCPPKFPQX"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Login
  document.getElementById("submitLogin").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login berhasil!");
      document.getElementById("authModal").classList.add("hidden");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  });

  // Register
  document.getElementById("submitRegister").addEventListener("click", async () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: firstName + " " + lastName });
      alert("Pendaftaran berhasil!");
      document.getElementById("switchToLogin").click();
    } catch (error) {
      alert("Pendaftaran gagal: " + error.message);
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut(auth);
    alert("Berhasil keluar!");
  });

  // Cek status login
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("userGreeting").classList.remove("hidden");
      document.getElementById("loginBtn").classList.add("hidden");
      document.querySelector("#userGreeting span").textContent = `Halo, ${user.displayName || user.email}`;
    } else {
      document.getElementById("userGreeting").classList.add("hidden");
      document.getElementById("loginBtn").classList.remove("hidden");
    }
  });

  // Switch form
  document.getElementById("switchToRegister").addEventListener("click", () => {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
  });
  document.getElementById("switchToLogin").addEventListener("click", () => {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
  });

  // Modal control
  document.getElementById("closeAuthModal").addEventListener("click", () => {
    document.getElementById("authModal").classList.add("hidden");
  });
  document.getElementById("loginBtn").addEventListener("click", () => {
    document.getElementById("authModal").classList.remove("hidden");
  });

</body>
</html>


// ======= Login Modal =======
const loginBtn = document.getElementById('loginBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');

const toggleModal = () => {
    loginModal?.classList.toggle('hidden');
};

loginBtn?.addEventListener('click', toggleModal);
mobileLoginBtn?.addEventListener('click', toggleModal);
closeLoginModal?.addEventListener('click', toggleModal);

// ======= Search Functionality =======
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const bookCards = document.querySelectorAll('.book-card');

function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = filterCategory.value.toLowerCase();

    bookCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const author = card.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const categoryText = card.querySelector('span').textContent.toLowerCase();

        const matchesSearch = title.includes(searchTerm) || author.includes(searchTerm);
        const matchesCategory = category === '' || categoryText.includes(category);

        card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

searchInput?.addEventListener('input', filterBooks);
filterCategory?.addEventListener('change', filterBooks);

// ======= Admin Dashboard Charts =======
document.addEventListener('DOMContentLoaded', function () {
    const borrowingCtx = document.getElementById('borrowingChart')?.getContext('2d');
    if (borrowingCtx) {
        new Chart(borrowingCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Peminjaman Buku',
                    data: [120, 190, 150, 200, 170, 210, 250, 220, 190, 230, 270, 300],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const categoryCtx = document.getElementById('bookCategoryChart')?.getContext('2d');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pelajaran', 'Fiksi', 'Non-Fiksi', 'Referensi', 'Bahasa Asing'],
                datasets: [{
                    data: [45, 20, 15, 10, 10],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(139, 92, 246, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});

// ======= Admin Login (Demo Only) =======
const loginForm = document.getElementById('loginForm');
const adminDashboard = document.getElementById('adminDashboard');

loginForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (email === 'admin@smk3.sch.id' && password === 'admin123') {
        toggleModal();
        adminDashboard?.classList.remove('hidden');
        setTimeout(() => {
            adminDashboard?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        alert('Login berhasil! Anda sekarang dapat mengakses dashboard admin.');
    } else {
        alert('Email atau password salah. Coba lagi.');
    }
});
