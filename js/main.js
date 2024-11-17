document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase (make sure this matches your config)
    const firebaseConfig = {
        apiKey: "AIzaSyAkF9QsBpBNJ4IV4BYEhLEb-i0jq2q0DfM",
        authDomain: "portfolio-128b7.firebaseapp.com",
        databaseURL: "https://portfolio-128b7-default-rtdb.firebaseio.com",
        projectId: "portfolio-128b7",
        storageBucket: "portfolio-128b7.firebasestorage.app",
        messagingSenderId: "390023533829",
        appId: "1:390023533829:web:e4d58c21176685252e136c",
        measurementId: "G-TRXVQXBHZZ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Get database reference
    const db = firebase.database();
    
    // Portfolio loading function
    const loadPortfolioItems = () => {
        const portfolioRef = db.ref('projects');
        
        portfolioRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const portfolioContainer = document.querySelector('#portfolio .grid');
            
            if (data) {
                const projects = Object.values(data);
                portfolioContainer.innerHTML = projects.map(project => `
                    <div class="portfolio-item bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                            <p class="text-gray-600 mb-4">${project.description}</p>
                            <div class="flex flex-wrap gap-2 mb-6">
                                ${project.technologies.map(tech => 
                                    `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">${tech}</span>`
                                ).join('')}
                            </div>
                            <a href="${project.link}" target="_blank" 
                               class="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                                      text-white rounded-lg hover:from-blue-600 hover:to-blue-700 
                                      transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                                <i class="fa-solid fa-folder-open mr-1"></i>
                                <span>View Project</span>
                                <svg class="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                `).join('');

                // Add animation class after a short delay
                setTimeout(() => {
                    document.querySelectorAll('.portfolio-item').forEach(item => {
                        item.classList.add('fade-in');
                    });
                }, 100);
            } else {
                console.log('No data available');
            }
        }, (error) => {
            console.error('Error:', error);
        });
    };

    // Initialize portfolio
    loadPortfolioItems();

    // Add this after loadPortfolioItems function
    const observePortfolioItems = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.portfolio-item').forEach(item => {
            observer.observe(item);
        });
    };

    // Call this after portfolio items are loaded
    observePortfolioItems();

    // Debug logs
    console.log('Firebase initialized');
    db.ref('projects').once('value')
        .then(snapshot => {
            console.log('Data:', snapshot.val());
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle menu
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Add touch events for mobile
    menuButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
    });
}); 