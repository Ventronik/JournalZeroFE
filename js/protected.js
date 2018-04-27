(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $(".navbar").removeClass("d-none");
  })

  // Signout
  function signout(){
    localStorage.removeItem('token')
  }
  document.querySelector('.signout').addEventListener('click', signout)

  function submit(){
    // event.preventDefault()

    const title = event.target.title.value
    const authors = event.target.authors.value
    const field = event.target.field.value
    const url = event.target.url.value
    const abstract = event.target.abstract.value

    request('/auth/token')
    .then(function(response){
      console.log('response',response)
      return request(`/users/${response.data.id}/papers`, 'post', {title, authors, field, url, abstract})
      .then(function(newPaper){
        console.log('newpaper', newPaper)
      })
    })
  }

  document.querySelector('.paper-submission').addEventListener('submit',submit)
    // event.target
})(jQuery); // End of use strict


(function() {
  'use strict';

  // authe gate
  request('/auth/token')
  .then(function(response){
    // user is logged in
    return request (`/users/${response.data.id}/papers`)

  })
  .then(function(response){
    const publishedPapers = new PublishList(
                          response.data.data ,
                          document.querySelector('#published-Papers'),
                        )
                  publishedPapers.render(publishedPapers)
  })
  .catch(function(error){
    // user is not logged in
    window.location = '/index.html'
  })



})();
