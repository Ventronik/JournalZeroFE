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


//Create a Paper
  function submit(){
    event.preventDefault()

    const title = event.target.title.value
    const authors = event.target.authors.value
    const field = event.target.field.value
    const url = event.target.url.value
    const abstract = event.target.abstract.value

    request('/auth/token')
    .then(function(response){
      return request(`/users/${response.data.id}/papers`, 'post', {title, authors, field, url, abstract})
    })
  }

//Update a Paper
  function update(elem){
    // event.preventDefault()

    request('/auth/token')
    .then(function(response){
      let paperNum = document.querySelector('.paperStatusChange').getAttribute('data-paper_id')
      let paperStatus = document.querySelector('.publish-status').innerHTML
      let status_id = '';
        if(paperStatus === 'Pending') {
          status_id = 1
        } else if (paperStatus === 'Peer Review') {
          status_id = 2
        } else {status_id = 3}
      return request(`/users/${response.data.id}/papers/${paperNum}`, 'post', {status_id})
    })
  }

  document.querySelector('.paper-submission').addEventListener('submit',(event)=>update(event))

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
                          response.data.data,
                          document.querySelector('#published-Papers'),
                        )
                        publishedPapers.render(publishedPapers)


      let cards = document.querySelectorAll('.portfolio-item')
      cards.forEach(function(elem) {
        elem.addEventListener("click", myModal(elem));
      })
  })
  .catch(function(error){
    // user is not logged in
    window.location = '/index.html'
  })

  function myModal(paper){
    return function(event){
      document.querySelector('#paperModalLabel').innerHTML = paper.getAttribute('data-title')
      document.querySelector('.paperStatusChange').setAttribute('data-paper_id', paper.getAttribute('data-Id'))
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
      document.querySelector('.publish-status').innerHTML = paper.getAttribute('data-status')
    }
  }

  let statusSelector = document.querySelectorAll('.dropdown-item')
  statusSelector.forEach(function(elem) {
    elem.addEventListener('click',()=>{buttonTextChange(elem)});
  })

})();

function buttonTextChange (selection) {
  document.querySelector('.publish-status').innerHTML = selection.innerHTML
}
