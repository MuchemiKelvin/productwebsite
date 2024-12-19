// Replace the hardcoded products array with a fetch call
let products = []; // Initialize empty array
let filteredProducts = []; // Initialize filtered products

// Fetch products from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        products = await response.json();
        filteredProducts = products; // Initialize filtered products with all products
        
        // After fetching products, initialize the UI
        initializeUI();
    } catch (error) {
        console.error('Error loading products:', error);
        // Optionally display error message to user
    }
}

// Move existing initialization code into a separate function
function initializeUI() {
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

    // Display initial products
    displayProducts(filteredProducts);
}

// Call fetchProducts when the page loads
fetchProducts();

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
