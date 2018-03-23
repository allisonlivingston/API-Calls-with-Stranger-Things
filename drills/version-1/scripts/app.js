var url = `https://quiet-bayou-99554.herokuapp.com/api/v1/contacts`

fetch(url)
  .then(function(data) {
    return data.json();
  })
  .then(function(myJson) {
    for(let i=0; i<5; i++) {
      var characterList = document.createElement('li');
      var selectUL = document.querySelector('ul');
      selectUL.appendChild(characterList)
      var html = `
        <img src='${myJson.data[i].imageURL}'>
        <span>${myJson.data[i].name} - ${myJson.data[i].phone}</span>
        <p>${myJson.data[i].message}</p>
        <a href="contact.html?name=${myJson.data[i].name}">Leave ${myJson.data[i].name} a message.</a>
      `
      characterList.innerHTML += html
      }
    })
