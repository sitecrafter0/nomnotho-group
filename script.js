/* ===================================
   Product Database
   =================================== */

const products = [
    {
        id: 1,
        name: 'Tuscan Style Villa',
        code: 'TV-2024-001',
        price: 3500,
        bedrooms: 4,
        bathrooms: 3,
        floorArea: '334 sq/m',
        storeys: 2,
        description: 'Elegant Tuscan-inspired villa with warm terracotta tones, arched doorways, and charming European charm. Features rustic materials and timeless design elements.',
        image: '🏰',
        included: [
            'Detailed architectural floor plans',
            'Tuscan elevation designs',
            'Authentic material specifications',
            'Electrical layout',
            'Plumbing schematic',
            'Outdoor terrace plans',
            'Finishing details'
        ],
        constructionCost: 'R480,000 - R620,000'
    },
    {
        id: 2,
        name: 'Bali Style Retreat',
        code: 'BR-2024-002',
        price: 2800,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '260 sq/m',
        storeys: 1,
        description: 'Tropical Bali-inspired retreat featuring open-air pavilions, natural materials, and seamless indoor-outdoor living. Perfect for creating a peaceful sanctuary.',
        image: '🌴',
        included: [
            'Balinese floor plans',
            'Tropical elevation designs',
            'Open pavilion layouts',
            'Natural ventilation systems',
            'Water feature integration',
            'Landscape coordination',
            'Traditional detail specifications'
        ],
        constructionCost: 'R380,000 - R500,000'
    },
    {
        id: 3,
        name: 'Contemporary Modern',
        code: 'CM-2024-003',
        price: 3200,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '269 sq/m',
        storeys: 2,
        description: 'Sleek and sophisticated contemporary design with clean lines, minimalist aesthetics, and cutting-edge materials. Perfect for modern living.',
        image: '🏗️',
        included: [
            'Modern floor plans',
            'Contemporary elevation designs',
            'Smart home electrical systems',
            'Minimalist layout details',
            'High-tech plumbing specifications',
            'Energy-efficient systems',
            'Modern finish schedules'
        ],
        constructionCost: 'R420,000 - R550,000'
    },
    {
        id: 4,
        name: 'Townhouse Plan',
        code: 'TH-2024-004',
        price: 2200,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '176 sq/m',
        storeys: 3,
        description: 'Efficient townhouse design ideal for urban communities. Maximizes vertical space with practical layouts and modern convenience.',
        image: '🏢',
        included: [
            'Compact floor plans',
            'Elevation designs',
            'Vertical efficiency layouts',
            'Electrical specifications',
            'Plumbing coordination',
            'Stair details',
            'Urban integration notes'
        ],
        constructionCost: 'R320,000 - R420,000'
    },
    {
        id: 5,
        name: 'Traditional Colonial',
        code: 'TC-2024-005',
        price: 3400,
        bedrooms: 4,
        bathrooms: 3,
        floorArea: '316 sq/m',
        storeys: 2,
        description: 'Classic colonial design with timeless appeal, featuring columns, pitched roofs, and elegant proportions. A statement of tradition and stability.',
        image: '🏛️',
        included: [
            'Classical floor plans',
            'Colonial elevation designs',
            'Period-appropriate details',
            'Formal room layouts',
            'Electrical specifications',
            'Plumbing systems',
            'Traditional finish materials'
        ],
        constructionCost: 'R450,000 - R580,000'
    },
    {
        id: 6,
        name: 'Mountain Cabin',
        code: 'MC-2024-006',
        price: 1800,
        bedrooms: 2,
        bathrooms: 1,
        floorArea: '130 sq/m',
        storeys: 1,
        description: 'Cozy mountain cabin retreat with natural materials, warm finishes, and connection to nature. Perfect for a getaway or peaceful retreat.',
        image: '🏔️',
        included: [
            'Cabin floor plans',
            'Rustic elevation designs',
            'Natural material specifications',
            'Fireplace details',
            'Electrical systems',
            'Plumbing for remote areas',
            'Insulation and weatherproofing'
        ],
        constructionCost: 'R240,000 - R320,000'
    },
    {
        id: 7,
        name: 'Luxury Modern Estate',
        code: 'LME-2024-007',
        price: 5200,
        bedrooms: 5,
        bathrooms: 4,
        floorArea: '464 sq/m',
        storeys: 2,
        description: 'Premium contemporary estate featuring luxury finishes, smart home integration, and sophisticated design. Perfect for exclusive residences.',
        image: '💎',
        included: [
            'Luxury floor plans',
            'Premium elevation designs',
            'Smart home electrical layout',
            'Advanced plumbing systems',
            'Home automation specifications',
            'High-end finishes',
            'Security system integration'
        ],
        constructionCost: 'R750,000 - R1,000,000'
    },
    {
        id: 8,
        name: 'Sustainable Modern',
        code: 'SM-2024-008',
        price: 2600,
        bedrooms: 3,
        bathrooms: 2,
        floorArea: '204 sq/m',
        storeys: 2,
        description: 'Eco-friendly contemporary home with green building practices, renewable energy systems, and sustainable materials throughout.',
        image: '🌱',
        included: [
            'Sustainable floor plans',
            'Green elevation designs',
            'Solar panel layouts',
            'Rainwater harvesting systems',
            'Energy-efficient HVAC',
            'Recycled material specifications',
            'Green certification notes'
        ],
        constructionCost: 'R350,000 - R450,000'
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
