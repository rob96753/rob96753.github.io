// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.querySelector('.navbar ul');
  
  if (hamburger && navbar) {
    hamburger.addEventListener('click', function() {
      // Toggle the active class on the hamburger for animation
      hamburger.classList.toggle('active');
      
      // Toggle the active class on the navbar to show/hide menu
      navbar.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navbar.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnHamburger && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
    
    // Close menu when clicking on a menu item
    const menuLinks = navbar.querySelectorAll('a');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
});
