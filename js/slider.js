document.addEventListener('DOMContentLoaded', () => {
    const sliderContent = [
        {
            id: 1,
            heading: "Welcome To Our Gift Shop",
            description: "Discover our curated collection of unique gifts for every occasion. From electronics to fashion, find the perfect present that speaks from the heart.",
            ctaText: "Shop Now",
            ctaLink: "/products",
            backgroundImage: "assets/images/slider1.jpg"
        },
        {
            id: 2,
            heading: "New Electronics Collection",
            description: "Explore the latest in technology with our premium selection of smartphones, laptops, and smart devices. Stay ahead with cutting-edge gadgets.",
            ctaText: "View Electronics",
            ctaLink: "/products?category=Electronics",
            backgroundImage: "assets/images/slider2.jpg"
        },
        {
            id: 3,
            heading: "Fashion & Style",
            description: "Elevate your wardrobe with our trendy fashion collection. From casual wear to elegant accessories, express yourself with style.",
            ctaText: "Browse Fashion",
            ctaLink: "/products?category=Fashion",
            backgroundImage: "assets/images/slider3.jpg"
        }
    ];

    const sliderContainer = document.getElementById('sliderContent');
    
    if (sliderContainer) {
        sliderContent.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            slideDiv.innerHTML = `
                <div class="slider-card">
                    <img src="${slide.backgroundImage}" alt="" class="background-image"/>
                    <div class="slider-content">
                        <h1>${slide.heading}</h1>
                        <p>${slide.description}</p>
                        <a href="${slide.ctaLink}" class="cta-button">${slide.ctaText}</a>
                    </div>
                </div>
            `;
            
            sliderContainer.appendChild(slideDiv);
        });
    }
}); 