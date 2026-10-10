const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        description: "Enjoy your favourite music anywhere.",
        image: "https://placehold.co/400x300/e4ebff/1746a2?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        description: "A smart companion for every day.",
        image: "https://placehold.co/400x300/e4ebff/1746a2?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 1799,
        description: "Comfort meets everyday style.",
        image: "https://placehold.co/400x300/f6e9df/744c35?text=Sneakers"
    },
    {
        id: 4,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1299,
        description: "Carry your essentials with ease.",
        image: "https://placehold.co/400x300/e3f1e7/306b45?text=Backpack"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1499,
        description: "Bring sound to your favourite moments.",
        image: "https://placehold.co/400x300/f2e5ff/65419a?text=Speaker"
    },
    {
        id: 6,
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 599,
        description: "An easy essential for every wardrobe.",
        image: "https://placehold.co/400x300/ffebeb/9b4545?text=T-Shirt"
    },
    {
        id: 7,
        name: "Classic Wrist Watch",
        category: "Accessories",
        price: 999,
        description: "A timeless touch for your outfit.",
        image: "https://placehold.co/400x300/fff1d6/805b16?text=Wrist+Watch"
    },
    {
        id: 8,
        name: "Table Lamp",
        category: "Home",
        price: 899,
        description: "Add a warm glow to your space.",
        image: "https://placehold.co/400x300/fff0d9/805b16?text=Table+Lamp"
    }
];

// Select HTML elements
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const sortFilter = document.getElementById("sortFilter");
const categoryFilters = document.getElementById("categoryFilters");
const productCount = document.getElementById("productCount");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "All";
let searchQuery = "";

function displayProducts(items) {
    productList.replaceChildren();

    productCount.textContent =
        `${items.length} products`;

    emptyMessage.hidden = items.length > 0;

    items.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = `₹${product.price.toLocaleString("en-IN")}`;

        const button = document.createElement("button");
        button.className = "add-btn";
        button.textContent = "View Product";
        button.addEventListener("click", () => {
            alert(`${product.name}\nPrice: ₹${product.price.toLocaleString("en-IN")}\n\nThis is a home page demo.`);
        });

        card.append(
            image,
            category,
            name,
            description,
            price,
            button
        );

        productList.appendChild(card);
    });
}

function filterProducts() {
    let filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortFilter.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    displayProducts(filtered);
}

// Search
searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    filterProducts();
});

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchQuery = searchInput.value.trim().toLowerCase();
    filterProducts();

    document.getElementById("featured").scrollIntoView({
        behavior: "smooth"
    });
});

// Category filters
categoryFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    selectedCategory = button.dataset.filter;

    categoryFilters.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn === button);
    });

    filterProducts();
});

// Category cards
document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        selectedCategory = card.dataset.category;

        categoryFilters.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.filter === selectedCategory
            );
        });

        filterProducts();
    });
});

// Price sorting
sortFilter.addEventListener("change", filterProducts);

// Mobile navbar
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Newsletter demo
document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput");
    const message = document.getElementById("newsletterMessage");

    message.textContent =
        `Thanks! ${emailInput.value} passed the demo form. No email was sent.`;

    emailInput.value = "";
});

// Automatically update the year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Initial product display
filterProducts();ss