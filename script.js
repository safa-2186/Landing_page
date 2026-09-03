/*Mobile Menu*/

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});     




/*FAQ*/

document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon');

        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
        });
    });     
    
    

/*Cart*/

const cartBtn = document.getElementById('cartBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartCount = document.getElementById('cartCount');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartItemsList = document.getElementById('cartItemsList');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.getElementById('cartSubtotal');        

let cart = [];

function openCart() {
    cartPanel.classList.remove('translate-x-full');
    cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
    cartOverlay.classList.add('opacity-100', 'pointer-events-auto');
}

function closeCart() {
    cartPanel.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0', 'pointer-events-none');
    cartOverlay.classList.remove('opacity-100', 'pointer-events-auto');

}


function renderCart() {
    if (cart.length === 0) {
        cartEmptyMsg.classList.remove('hidden');
        cartItemsList.classList.add('hidden');
        cartFooter.classList.add('hidden');
        cartCount.classList.add('hidden');
        cartCount.classList.remove('flex');
        return;
    }

cartEmptyMsg.classList.add('hidden');
cartItemsList.classList.remove('hidden');
cartFooter.classList.remove('hidden');
cartCount.classList.remove('hidden');
cartCount.classList.add('flex');

cartItemsList.innerHTML = '';
let total = 0;
let itemCount = 0;

cart.forEach((item, index) => {
    total += item.price * item.qty;
    itemCount += item.qty;

    const li = document.createElement('li');
    li.className = 'flex items-center gap-4';
    li.innerHTML =`
        <img src="${item.image}" class="w-16 h-16 rounded-md object-cover">
        <div class="flex-1">
            <div class="text-sm font-medium text-[#484731]">${item.name}</div>
            <div class="text-xs text-[#686963] mt-1">Qty: ${item.qty}</div>
        </div>
        <div class="text-sm font-medium">$${(item.price * item.qty).toFixed(2)}</div>
        <button data-index="${index}" class="cart-remove-btn text-[#D9534F] text-xs hover:underline cursor-pointer">Remove</button>
    `;
        cartItemsList.appendChild(li);
    });

    cartSubtotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount;

    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.splice(parseInt(btn.dataset.index), 1);
            renderCart();
        });
    });

}


function addToCart (product) {
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({...product, qty: 1});
    }
        renderCart();
        openCart();
}


cartBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

renderCart();



/*Shop-Products*/

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        addToCart({
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            image: btn.dataset.image
        });
    });
});