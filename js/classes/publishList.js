class PublishList{
  constructor(items, elementToRenderIn, cb){
    this.items = items
    this.elementToRenderIn = elementToRenderIn
    this.eventHandler = cb
  }


  // <!-- Modal 1 -->
  // <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
  //   <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="close-modal" data-dismiss="modal">
  //         <div class="lr">
  //           <div class="rl"></div>
  //         </div>
  //       </div>
  //       <div class="container">
  //         <div class="row">
  //           <div class="col-lg-8 mx-auto">
  //             <div class="modal-body">
  //               <!-- Project Details Go Here -->
  //               <h2 class="text-uppercase">Project Name</h2>
  //               <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
  //               <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
  //               <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
  //               <ul class="list-inline">
  //                 <li>Date: January 2017</li>
  //                 <li>Client: Threads</li>
  //                 <li>Category: Illustration</li>
  //               </ul>
  //               <button class="btn btn-primary" data-dismiss="modal" type="button">
  //                 <i class="fa fa-times"></i>
  //                 Close Project</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>





  static renderCard(paperData, cb){
    // console.log(paperData.title)
    const details =  document.querySelector('.details')

    //CREATE CARD ON page

    const card = document.createElement('div')
    addClassesToElement(card, 'col-md-4', 'col-sm-6', 'portfolio-item')

    const modalLink = document.createElement('a')
    addClassesToElement(modalLink, 'portfolio-link')
    modalLink.setAttribute('data-toggle', 'modal')
    // modalLink.setAttribute('href', 'which Modal')                      ----HOW TO BUILD MODALS PROPERLY
    card.appendChild(modalLink)

    const assignHover = document.createElement('div')
    addClassesToElement(assignHover, 'portfolio-hover')
    modalLink.appendChild(assignHover)

    const assignHoverContent = document.createElement('div')
    addClassesToElement(assignHoverContent, 'portfolio-hover-content')
    assignHover.appendChild(assignHoverContent)

    const italics = document.createElement('i')
    addClassesToElement(italics, 'fa', 'fa-plus', 'fa-3x')
    assignHoverContent.appendChild(italics)

    // const img = document.createElement('img')                          ---- THis may or may not be needed will decide later.
    // addClassesToElement(italics, 'img-fluid')
    // modalLink.appendChild(img)

    const portfolioCaption = document.createElement('div')
    addClassesToElement(portfolioCaption, 'portfolio-caption')
    card.appendChild(portfolioCaption)

    const paperTitle = document.createElement('h4')
    paperTitle.innerHTML = paperData.title
    portfolioCaption.appendChild(paperTitle)


    const paperAuthors = document.createElement('p')
    paperAuthors.innerHTML = paperData.authors
    addClassesToElement(paperAuthors, 'text-muted')
    portfolioCaption.appendChild(paperAuthors)


    return card
  }

  // impure method
  render(){
    const renderedProductsArray = this.items.map(product => PublishList.renderCard(product))

    // modifying the DOM
    empty(this.elementToRenderIn)
    appendChildrenArray(this.elementToRenderIn, renderedProductsArray)
  }
}
