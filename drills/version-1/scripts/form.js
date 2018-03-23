const url = `https://quiet-bayou-99554.herokuapp.com/api/v1/contacts`
var paragraph = document.querySelector('p')
var form = document.querySelector('form')

function getCharacter() {
  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(myJson) {
      for(let i=0; i<5; i++) {
        var characterName = myJson.data[i].name
        var currentURL = window.location.href
        var queryString = currentURL.split('?')[1]
        var character = queryString.split('=')[1]
        var name = document.querySelector('.name')
        
        name.setAttribute('value', character)
      }

    form.addEventListener('submit', function() {
      event.preventDefault();

      var text = document.querySelector('textArea')
      const formData = new FormData(form)
      var message = formData.get('name')
      var postBody = {
        data: {
          character: character,
          message: message
        }
      }

      var object = {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: ({
          'content-type': 'application/json'
        })
      }

    fetch(url, object)
      .then(function(response) {
      return response.json()
      })
      .then(function(response) {
        if(response.data) {
          paragraph.textContent = response.data.message
        } else {
          paragraph.textContent = response.error.message}
      })
    })
  })
}

getCharacter();
