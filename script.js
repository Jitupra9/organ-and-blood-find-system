// DOM Elements
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginOptions = document.querySelectorAll(".login-option");
const loginForm = document.getElementById("loginForm");

navbarToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});

// Close login modal
closeModal.addEventListener("click", () => {
  loginModal.style.display = "none";
  resetLoginForm();
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
    resetLoginForm();
  }
});

// Handle login option selection
loginOptions.forEach((option) => {
  option.addEventListener("click", () => {
    loginOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
    loginForm.style.display = "block";
    document.getElementById("username").focus();
  });
});

// Reset login form
function resetLoginForm() {
  loginForm.reset();
  loginForm.style.display = "none";
  loginOptions.forEach((opt) => opt.classList.remove("selected"));
}

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Create blood cells animation
  createBloodCells();

  // Initialize tabs
  initTabs();

  // Initialize form
  initForm();

  // Initialize counters
  initCounters();

  // Initialize donation centers
  loadDonationCenters();

  // Initialize map
  initMap();

  // Add event listeners
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
  document
    .getElementById("currentLocationBtn")
    .addEventListener("click", handleGetCurrentLocation);
});

// Scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Create blood cells animation
function createBloodCells() {
  const container = document.getElementById("bloodCellsContainer");

  for (let i = 0; i < 10; i++) {
    const cell = document.createElement("div");
    cell.className = "blood-cell";

    // Random size between 20px and 70px
    const size = Math.random() * 50 + 20;
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;

    // Random position
    cell.style.left = `${Math.random() * 100}%`;
    cell.style.top = `${Math.random() * 100}%`;

    container.appendChild(cell);

    // Animate the cell
    animateBloodCell(cell);
  }
}

// Animate blood cell
function animateBloodCell(cell) {
  // Random duration between 10s and 20s
  const duration = Math.random() * 10000 + 10000;

  // Random movement
  const xMove = Math.random() * 100 - 50;
  const yMove = Math.random() * 100 - 50;

  // Set initial position
  const initialX = parseFloat(cell.style.left);
  const initialY = parseFloat(cell.style.top);

  let startTime = null;
  let direction = 1;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress > 1) {
      startTime = timestamp;
      direction *= -1;
    }

    const currentProgress = direction > 0 ? progress : 1 - progress;

    // Move the cell
    cell.style.transform = `translate(${xMove * currentProgress}px, ${
      yMove * currentProgress
    }px)`;

    // Change opacity
    cell.style.opacity = 0.7 - currentProgress * 0.5;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Initialize tabs
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`${tabId}Tab`).classList.add("active");
    });
  });
}

// Initialize form
function initForm() {
  const form = document.getElementById("emergencyForm");
  const requestTypeSelect = document.getElementById("requestType");
  const bloodTypeGroup = document.getElementById("bloodTypeGroup");
  const organTypeGroup = document.getElementById("organTypeGroup");

  // Show/hide blood type or organ type based on request type
  requestTypeSelect.addEventListener("change", () => {
    const value = requestTypeSelect.value;

    if (value === "blood") {
      bloodTypeGroup.style.display = "block";
      organTypeGroup.style.display = "none";
    } else if (value === "organ") {
      bloodTypeGroup.style.display = "none";
      organTypeGroup.style.display = "block";
    } else {
      bloodTypeGroup.style.display = "none";
      organTypeGroup.style.display = "none";
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Simulate form submission
      setTimeout(() => {
        form.style.display = "none";
        document.getElementById("successMessage").style.display = "block";

        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          form.style.display = "block";
          document.getElementById("successMessage").style.display = "none";
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Submit Emergency Request";
          bloodTypeGroup.style.display = "none";
          organTypeGroup.style.display = "none";
        }, 3000);
      }, 1500);
    }
  });
}

// Validate form
function validateForm() {
  let isValid = true;
  const fields = [
    {
      id: "name",
      error: "nameError",
      message: "Name is required",
      minLength: 2,
    },
    {
      id: "phone",
      error: "phoneError",
      message: "Valid phone number is required",
      minLength: 10,
    },
    {
      id: "email",
      error: "emailError",
      message: "Valid email is required",
      type: "email",
    },
    {
      id: "location",
      error: "locationError",
      message: "Location is required",
      minLength: 5,
    },
    {
      id: "requestType",
      error: "requestTypeError",
      message: "Please select a request type",
    },
    {
      id: "urgencyLevel",
      error: "urgencyLevelError",
      message: "Please select urgency level",
    },
  ];

  // Clear all error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });

  // Validate each field
  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    const errorElement = document.getElementById(field.error);
    const value = element.value.trim();

    if (!value) {
      errorElement.textContent = field.message;
      isValid = false;
    } else if (field.minLength && value.length < field.minLength) {
      errorElement.textContent = field.message;
      isValid = false;
    } else if (field.type === "email" && !isValidEmail(value)) {
      errorElement.textContent = field.message;
      isValid = false;
    }
  });

  // Validate blood type or organ type based on request type
  const requestType = document.getElementById("requestType").value;

  if (requestType === "blood") {
    const bloodType = document.getElementById("bloodType").value;
    if (!bloodType) {
      document.getElementById("bloodTypeError").textContent =
        "Please select blood type";
      isValid = false;
    }
  } else if (requestType === "organ") {
    const organType = document.getElementById("organType").value;
    if (!organType) {
      document.getElementById("organTypeError").textContent =
        "Please select organ type";
      isValid = false;
    }
  }

  return isValid;
}

// Validate email
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Initialize counters
function initCounters() {
  const counters = document.querySelectorAll(".stat-value");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-value"));
        const suffix = counter.getAttribute("data-suffix") || "";

        animateCounter(counter, 0, target, 2000, suffix);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Animate counter
function animateCounter(element, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Donation centers data
const donationCenters = [
  {
    id: "dc1",
    name: "City General Hospital",
    address: "123 Main St, Downtown",
    status: "Open",
    distance: 1.2,
    bloodTypes: ["A+", "A-", "O+", "O-", "B+"],
    lat: 0.02,
    lng: 0.01,
  },
  {
    id: "dc2",
    name: "Westside Medical Center",
    address: "456 Park Ave, Westside",
    status: "Open",
    distance: 2.5,
    bloodTypes: ["A+", "AB+", "B-", "O+"],
    lat: -0.03,
    lng: 0.02,
  },
  {
    id: "dc3",
    name: "Eastside Blood Bank",
    address: "789 Oak St, Eastside",
    status: "Closed",
    distance: 3.7,
    bloodTypes: ["All Types"],
    lat: 0.04,
    lng: -0.02,
  },
  {
    id: "dc4",
    name: "North County Hospital",
    address: "101 Pine Rd, Northside",
    status: "Open",
    distance: 4.1,
    bloodTypes: ["A+", "A-", "B+", "AB+", "O-"],
    lat: -0.01,
    lng: -0.04,
  },
  {
    id: "dc5",
    name: "South Memorial Clinic",
    address: "202 Elm St, Southside",
    status: "Open",
    distance: 5.3,
    bloodTypes: ["O+", "O-", "B+", "B-"],
    lat: 0.03,
    lng: 0.05,
  },
  {
    id: "dc6",
    name: "Central Donation Center",
    address: "303 Maple Ave, Midtown",
    status: "Closed",
    distance: 2.8,
    bloodTypes: ["All Types"],
    lat: -0.02,
    lng: 0.03,
  },
];

// Load donation centers
function loadDonationCenters() {
  const centersList = document.getElementById("centersList");
  centersList.innerHTML = "";

  donationCenters.forEach((center) => {
    const centerCard = document.createElement("div");
    centerCard.className = "center-card";
    centerCard.innerHTML = `
      <div class="center-image" style="background-image: url('https://placeholder.pics/svg/600x400')"></div>
      <div class="center-content">
        <div class="center-header">
          <h3 class="center-name">${center.name}</h3>
          <span class="center-status ${center.status.toLowerCase()}">${
      center.status
    }</span>
        </div>
        <p class="center-address"><i class="fas fa-map-marker-alt"></i> ${
          center.address
        }</p>
        <p class="center-distance"><strong>Distance:</strong> ${
          center.distance
        } miles away</p>
        <div class="center-blood-types">
          <p>Blood Types Available:</p>
          <div class="blood-type-tags">
            ${center.bloodTypes
              .map((type) => `<span class="blood-type-tag">${type}</span>`)
              .join("")}
          </div>
        </div>
        <button class="btn btn-primary btn-full">Get Directions</button>
      </div>
    `;

    centersList.appendChild(centerCard);
  });
}

// Handle search
function handleSearch() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();

  if (!location) return;

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.disabled = true;
  searchBtn.textContent = "Searching...";

  // Simulate search delay
  setTimeout(() => {
    // In a real app, this would filter based on location
    const shuffledCenters = [...donationCenters].sort(
      () => 0.5 - Math.random()
    );
    const filteredCenters = shuffledCenters.slice(0, 3);

    // Update centers list
    const centersList = document.getElementById("centersList");
    centersList.innerHTML = "";

    filteredCenters.forEach((center) => {
      const centerCard = document.createElement("div");
      centerCard.className = "center-card";
      centerCard.innerHTML = `
        <div class="center-image" style="background-image: url('https://placeholder.pics/svg/600x400')"></div>
        <div class="center-content">
          <div class="center-header">
            <h3 class="center-name">${center.name}</h3>
            <span class="center-status ${center.status.toLowerCase()}">${
        center.status
      }</span>
          </div>
          <p class="center-address"><i class="fas fa-map-marker-alt"></i> ${
            center.address
          }</p>
          <p class="center-distance"><strong>Distance:</strong> ${
            center.distance
          } miles away</p>
          <div class="center-blood-types">
            <p>Blood Types Available:</p>
            <div class="blood-type-tags">
              ${center.bloodTypes
                .map((type) => `<span class="blood-type-tag">${type}</span>`)
                .join("")}
            </div>
          </div>
          <button class="btn btn-primary btn-full">Get Directions</button>
        </div>
      `;

      centersList.appendChild(centerCard);
    });

    // Update map
    updateMap(filteredCenters);

    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }, 1000);
}

// Handle get current location
function handleGetCurrentLocation() {
  const locationInput = document.getElementById("locationInput");
  const currentLocationBtn = document.getElementById("currentLocationBtn");

  currentLocationBtn.disabled = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would use these coordinates to find nearest centers
        locationInput.value = "Current Location";
        handleSearch();
        currentLocationBtn.disabled = false;
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to get your current location. Please enter your location manually."
        );
        currentLocationBtn.disabled = false;
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    currentLocationBtn.disabled = false;
  }
}

// Initialize map
function initMap() {
  const map = document.getElementById("map");

  // This is a placeholder for a real map implementation
  // In a real app, you would use Google Maps, Mapbox, or Leaflet
  renderMap(donationCenters);

  // Add event listeners for zoom buttons
  document.getElementById("zoomIn").addEventListener("click", () => {
    // Zoom in logic would go here
    alert("Zoom in functionality would be implemented with a real map API");
  });

  document.getElementById("zoomOut").addEventListener("click", () => {
    // Zoom out logic would go here
    alert("Zoom out functionality would be implemented with a real map API");
  });
}

// Render map
function renderMap(centers) {
  const map = document.getElementById("map");

  // Create canvas for the map
  const canvas = document.createElement("canvas");
  canvas.width = map.clientWidth;
  canvas.height = map.clientHeight;
  map.innerHTML = "";
  map.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Draw map background
  ctx.fillStyle = "#e5e7eb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw some roads
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;

  // Horizontal roads
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (canvas.height / 5) * i);
    ctx.lineTo(canvas.width, (canvas.height / 5) * i);
    ctx.stroke();
  }

  // Vertical roads
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo((canvas.width / 5) * i, 0);
    ctx.lineTo((canvas.width / 5) * i, canvas.height);
    ctx.stroke();
  }

  // Draw center marker (user location)
  ctx.fillStyle = "#3b82f6";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw donation centers
  centers.forEach((center, index) => {
    // Calculate position based on center's lat/lng
    // This is just a placeholder calculation
    const x = canvas.width / 2 + center.lat * 50;
    const y = canvas.height / 2 + center.lng * 50;

    // Draw marker
    ctx.fillStyle = center.status === "Open" ? "#10b981" : "#ef4444";
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw label
    ctx.fillStyle = "#000000";
    ctx.font = "12px Arial";
    ctx.fillText(center.name, x + 15, y + 5);

    // Add click event for the marker
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if click is on the marker
      const distance = Math.sqrt(
        Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2)
      );
      if (distance <= 8) {
        showMapInfoPanel(center);
      }
    });
  });
}

// Update map
function updateMap(centers) {
  renderMap(centers);
}

// Show map info panel
function showMapInfoPanel(center) {
  const infoPanel = document.getElementById("mapInfoPanel");
  infoPanel.innerHTML = `
    <h3 class="center-name">${center.name}</h3>
    <p class="center-address">${center.address}</p>
    <div class="center-header" style="margin-top: 0.5rem;">
      <span class="center-status ${center.status.toLowerCase()}">${
    center.status
  }</span>
      <span>${center.distance} miles</span>
    </div>
  `;
  infoPanel.style.display = "block";
}

// Handle window resize
window.addEventListener("resize", () => {
  if (document.getElementById("map")) {
    renderMap(donationCenters);
  }
});
