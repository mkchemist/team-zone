<div class="bg-primary shadow">
  <nav class="navbar navbar-expand-lg navbar-dark container-fluid">
      <a href="{{ url('/') }}" class="navbar-brand font-weight-bolder">
        <span class="far fa-calendar-check text-lightgreen"></span>
        <span>Team</span><span class="text-lightgreen"> Zone</span>
      </a>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#home_navbar">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="home_navbar">
          <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                  <a href="{{ url('/') }}" class="nav-link">Home</a>
              </li>
              <li class="nav-item active">
                  <a href="{{ url('/register') }}" class="nav-link">Register</a>
              </li>
              <li class="nav-item active">
                  <a href="{{ url('/help') }}" class="nav-link">Help</a>
              </li>
          </ul>
      </div>
  </nav>
</div>
