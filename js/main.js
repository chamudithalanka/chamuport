document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.querySelector('nav button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden bg-blue-600 w-full absolute top-16 left-0 py-2 px-6 hidden';
    mobileMenu.innerHTML = `
        <a href="#home" class="block py-2 hover:text-blue-200 transition duration-300">Home</a>
        <a href="#about" class="block py-2 hover:text-blue-200 transition duration-300">About</a>
        <a href="#portfolio" class="block py-2 hover:text-blue-200 transition duration-300">Portfolio</a>
        <a href="#cv" class="block py-2 hover:text-blue-200 transition duration-300">CV</a>
        <a href="#contact" class="block py-2 hover:text-blue-200 transition duration-300">Contact</a>
    `;
    
    document.querySelector('nav').appendChild(mobileMenu);
    
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Portfolio Items Loading
    const loadPortfolioItems = async () => {
        try {
            const response = await fetch('https://chamudithalanka.github.io/chamuport/data/portfolio.json');
            const data = await response.json();
            const portfolioContainer = document.querySelector('#portfolio .grid');
            
            portfolioContainer.innerHTML = data.projects.map(project => `
                <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
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
        } catch (error) {
            console.error('Error loading portfolio items:', error);
            const portfolioContainer = document.querySelector('#portfolio .grid');
            portfolioContainer.innerHTML = `
                <div class="col-span-full text-center text-red-600">
                    <p>Unable to load portfolio items. Please try again later.</p>
                    <p class="text-sm mt-2">Error: ${error.message}</p>
                </div>
            `;
        }
    };

    // Initialize
    loadPortfolioItems();
}); 
