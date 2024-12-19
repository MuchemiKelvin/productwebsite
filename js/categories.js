document.addEventListener('DOMContentLoaded', () => {
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

    const categoriesContainer = document.getElementById('categoriesContainer');
    
    if (categoriesContainer) {
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'col-sm-6 col-lg-3';
            
            categoryDiv.innerHTML = `
                <a href="products.html?category=${encodeURIComponent(category.categoryId)}" class="category-card">
                    <div class="category-image">
                        <img src="${category.image}" alt="${category.name}">
                    </div>
                    <div class="category-content">
                        <h3>${category.name}</h3>
                        <p>${category.description}</p>
                    </div>
                </a>
            `;
            
            categoriesContainer.appendChild(categoryDiv);
        });
    }
});
