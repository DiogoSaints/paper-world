// Configuration
const ITEMS_PER_PAGE = 24;
let allCubees = [];
let filteredCubees = [];
let currentPage = 1;
let currentDifficulty = 'all';
let searchQuery = '';

// DOM Elements
const loading = document.getElementById('loading');
const cardsGrid = document.getElementById('cardsGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const totalCount = document.getElementById('totalCount');
const filteredCount = document.getElementById('filteredCount');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageEl = document.getElementById('currentPage');
const totalPagesEl = document.getElementById('totalPages');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load data from checkpoint
async function loadData() {
    try {
        const response = await fetch('checkpoint.json');
        const data = await response.json();
        allCubees = data.results || [];

        // Update total count
        totalCount.textContent = `${allCubees.length} cubees`;

        // Initial render
        applyFilters();
    } catch (error) {
        console.error('Error loading data:', error);
        loading.innerHTML = `
            <div style="text-align: center; color: #ef4444;">
                <h3>❌ Failed to load data</h3>
                <p>Make sure checkpoint.json exists in the same directory</p>
            </div>
        `;
    }
}

// Get difficulty stars
function getDifficultyStars(difficulty) {
    if (!difficulty) return '❓ Unknown';
    return '⭐'.repeat(difficulty);
}

// Get difficulty label
function getDifficultyLabel(difficulty) {
    const labels = {
        1: 'Easy',
        2: 'Medium',
        3: 'Hard',
        4: 'Expert'
    };
    return labels[difficulty] || 'Unknown';
}

// Create card HTML
function createCard(cubee) {
    const difficulty = cubee.difficulty || 0;
    const difficultyStars = getDifficultyStars(difficulty);
    const difficultyLabel = getDifficultyLabel(difficulty);

    return `
        <div class="card">
            <img 
                src="${cubee.imageUrl}" 
                alt="${cubee.name}" 
                class="card-image"
                loading="lazy"
            >
            <div class="card-content">
                <h3 class="card-name">${cubee.name}</h3>
                <div class="card-meta">
                    <span class="difficulty" title="${difficultyLabel}">
                        ${difficultyStars}
                    </span>
                </div>
                <button class="download-btn" onclick="downloadCubee('${encodeURIComponent(cubee.downloadUrl)}', '${encodeURIComponent(cubee.name)}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </button>
            </div>
        </div>
    `;
}

// Download cubee - submits POST form in new tab
async function downloadCubee(encodedUrl, encodedName) {
    const downloadUrl = decodeURIComponent(encodedUrl);
    const name = decodeURIComponent(encodedName);

    console.log(`Downloading: ${name}`);

    // Create and submit POST form targeting hidden iframe
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://www.cubeecraft.com${downloadUrl}`;
    form.target = 'downloadFrame';
    form.style.display = 'none';

    // Create iframe if needed
    if (!document.getElementById('downloadFrame')) {
        const iframe = document.createElement('iframe');
        iframe.id = 'downloadFrame';
        iframe.name = 'downloadFrame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// Apply filters
function applyFilters() {
    // Filter by difficulty
    let filtered = allCubees;

    if (currentDifficulty !== 'all') {
        filtered = filtered.filter(cubee =>
            cubee.difficulty === parseInt(currentDifficulty)
        );
    }

    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(cubee =>
            cubee.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    filteredCubees = filtered;

    // Update filtered count
    if (searchQuery || currentDifficulty !== 'all') {
        filteredCount.textContent = `${filteredCubees.length} results`;
        filteredCount.classList.remove('hidden');
    } else {
        filteredCount.classList.add('hidden');
    }

    // Reset to page 1
    currentPage = 1;
    renderPage();
}

// Render current page
function renderPage() {
    loading.classList.add('hidden');

    if (filteredCubees.length === 0) {
        cardsGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        pagination.classList.add('hidden');
        return;
    }

    noResults.classList.add('hidden');

    // Calculate pagination
    const totalPages = Math.ceil(filteredCubees.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageItems = filteredCubees.slice(startIndex, endIndex);

    // Render cards
    cardsGrid.innerHTML = pageItems.map(createCard).join('');

    // Update pagination
    currentPageEl.textContent = currentPage;
    totalPagesEl.textContent = totalPages;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Show pagination if needed
    if (totalPages > 1) {
        pagination.classList.remove('hidden');
    } else {
        pagination.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    applyFilters();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update difficulty filter
        currentDifficulty = btn.dataset.difficulty;
        applyFilters();
    });
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredCubees.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});

// Initialize
loadData();
