let allProducts = [];

// Define categories array
const categories = [
    {
        name: "Electronics",
        description: "Smartphones, Laptops, Gadgets",
        image: "assets/images/categories/electronics.jpg",
        categoryId: "Electronics"
    },
    {
        name: "Fashion and Apparel",
        description: "Clothing, Shoes, Accessories",
        image: "assets/images/categories/fashion.jpg",
        categoryId: "Fashion and Apparel"
    },
    {
        name: "Home and Living",
        description: "Furniture, Decor, Kitchen",
        image: "assets/images/categories/home.jpg",
        categoryId: "Home and Living"
    },
    {
        name: "Beauty and Personal Care",
        description: "Skincare, Makeup, Fragrances",
        image: "assets/images/categories/beauty.jpg",
        categoryId: "Beauty and Personal Care"
    },
    {
        name: "Sports and Outdoors",
        description: "Equipment, Activewear, Gear",
        image: "assets/images/categories/sports.jpg",
        categoryId: "Sports and Outdoors"
    },
    {
        name: "Toys and Games",
        description: "Board Games, Toys, Puzzles",
        image: "assets/images/categories/toys.jpg",
        categoryId: "Toys and Games"
    },
    {
        name: "Books and Stationery",
        description: "Books, Office Supplies",
        image: "assets/images/categories/books.jpg",
        categoryId: "Books and Stationery"
    },
    {
        name: "Food and Beverages",
        description: "Gourmet Food, Drinks",
        image: "assets/images/categories/food.jpg",
        categoryId: "Food and Beverages"
    }
];

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    initializeCategories();
    loadProducts();
    
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        console.log('Category parameter found:', categoryParam);
        // Set the category filter dropdown to the selected category
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = categoryParam;
        }
        // Highlight the selected category card
        highlightSelectedCategory(categoryParam);
        // Trigger the filter
        filterProducts();
    }
});

// Initialize categories
function initializeCategories() {
    console.log('Initializing categories...');
    const categoriesGrid = document.getElementById('categoriesGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!categoriesGrid || !categoryFilter) {
        console.error('Required elements not found');
        return;
    }

    // Clear existing content
    categoriesGrid.innerHTML = '';
    
    // Add categories to grid
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'col-6 col-md-3 mb-4';
        
        categoryDiv.innerHTML = `
            <a href="?category=${encodeURIComponent(category.categoryId)}" 
               class="category-card" 
               data-category="${category.categoryId}">
                <div class="category-image">
                    <img src="${category.image}" alt="${category.name}">
                </div>
                <div class="category-content">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                </div>
            </a>
        `;
        
        categoriesGrid.appendChild(categoryDiv);
    });
    
    // Add categories to dropdown
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.categoryId;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}

function highlightSelectedCategory(categoryId) {
    // Remove active class from all category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected category card
    const selectedCard = document.querySelector(`.category-card[data-category="${categoryId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceSort = document.getElementById('priceSort').value;
    
    // Filter products by category
    let filteredProducts = allProducts;
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter
        );
    }

    // Sort products by price
    if (priceSort) {
        filteredProducts.sort((a, b) => {
            if (priceSort === 'lowToHigh') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

    // Display filtered and sorted products
    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Clear existing products

    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center">
                <h3>No products found in this category</h3>
            </div>`;
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-sm-6 col-xl-4';
        productCard.innerHTML = `
            <div class="box">
                <div class="img-box">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-box">
                    <h6>${product.name}</h6>
                    <h6>Price: <span>$${product.price}</span></h6>
                    <a href="#" onclick="addToCart(${product.id}); return false;">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}
