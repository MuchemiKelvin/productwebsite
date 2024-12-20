// script.js

let allProducts = []; // Store all products globally

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});

function loadCategories() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('categoryFilter');
            categorySelect.innerHTML = '<option value="">All Categories</option>';
            
            // Add categories from categories.json
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading categories:', error);
        });
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
        productGrid.innerHTML = '<div class="col-12 text-center"><h3>No products found</h3></div>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-sm-6', 'col-xl-4');
        productCard.innerHTML = `
            <div class="box">
                <div class="new">New</div>
                <div class="img-box">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-box">
                    <div>
                        <h5>${product.name}</h5>
                        <h6>${product.category}</h6>
                        <h6>
                            Price:
                            <span>$${product.price}</span>
                        </h6>
                    </div>
                    <div>
                        <a href="#">
                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    console.log(`Added product ${productId} to cart`);
}
