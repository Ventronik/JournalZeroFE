class PublishList{
  constructor(items, elementToRenderIn, cb){
    this.items = items
    this.elementToRenderIn = elementToRenderIn
    this.eventHandler = cb
  }

  static renderCard(paperData, cb){
    const details =  document.querySelector('.details')

    //CREATE CARD ON page

    const card = document.createElement('div')
    addClassesToElement(card, 'col-md-4', 'col-sm-6', 'portfolio-item')
    card.setAttribute('data-abstract', paperData.abstract)
    card.setAttribute('data-id', paperData.id)
    card.setAttribute('data-field', paperData.field)
    card.setAttribute('data-status', paperData.status)
    card.setAttribute('data-publishDate', paperData.updated_at)
    card.setAttribute('data-siteOfPaper', paperData.url)
    card.setAttribute('data-title', paperData.title)
    card.setAttribute('data-authors', paperData.authors)

    const modalLink = document.createElement('a')
    addClassesToElement(modalLink, 'portfolio-link')
    modalLink.setAttribute('data-toggle', 'modal')
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

    const portfolioCaption = document.createElement('div')
    addClassesToElement(portfolioCaption, 'portfolio-caption')
    portfolioCaption.setAttribute('data-toggle','modal')
    portfolioCaption.setAttribute('data-target','#paperModal')
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
    const renderedProductsArray = this.items.map(paper => PublishList.renderCard(paper))

    // modifying the DOM
    empty(this.elementToRenderIn)
    appendChildrenArray(this.elementToRenderIn, renderedProductsArray)
  }
}
