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

})(jQuery); // End of use strict

//////////////////////////////////////////////////////////////////////////////
// Build Published Paper Section for easy browsing.
//////////////////////////////////////////////////////////////////////////////

(function() {
  'use strict';

  request('/papers/published')
  .then(function(response){
    // console.log(response.data.data)
    const publishedPapers = new PublishList(
                          response.data.data ,
                          document.querySelector('#published-Papers'),
                        )
                  console.log(  publishedPapers  )
                  publishedPapers.render(publishedPapers)





          let cards = document.querySelectorAll('.portfolio-item')

          cards.forEach(function(elem) {
            elem.addEventListener("click", myModal(elem));
          })
  })
  .catch(function(error){
    // user is not authenticated
    console.log(error)
  })

  function myModal(paper){
    return function(event){
      document.querySelector('#paperModalLabel').innerHTML = paper.getAttribute('data-title')
      document.querySelector('.modal-abstract').innerHTML = paper.getAttribute('data-abstract')
      document.querySelector('.modal-link').setAttribute('href', paper.getAttribute('data-siteOfPaper'))
      document.querySelector('.modal-authors').innerHTML = paper.getAttribute('data-authors')
      document.querySelector('.modal-field').innerHTML = paper.getAttribute('data-field')
      document.querySelector('.modal-publishdate').innerHTML = `Date published: ${paper.getAttribute('data-publishdate')}`
      let apa1 = `APA: ${paper.getAttribute('data-authors')} (${paper.getAttribute('data-publishdate')}).`
      let apaTitle = `${paper.getAttribute('data-title')}.`
      let apa2 = `Retrieved from${paper.getAttribute('data-siteOfPaper')} (url)`
      document.querySelector('.apa1').innerHTML = apa1
      document.querySelector('.apa-title').innerHTML = apaTitle
      document.querySelector('.apa2').innerHTML = apa2
    }
  }


})()
