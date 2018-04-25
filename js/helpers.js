// the handy dandy request tool used in the index.js


function request(path, method = 'get', body = null) {
  let bearerToken = ''
    const token = localStorage.getItem('token')

  if(token){
    bearerToken = `Bearer ${token}`
  }

  return axios(`http://localhost:3000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
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
