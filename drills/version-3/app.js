const getURL = 'https://secure-eyrie-78012.herokuapp.com/roles'
const postURL = 'https://secure-eyrie-78012.herokuapp.com/users'

var dropDownMenu = document.querySelector('.role-preview')
var selectImage = document.querySelector('img')
var firstName = document.querySelector('.first-name')
var lastName = document.querySelector('.last-name')
var form = document.querySelector('form')
var message = document.querySelector('p')

getData()
form.addEventListener('submit', submitForm)

function getData() {
  return fetch(getURL)
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    for(let i=0; i<response.length; i++) {
      var createOptions = document.createElement('option')
      createOptions.value = response[i].id
      dropDownMenu.appendChild(createOptions)
      createOptions.innerHTML = response[i].label
    }

    dropDownMenu.addEventListener('change', displayImage)

    function displayImage(event) {
      var selectOptions = document.querySelectorAll('option')
      for(let i=0; i<=response.length; i++) {
        if(event.target.value == response[0].id) {
          selectImage.src = response[0].imageURL
        } else if(event.target.value == response[1].id) {
          selectImage.src = response[1].imageURL
        } else if(event.target.value == response[2].id) {
          selectImage.src = response[2].imageURL
        }
        else {
          selectImage.src = "assets/placeholder.jpg"
        }
      }
    }
  })
}

function submitForm() {
  event.preventDefault()

  return fetch(postURL, {
    method: 'POST',
    body: JSON.stringify({
      firstName: form.elements[0].value,
      lastName: form.elements[1].value,
      role: form.elements[2].value
      }),
    headers: ({
      'content-type': 'application/json'
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    message.innerHTML = response.message
    setTimeout(function displayMessage() {
      message.innerHTML = ''
    }, 4000)
  })
}
