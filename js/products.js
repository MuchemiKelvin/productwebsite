// Sample Product Data (replace with your actual product data or fetch it from a JSON file)
const products = [
  { id: 1, name: "Product 1", price: 10, category: "Category 1", imageUrl: "product1.jpg" },
  { id: 2, name: "Product 2", price: 15, category: "Category 2", imageUrl: "product2.jpg" },
  { id: 3, name: "Product 3", price: 20, category: "Category 1", imageUrl: "product3.jpg" },
  { id: 4, name: "Product 4", price: 25, category: "Category 3", imageUrl: "product4.jpg" },
  // Add more products here
];

// To store filtered products
let filteredProducts = products;

// Extract unique categories from products
const categories = Array.from(new Set(products.map(product => product.category)));

// Populate category dropdown
const categoryFilter = document.getElementById('categoryFilter');
categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.innerText = category;
  categoryFilter.appendChild(option);
});

// Function to display products
function displayProducts(productsToDisplay) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = ''; // Clear the grid before adding new products
  
  productsToDisplay.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
    
    const productBox = document.createElement('div');
    productBox.classList.add('box');
    
    const productLink = document.createElement('a');
    productLink.href = `/product/${product.id}`;
    
    const imgBox = document.createElement('div');
    imgBox.classList.add('img-box');
    
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    imgBox.appendChild(img);
    
    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');
    
    const productName = document.createElement('h6');
    productName.innerText = product.name;
    
    const priceBox = document.createElement('h6');
    priceBox.innerHTML = `Price <span>$${product.price}</span>`;
    
    detailBox.appendChild(productName);
    detailBox.appendChild(priceBox);
    
    const newTag = document.createElement('div');
    newTag.classList.add('new');
    newTag.innerText = 'New';
    
    productLink.appendChild(imgBox);
    productLink.appendChild(detailBox);
    productLink.appendChild(newTag);
    
    productBox.appendChild(productLink);
    
    const buttonBox = document.createElement('div');
    buttonBox.classList.add('card', 'button');
    
    const button = document.createElement('button');
    button.innerText = 'Add To Cart';
    button.onclick = () => addToCart(product);
    
    buttonBox.appendChild(button);
    
    productBox.appendChild(buttonBox);
    productCard.appendChild(productBox);
    productGrid.appendChild(productCard);
  });
}

// Function to filter products by selected category
function filterProducts() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  if (selectedCategory) {
    filteredProducts = products.filter(product => product.category === selectedCategory);
  } else {
    filteredProducts = products;
  }
  
  displayProducts(filteredProducts);
}

// Function to handle adding a product to the cart
function addToCart(product) {
  console.log(`${product.name} added to cart`);
}

// Display products initially
displayProducts(filteredProducts);
