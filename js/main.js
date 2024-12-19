// script.js

// Fetch categories and products
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});

function loadCategories() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('category-filter');
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        });
}

function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.getElementById('product-grid');
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <p>${product.category} - ${product.subCategory}</p>
                `;
                productGrid.appendChild(productCard);
            });
        });
}
