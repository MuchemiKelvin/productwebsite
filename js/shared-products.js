let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            const isHomepage = window.location.pathname === '/' || 
                             window.location.pathname.endsWith('index.html');
            
            if (isHomepage) {
                // Show first 12 products on homepage
                displayProducts(allProducts.slice(0, 12));
            } else {
                // Show all products on products page
                displayProducts(allProducts);
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
            const productGrid = document.getElementById('productGrid');
            if (productGrid) {
                productGrid.innerHTML = `
                    <div class="col-12 text-center">
                        <h3>Error loading products. Please try again later.</h3>
                    </div>`;
            }
        });
}

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center">
                <h3>No products found</h3>
            </div>`;
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col'; // Bootstrap 5's automatic column sizing
        productCard.innerHTML = `
            <div class="box">
                <div class="img-box">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-box">
                    <h6>${product.name}</h6>
                    <h6>Price: <span>$${product.price.toFixed(2)}</span></h6>
                    <a href="#" class="add-to-cart" onclick="addToCart(${product.id}); return false;">
                        <i class="fa fa-shopping-cart"></i> Add to Cart
                    </a>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
} 