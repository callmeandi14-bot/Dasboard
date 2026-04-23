document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOGIKA LOADER (OPENING) ===
    const loader = document.getElementById('loader-wrapper');
    
    // Cek apakah sudah pernah muncul di sesi ini biar gak ganggu pas pindah halaman
    if (sessionStorage.getItem('openingPlayed')) {
        if (loader) loader.style.display = 'none';
    } else {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('loader-finish');
                sessionStorage.setItem('openingPlayed', 'true');
                // Hapus display setelah transisi selesai biar gak halangin klik
                setTimeout(() => loader.style.display = 'none', 1000);
            }
        }, 3000);
    }

    // === 2. LOGIKA THEME TOGGLE (MODE MALAM) ===
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    function updateIcon(isDark) {
        if (!themeIcon) return;
        if (isDark) {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path>';
            themeToggle.classList.add('bg-slate-800', 'text-yellow-400');
            themeToggle.classList.remove('bg-emerald-100', 'text-emerald-600');
        } else {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
            themeToggle.classList.remove('bg-slate-800', 'text-yellow-400');
            themeToggle.classList.add('bg-emerald-100', 'text-emerald-600');
        }
    }

    // Load theme dari LocalStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    }

    // === 3. LOGIKA TYPEWRITER (HANYA DI HOME) ===
    const textElement = document.getElementById('typewriter');
    const textToType = "Selamat Datang";
    let textIndex = 0;

    if (textElement) {
        function type() {
            if (textIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(textIndex);
                textIndex++;
                setTimeout(type, 150);
            } else {
                textElement.classList.add('typing-text');
            }
        }
        // Jalankan setelah loader selesai (detik ke 3.2)
        const delay = sessionStorage.getItem('openingPlayed') ? 500 : 3200;
        setTimeout(type, delay);
    }

    // === 4. LOGIKA REVEAL ON SCROLL (DIPERHALUS) ===
    const reveals = document.querySelectorAll('.reveal');
    
  // Ganti bagian akhir script.js yang urusan reveal
// Ganti bagian akhir script.js yang mengurus reveal/observer
const observerOptions = {
    threshold: 0.1, // Elemen muncul 10% baru jalan
    rootMargin: "0px 0px -80px 0px" // Ditahan 80px dari bawah layar biar mulus
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan class active
            entry.target.classList.add('active');
            // Sekali muncul, jangan dipantau lagi biar enteng
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


});