// Load header and footer dynamically
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // Reattach theme toggle functionality AFTER header loads (because button is inside header)
            if (id === 'header') initThemeToggle();
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
}

// Initialize theme toggle functionality
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
}

// Load blog posts dynamically
function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return; // Do nothing if not on blog page

    fetch('data/posts.json')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'col-lg-6 mb-4';
                postElement.innerHTML = `
                    <div class="card card-custom h-100">
                        <div class="card-body p-4">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text"><small class="text-muted">${new Date(post.date).toDateString()}</small></p>
                            <p class="card-text">${post.content}</p>
                        </div>
                    </div>
                `;
                blogList.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));
}

// When DOM is ready, load everything
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
    loadBlogPosts();
});
