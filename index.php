<?php include_once 'config/config.php' ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emergency Blood & Organ Donation</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

  <nav class="navbar">
    <div class="container">
      <a href="#" class="navbar-logo">EmergencyDonation</a>
      <button class="navbar-toggle" id="navbarToggle">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="navbar-menu" id="navbarMenu">
        <li><a href="#" class="navbar-link">Home</a></li>
        <li><a href="#search" class="navbar-link">Find Centers</a></li>
        <li><a href="#emergency" class="navbar-link">Emergency Request</a></li>
        <li><a href="#" class="navbar-link">About Us</a></li>
        <li class="navbar-link" id="loginBtn">Login</li>
      </ul>
    </div>
  </nav>
  <main>
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Emergency Blood & Organ Donation</h1>
          <p>Find the nearest donation centers in your area for urgent blood and organ needs. Every second counts.</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" onclick="scrollToSection('search')">Find Donation Centers</button>
            <button class="btn btn-outline" onclick="scrollToSection('emergency')">Emergency Request</button>
          </div>
        </div>
      </div>
      <div class="blood-cells-container" id="bloodCellsContainer"></div>
    </section>
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-tint"></i>
            </div>
            <h3>Blood Donations</h3>
            <div class="stat-value" data-value="3" data-suffix="M+">0</div>
            <p>Lives saved annually</p>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>Organ Donations</h3>
            <div class="stat-value" data-value="75" data-suffix="K+">0</div>
            <p>Successful transplants</p>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3>Donation Centers</h3>
            <div class="stat-value" data-value="1200" data-suffix="+">0</div>
            <p>Nationwide locations</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section id="search" class="search">
      <div class="container">
        <div class="search-header">
          <h2>Find Donation Centers Near You</h2>

          <div class="search-box">
            <div class="search-input-container">
              <input type="text" id="locationInput" placeholder="Enter your location">
              <i class="fas fa-search"></i>
            </div>
            <button class="btn btn-primary" id="searchBtn">Search</button>
            <button class="btn btn-outline" id="currentLocationBtn">
              <i class="fas fa-map-marker-alt"></i> Current Location
            </button>
          </div>
        </div>

        <div class="tabs">
          <div class="tabs-header">
            <button class="tab-btn active" data-tab="list">List View</button>
            <button class="tab-btn" data-tab="map">Map View</button>
          </div>

          <div class="tab-content active" id="listTab">
            <div class="centers-grid" id="centersList">
              <!-- Centers will be populated by JavaScript -->
            </div>
          </div>

          <div class="tab-content" id="mapTab">
            <div class="map-container">
              <div id="map"></div>

              <div class="map-controls">
                <button class="map-control-btn" id="zoomIn">+</button>
                <button class="map-control-btn" id="zoomOut">-</button>
              </div>

              <div class="map-legend">
                <div class="legend-title">Legend</div>
                <div class="legend-item">
                  <div class="legend-color blue"></div>
                  <span>Your Location</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color green"></div>
                  <span>Open Center</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color red"></div>
                  <span>Closed Center</span>
                </div>
              </div>

              <div class="map-info-panel" id="mapInfoPanel">
                <!-- Will be populated by JavaScript when a center is selected -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Request Section -->
    <section id="emergency" class="emergency">
      <div class="container">
        <div class="emergency-header">
          <div class="emergency-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h2>Emergency Request</h2>
          <p>Submit an urgent request for blood or organ donation. Our team will connect you with the nearest available
            resources.</p>
        </div>

        <div class="form-container">
          <form id="emergencyForm">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe">
                <div class="error-message" id="nameError"></div>
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" placeholder="(123) 456-7890">
                <div class="error-message" id="phoneError"></div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="john@example.com">
                <div class="error-message" id="emailError"></div>
              </div>

              <div class="form-group">
                <label for="location">Hospital/Location</label>
                <input type="text" id="location" name="location" placeholder="City Hospital, New York">
                <div class="error-message" id="locationError"></div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="requestType">Request Type</label>
                <select id="requestType" name="requestType">
                  <option value="">Select request type</option>
                  <option value="blood">Blood Donation</option>
                  <option value="organ">Organ Donation</option>
                </select>
                <div class="error-message" id="requestTypeError"></div>
              </div>

              <div class="form-group" id="bloodTypeGroup" style="display: none;">
                <label for="bloodType">Blood Type</label>
                <select id="bloodType" name="bloodType">
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div class="error-message" id="bloodTypeError"></div>
              </div>

              <div class="form-group" id="organTypeGroup" style="display: none;">
                <label for="organType">Organ Type</label>
                <select id="organType" name="organType">
                  <option value="">Select organ type</option>
                  <option value="kidney">Kidney</option>
                  <option value="liver">Liver</option>
                  <option value="heart">Heart</option>
                  <option value="lung">Lung</option>
                  <option value="pancreas">Pancreas</option>
                  <option value="cornea">Cornea</option>
                </select>
                <div class="error-message" id="organTypeError"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="urgencyLevel">Urgency Level</label>
              <select id="urgencyLevel" name="urgencyLevel">
                <option value="">Select urgency level</option>
                <option value="critical">Critical (Hours)</option>
                <option value="urgent">Urgent (24 hours)</option>
                <option value="high">High (2-3 days)</option>
                <option value="medium">Medium (1 week)</option>
              </select>
              <div class="error-message" id="urgencyLevelError"></div>
            </div>

            <div class="form-group">
              <label for="additionalInfo">Additional Information</label>
              <textarea id="additionalInfo" name="additionalInfo"
                placeholder="Please provide any additional details that might be relevant..." rows="4"></textarea>
              <div class="form-description">Include any medical conditions, allergies, or special requirements.</div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-full" id="submitBtn">
              Submit Emergency Request
            </button>
          </form>

          <div id="successMessage" class="success-message" style="display: none;">
            <div class="success-icon">
              <i class="fas fa-check"></i>
            </div>
            <h3>Request Submitted</h3>
            <p>Your emergency request has been received. Our team will contact you shortly.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>Emergency Donation</h3>
            <p>Connecting those in need with life-saving donations quickly and efficiently.</p>
          </div>
          <div class="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#search">Find Donation Centers</a></li>
              <li><a href="#emergency">Emergency Request</a></li>
              <li><a href="#">Become a Donor</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Contact</h3>
            <p>
              Emergency Hotline: (800) 123-4567<br>
              Email: help@emergencydonation.org
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; <span id="currentYear"></span> Emergency Donation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </main>

  <!-- Login Modal -->
  <div class="modal" id="loginModal">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <h2>Login</h2>
      <div class="login-options">
        <button class="login-option" data-type="donor">
          <i class="fas fa-user"></i>
          <span>User</span>
        </button>
        <button class="login-option" data-type="hospital">
          <i class="fas fa-hospital"></i>
          <span>Hospital</span>
        </button>
        <button class="login-option" data-type="organizer">
          <i class="fas fa-users"></i>
          <span>Organizer</span>
        </button>
      </div>
      <form id="loginForm" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id = "username"class="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-full">Login</button>
      </form>
      <p class="login-footer">Don't have an account? <a href="#">Sign up</a></p>
    </div>
  </div>



  <script>
    $(document).ready(function () {
      $('.login-option').on('click', function () {
        const userType = $(this).data('type');
        $('#loginForm').data('user-type', userType);
      });
      $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const username = $('.username').val().trim();
        const password = $('.password').val().trim();
        const userType = $(this).data('user-type');
        console.log('Login attempt:', { userType, username, password });
        $.ajax({
          url: 'login.php',
          method: 'POST',
          data: {
            username: username,
            password: password,
            userType: userType
          },
          success: function (response) {
            const res = JSON.parse(response);
            if(res.success){

            }else if(res.err){
              alert(res.error)
            }
          },
          error: function () {
          }
        });
      });
    });

  </script>

  <script src="script.js?v=<?php echo $v?>"></script>
</body>

</html>