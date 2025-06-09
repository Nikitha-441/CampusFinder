const items = [
  {
    id: "wallet",
    name: "Wallet",
    category: "Accessories",
    date: "2025-04-28",
    location: "Cafeteria",
    status: "Found",
    image: "images/wallet.jpg",
    description: "A pink leather wallet with ID cards and cash.",
    contact: "9876543210"
  },
  {
    id: "water-bottle",
    name: "Water Bottle",
    category: "Accessories",
    date: "2025-04-26",
    location: "Library",
    status: "Lost",
    image: "images/bottle.jpg",
    description: "500ml blue bottle",
    contact: "student@example.com"
  },
  {
    id: "book",
    name: "Harry Potter ",
    category: "Books & Stationery",
    date: "2025-04-25",
    location: "Room 210",
    status: "Lost",
    image: "images/book.jpg",
    description: "Harry potter and deathly hallows",
    contact: "contact@hostel.com"
  },
  {
    id: "earbuds",
    name: "Bluetooth Earbuds",
    category: "Electronics",
    date: "2025-04-22",
    location: "Auditorium",
    status: "Lost",
    image: "images/earbuds.jpg",
    description: "Black JBL earbuds in a case.",
    contact: "9988776655"
  },
  {
    id: "bag",
    name: "Backpack",
    category: "Accessories",
    date: "2025-04-20",
    location: "Parking Lot",
    status: "Found",
    image: "images/bag.jpg",
    description: "mustard yellow backpack with one notebook inside.",
    contact: "founder@campus.com"
  }
];
function showItems(filteredItems = items) {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";

  filteredItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.id = item.id;
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p><i class="fa-solid fa-calendar-days"></i> ${item.date}</p>
        <p><i class="fa-solid fa-location-dot"></i> ${item.location}</p>
        <p><i class="fa-solid fa-layer-group"></i> ${item.category}</p>
        <p><i class="fa-solid fa-envelope"></i> ${item.contact}</p>
        <p>${item.description}</p>
        <span class="tag ${item.status.toLowerCase()}">${item.status}</span>
      </div>
    `;
    grid.appendChild(div);
  });
}
function filterByStatus(status) {
  const filtered = (status === "All") ? items : items.filter(item => item.status === status);
  showItems(filtered);
}

const searchInput = document.getElementById("searchInput");
searchInput.oninput = function () {
  const keyword = searchInput.value.toLowerCase();
  const filtered = items.filter(item =>
    (item.name + item.description + item.location + item.category)
      .toLowerCase()
      .includes(keyword)
  );
  showItems(filtered);
};

document.querySelectorAll(".toggle-status button").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".toggle-status button").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const status = this.dataset.status;
    filterByStatus(status);
  });
});

const categoryFilter = document.getElementById("categoryFilter");
categoryFilter.onchange = function () {
  const selectedCategory = categoryFilter.value.trim();
  let filtered = items;
  if (selectedCategory) {
    filtered = filtered.filter(item => item.category.trim() === selectedCategory);
  }
  // Also filter by status if a toggle is active
  const activeStatusBtn = document.querySelector(".toggle-status button.active");
  const status = activeStatusBtn ? activeStatusBtn.dataset.status : "All";
  if (status !== "All") {
    filtered = filtered.filter(item => item.status === status);
  }
  showItems(filtered);
};
// Initial Load
showItems();
