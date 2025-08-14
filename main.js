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
