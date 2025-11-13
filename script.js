// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .cta-button, .order-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Fade-in animation on scroll
function checkFade() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
    checkFade();
});

window.addEventListener('scroll', checkFade);

// Product card hover animation
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Active nav link on scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class to navigation links in CSS
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: rgba(255, 255, 255, 0.15) !important;
        color: white !important;
        border-radius: 5px;
        font-weight: bold;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
    }
    
    nav a.active:hover {
        background-color: rgba(255, 255, 255, 0.25) !important;
    }
    
    .pickup-discount {
        color: #25D366;
        font-size: 0.9rem;
        font-style: italic;
        margin-left: 10px;
    }
    
    .delivery-included {
        color: #00B9FF;
        font-size: 0.9rem;
        font-style: italic;
        margin-left: 10px;
    }
`;
document.head.appendChild(style);

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('show');
        });
    }
});

// WhatsApp Order Form functionality
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    const summaryContent = document.getElementById('summary-content');
    const totalElement = document.getElementById('total');
    const whatsappNumber = "27713341705"; 

    
    const prices = {
        'jelly-pack': 12,
        'watermelon': 1,
        'giant-snake': 2,
        'tongue': 1,
        'heart': 1,
        'watch': 1,
        'doughnuts': 1,
        'sour-worm': 1,
        'strawberry': 1,
        'puffs': 1,
        'party-pack-10': 160,
        'party-pack-15': 220,
        'party-pack-20': 280
    };

    const deliveryFees = {
        'Mams East': 40, 
        'Mams West': 40  
    };

    function formatItemName(id) {
        const names = {
            'jelly-pack': 'Jelly Pack',
            'watermelon': 'Watermelon',
            'giant-snake': 'Giant Snake',
            'tongue': 'Tongue',
            'heart': 'Heart',
            'watch': 'Watch',
            'strawberry': 'Strawberry',
            'puffs': 'Puffs',
            'doughnuts': 'Doughnuts',
            'sour-worm': 'Sour Worm',
            'party-pack-10': 'Jelly Pack x10 Party Pack',
            'party-pack-15': 'Jelly Pack x15 Party Pack',
            'party-pack-20': 'Jelly Pack x20 Party Pack'
        };
        return names[id] || id;
    }

    function calculateIndividualItemsTotal() {
        let total = 0;
        for (const id of [
            'jelly-pack', 'watermelon', 'giant-snake', 'tongue',
            'heart', 'watch', 'doughnuts', 'sour-worm', 'strawberry', 'puffs'
        ]) {
            const qty = parseInt(document.getElementById(id)?.value) || 0;
            total += qty * prices[id];
        }
        return total;
    }

    function updateOrderSummary() {
        let total = 0;
        let summaryHTML = '';
        let items = [];
        let hasPartyPack = false;
        const area = document.getElementById('area').value;
        const isPickup = area === "Pickup";

        // Party Packs with pickup discount
        for (const id of ['party-pack-10', 'party-pack-15', 'party-pack-20']) {
            const qty = parseInt(document.getElementById(id)?.value) || 0;
            if (qty > 0) {
                hasPartyPack = true;
                let price = prices[id];
                let itemName = formatItemName(id);

                // Apply R40 discount for pickup
                if (isPickup) {
                    price -= 40;
                    itemName += ' (Pickup)';
                }

                const itemTotal = qty * price;
                total += itemTotal;
                items.push(`${qty}x ${itemName}`);
                summaryHTML += `<p>${formatItemName(id)}: ${qty} x R${price} = R${itemTotal}</p>`;

                if (isPickup) {
                    summaryHTML += `<p class="pickup-discount">✓ R40 pickup discount applied</p>`;
                } else {
                    summaryHTML += `<p class="delivery-included">✓ Delivery included</p>`;
                }
            }
        }

        // Individual Items
        for (const id of [
            'jelly-pack', 'watermelon', 'giant-snake', 'tongue',
            'heart', 'watch', 'doughnuts', 'sour-worm', 'strawberry', 'puffs'
        ]) {
            const qty = parseInt(document.getElementById(id)?.value) || 0;
            if (qty > 0) {
                const itemTotal = qty * prices[id];
                total += itemTotal;
                items.push(`${qty}x ${formatItemName(id)}`);
                summaryHTML += `<p>${formatItemName(id)}: ${qty} x R${prices[id]} = R${itemTotal}</p>`;
            }
        }

        // Delivery fee (only if no party pack and individual items exist)
        const individualItemsTotal = calculateIndividualItemsTotal();

        // Minimum order validation (5 jelly packs = R60)
        if (individualItemsTotal > 0 && individualItemsTotal < 60 && !isPickup) {
            summaryHTML += `<p style="color: #ff6b6b; font-weight: bold;">⚠️ Minimum order for delivery is R60 (5 jelly packs)</p>`;
        }

        if (!hasPartyPack && individualItemsTotal >= 60 && area && deliveryFees[area] && !isPickup) {
            total += deliveryFees[area];
            summaryHTML += `<p>Delivery Fee: R${deliveryFees[area]}</p>`;
        } else if (isPickup) {
            summaryHTML += `<p><strong>Pickup at Candy Bar premises (No Delivery Fee)</strong></p>`;
        }

        summaryContent.innerHTML = summaryHTML || '<p>No items selected</p>';
        totalElement.textContent = total;
        return { total, items, area, hasPartyPack, isPickup };
    }

    // Real-time update
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateOrderSummary);
    });
    document.getElementById('area').addEventListener('change', updateOrderSummary);

    // Form submission
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = orderForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const { total, items, area, hasPartyPack, isPickup } = updateOrderSummary();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Minimum order validation
        const individualItemsTotal = calculateIndividualItemsTotal();
        if (individualItemsTotal > 0 && individualItemsTotal < 60 && !isPickup) {
            alert('Minimum order for delivery is R60 (5 jelly packs). Please add more items or choose pickup.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        if (total === 0 || items.length === 0) {
            alert('Please add at least one item to your order.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const whatsappMessage = `*NEW ORDER FROM CANDY BAR WEBSITE*

👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📍 *Delivery Area:* ${area}

🛒 *Order Items:*
${items.map(item => `• ${item}`).join('\n')}

${hasPartyPack ? (isPickup ? '🎉 *Party pack with pickup discount applied*' : '🎉 *Party packs include free delivery!*') : ''}

💬 *Special Instructions:* ${message || 'None'}

💰 *Total Amount:* R${total}
💳 *Deposit:* R50 (required for 10+ jelly pack orders, non-refundable)

*Please confirm this order and arrange deposit payment.*`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');

        setTimeout(() => {
            alert('Opening WhatsApp with your order details...\n\nPlease send the message to complete your order.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });

    // Initial summary
    updateOrderSummary();
});

// Lightbox functionality for product images
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    // Open modal on image click
    document.querySelectorAll('.product-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Close modal on close button or outside click
    closeBtn.addEventListener('click', function () {
        modal.classList.remove('active');
        modalImg.src = '';
    });
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
});