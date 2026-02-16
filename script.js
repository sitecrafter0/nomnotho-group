/* ===================================
   Product Database
   =================================== */

const products = [
    {
        id: 1,
        name: 'Modern Minimalist',
        code: 'MM-2024-001',
        price: 2500,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '2,400 sqft',
        storeys: 2,
        description: 'A contemporary 3-bedroom house design featuring clean lines, open-plan living, and modern finishes. Perfect for families seeking a sophisticated yet functional home.',
        image: '🏠',
        included: [
            'Architectural floor plans (all levels)',
            'Exterior elevations (all sides)',
            'Detailed roof layout',
            'Electrical wiring layout',
            'Plumbing schematic',
            'Foundation plan',
            'Section details'
        ],
        constructionCost: 'R350,000 - R450,000'
    },
    {
        id: 2,
        name: 'Luxury Estate',
        code: 'LE-2024-002',
        price: 4500,
        bedrooms: 5,
        bathrooms: 4,
        floorArea: '4,850 sqft',
        storeys: 2,
        description: 'Premium residential design with spacious rooms, luxury finishes, and high-end architectural details. Features a home office, wine cellar, and resort-style amenities.',
        image: '👑',
        included: [
            'Complete architectural floor plans',
            'Premium elevation renderings',
            'Detailed roof framing plan',
            '3D electrical layout',
            'Advanced plumbing design',
            'HVAC specifications',
            'Interior finishing schedule'
        ],
        constructionCost: 'R650,000 - R850,000'
    },
    {
        id: 3,
        name: 'Compact City Living',
        code: 'CCL-2024-003',
        price: 1800,
        bedrooms: 2,
        bathrooms: 1,
        floorArea: '1,200 sqft',
        storeys: 1,
        description: 'Efficient and stylish single-story home perfect for urban living. Maximizes space with smart storage solutions and an open-concept design.',
        image: '🏢',
        included: [
            'Floor plan with dimensions',
            'Building elevations',
            'Roof plan',
            'Electrical layout',
            'Plumbing plan',
            'Site plan',
            'Construction notes'
        ],
        constructionCost: 'R180,000 - R240,000'
    },
    {
        id: 4,
        name: 'Traditional Family Home',
        code: 'TFH-2024-004',
        price: 3200,
        bedrooms: 4,
        bathrooms: 3,
        floorArea: '3,100 sqft',
        storeys: 2,
        description: 'Classic design with timeless appeal featuring a spacious family room, traditional dining area, and generous bedrooms. Perfect for growing families.',
        image: '🏡',
        included: [
            'Detailed floor plans',
            'Architectural elevations',
            'Roof structure plan',
            'Electrical wiring diagram',
            'Plumbing layout',
            'Stair details',
            'Material specifications'
        ],
        constructionCost: 'R420,000 - R550,000'
    },
    {
        id: 5,
        name: 'Contemporary Sprawl',
        code: 'CS-2024-005',
        price: 3800,
        bedrooms: 4,
        bathrooms: 3,
        floorArea: '3,500 sqft',
        storeys: 1,
        description: 'Single-story contemporary ranch design with sprawling open spaces, modern kitchen, and seamless indoor-outdoor living. Ideal for entertaining.',
        image: '🌆',
        included: [
            'Comprehensive floor plans',
            'Modern elevation designs',
            'Complex roof framing',
            'Smart home electrical layout',
            'Full plumbing schematic',
            'Structural details',
            'Finish schedule'
        ],
        constructionCost: 'R480,000 - R620,000'
    },
    {
        id: 6,
        name: 'Eco-Modern Cottage',
        code: 'EMC-2024-006',
        price: 2200,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '1,800 sqft',
        storeys: 2,
        description: 'Sustainable and energy-efficient design featuring solar-ready systems, natural ventilation, and eco-friendly materials. Perfect for environmentally conscious builders.',
        image: '🌿',
        included: [
            'Sustainable design plans',
            'Solar panel layout',
            'Efficient thermal design',
            'Electrical systems for renewables',
            'Rainwater harvesting layout',
            'Green material specifications',
            'Energy efficiency notes'
        ],
        constructionCost: 'R280,000 - R380,000'
    },
    {
        id: 7,
        name: 'Grand Victorian',
        code: 'GV-2024-007',
        price: 5000,
        bedrooms: 6,
        bathrooms: 4,
        floorArea: '5,500 sqft',
        storeys: 3,
        description: 'Elegant Victorian-inspired mansion with ornate details, grand foyer, library, and premium craftsmanship throughout. A statement of luxury and tradition.',
        image: '👑',
        included: [
            'Detailed period-correct plans',
            'Ornamental elevation designs',
            'Complex 3-story roof plan',
            'Period electrical specification',
            'Intricate plumbing layout',
            'Crown molding details',
            'Specialty finish schedule'
        ],
        constructionCost: 'R750,000 - R1,000,000'
    },
    {
        id: 8,
        name: 'Modern Glass House',
        code: 'MGH-2024-008',
        price: 4200,
        bedrooms: 4,
        bathrooms: 3,
        floorArea: '3,800 sqft',
        storeys: 2,
        description: 'Ultra-modern design with expansive glass walls, minimalist aesthetic, and seamless integration with nature. Perfect for scenic properties.',
        image: '💎',
        included: [
            'Contemporary floor plans',
            'Modern glass elevation details',
            'Advanced roof system design',
            'Premium electrical layout',
            'Luxury plumbing system',
            'Structural glazing specs',
            'Smart home integration guide'
        ],
        constructionCost: 'R580,000 - R750,000'
    }
];

/* ===================================
   Cart Management
   =================================== */

class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getFormattedTotal() {
        return 'R' + this.getTotal().toFixed(2);
    }

    getCartItems() {
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }
}

// Initialize cart manager
const cartManager = new CartManager();

/* ===================================
   DOM Manipulation Functions
   =================================== */

// Load featured plans on home page
function loadFeaturedPlans() {
    const featuredContainer = document.getElementById('featuredPlans');
    if (!featuredContainer) return;

    const featured = products.slice(0, 3);
    
    featured.forEach(product => {
        const card = createProductCard(product);
        featuredContainer.appendChild(card);
    });
}

// Load all products on shop page
function loadShopPlans() {
    const shopContainer = document.getElementById('shopGrid');
    if (!shopContainer) return;

    products.forEach(product => {
        const card = createProductCard(product);
        shopContainer.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image-wrapper">${product.image}</div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-specs">${product.bedrooms} bed • ${product.bathrooms} bath</p>
            <p class="product-size">${product.floorArea}</p>
            <div class="product-footer">
                <span class="product-price">${'R' + product.price.toLocaleString()}</span>
                <div class="product-buttons">
                    <a href="product.html?id=${product.id}" class="btn btn-secondary">View Plan</a>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Add item to cart and show feedback
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cartManager.addItem(product);
        showCartFeedback();
    }
}

// Show visual feedback when item is added to cart
function showCartFeedback() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.style.animation = 'none';
        setTimeout(() => {
            cartLink.style.animation = 'pulse 0.3s ease';
        }, 0);
    }
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // Update page title
    document.title = product.name + ' - Nomnotho Projects';

    // Populate product details
    document.getElementById('productImage').textContent = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productCode').textContent = 'Plan Code: ' + product.code;
    document.getElementById('productPrice').textContent = 'R' + product.price.toLocaleString();
    document.getElementById('productDescription').textContent = product.description;
    
    // Specifications
    document.getElementById('bedrooms').textContent = product.bedrooms + ' Bedrooms';
    document.getElementById('bathrooms').textContent = product.bathrooms + ' Bathrooms';
    document.getElementById('floorArea').textContent = product.floorArea;
    document.getElementById('storeys').textContent = product.storeys === 1 ? 'Single Story' : product.storeys + ' Stories';
    
    // What's Included
    const includedList = document.getElementById('includedList');
    product.included.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        includedList.appendChild(li);
    });
    
    // Construction Cost
    document.getElementById('constructionCost').textContent = product.constructionCost;
    
    // Add to Cart button
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        cartManager.addItem(product);
        alert(`${product.name} added to cart!`);
    });

    // Customization request button
    document.getElementById('customizeBtn').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Load cart page
function loadCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartSection = document.querySelector('.cart-section');
    
    if (!cartItemsContainer) return;

    const cartItems = cartManager.getCartItems();

    if (cartItems.length === 0) {
        cartSection.style.display = 'none';
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';
    cartSection.style.display = 'block';

    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-specs">${item.bedrooms} bed • ${item.bathrooms} bath • ${item.floorArea}</p>
                <div class="cart-item-quantity">
                    <label>Quantity:</label>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity(${item.id}, this.value)">
                </div>
            </div>
            <span class="cart-item-price">R${(item.price * item.quantity).toLocaleString()}</span>
            <button class="cart-item-remove" onclick="removeItemFromCart(${item.id})">Remove</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });

    // Update summary
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cartManager.getTotal();
    document.getElementById('subtotal').textContent = 'R' + subtotal.toFixed(2);
    document.getElementById('total').textContent = 'R' + subtotal.toFixed(2);
}

// Remove item from cart
function removeItemFromCart(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        cartManager.removeItem(productId);
        loadCartPage();
    }
}

// Update item quantity
function updateItemQuantity(productId, quantity) {
    const numQuantity = parseInt(quantity);
    if (numQuantity > 0) {
        cartManager.updateQuantity(productId, numQuantity);
        loadCartPage();
    }
}

// Load checkout page
function loadCheckoutPage() {
    const cartItems = cartManager.getCartItems();
    const selectedPlansTextarea = document.getElementById('selectedPlans');
    const summaryItems = document.getElementById('summaryItems');

    if (cartItems.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    // Auto-fill selected plans
    let plansText = 'Selected House Plans:\n\n';
    let summaryHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        plansText += `- ${item.name} (Code: ${item.code}) | Quantity: ${item.quantity} | R${item.price.toLocaleString()} each\n`;
        
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-item-name">${item.name}</div>
                <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.3rem;">Qty: ${item.quantity}</div>
                <div class="summary-item-price">R${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `;
        
        total += item.price * item.quantity;
    });

    selectedPlansTextarea.value = plansText.trim();
    summaryItems.innerHTML = summaryHTML;
    document.getElementById('checkoutTotal').textContent = 'R' + total.toFixed(2);

    // Handle form submission
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', handleCheckoutSubmit);
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selectedPlans = document.getElementById('selectedPlans').value;
    const projectNotes = document.getElementById('projectNotes').value;

    // Create mailto link (alternatively, could send to a backend)
    const subject = 'New House Plan Purchase Request from ' + fullName;
    const body = `Customer Details:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\n${selectedPlans}\n\nAdditional Notes:\n${projectNotes}`;

    // For demo purposes, show success message and clear cart
    showSuccessModal();
    
    // Optional: Create mailto link for real email
    // window.location.href = `mailto:nomnothogroup@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Clear cart after submission
    cartManager.clearCart();
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
        
        // Redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    }
}

/* ===================================
   Mobile Menu Toggle
   =================================== */

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ===================================
   Initialize on Page Load
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    cartManager.updateCartCount();

    // Initialize mobile menu
    initMobileMenu();

    // Load appropriate content based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        loadFeaturedPlans();
    } else if (currentPage === 'shop.html') {
        loadShopPlans();
    } else if (currentPage === 'product.html') {
        loadProductDetail();
    } else if (currentPage === 'cart.html') {
        loadCartPage();
    } else if (currentPage === 'checkout.html') {
        loadCheckoutPage();
    }
});

// Add CSS animation for cart feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
