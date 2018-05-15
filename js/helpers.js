// the handy dandy request tool used in the index.js


function request(path, method = 'get', body = null) {
  return axios(`https://obscure-falls-76162.herokuapp.com${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: body
  })
}

//////////////////////////////////////////
// Helper functions
//////////////////////////////////////////

function empty(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
  return element
}

function appendChildrenArray(parent, childrenArray){
  childrenArray.reduce((parentNode, child) => {
    parentNode.appendChild(child)
    return parentNode
  }, parent)
  return parent
}

function addClassesToElement(element, ...classes){
  return classes.reduce((acc, ele) => {
    element.classList.add(ele)
    return acc
  }, element)
}
