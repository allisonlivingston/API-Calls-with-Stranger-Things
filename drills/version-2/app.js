const gameURL = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/GBP'
const postURL = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board'

const game = "GBP"
var score
let name = document.querySelector('.big-input')

var scoresSection = document.querySelector('.scores')
var canvas = document.querySelector('canvas')

getData()
  .then(buildScoreBoard)
  .then(function(){
    canvas.addEventListener('gameOver', gameOver)
  })

function getData() {
  return fetch(gameURL)
    .then(function(response) {
      return response.json()
    })
    .catch(function(error) {
      error.message
    })
}

function buildScoreBoard(response) {
  response.sort(function (a, b) {
    return a.score - b.score
  })
  var sortedArray = response.reverse()

  scoresSection.innerHTML = ''

  for(let i=0; i<3; i++) {
    var createParagraph = document.createElement('p')
    var nameSpans = document.createElement('span')
    var scoreSpans = document.createElement('span')

    createParagraph.classList = 'score-card'
    nameSpans.classList = "player-name"
    scoreSpans.classList = "score"

    var appendedNameSpans = createParagraph.appendChild(nameSpans)
    var appendedScoreSpans = createParagraph.appendChild(scoreSpans)
    var appendedParagraphs = scoresSection.appendChild(createParagraph)

    appendedScoreSpans.innerHTML = sortedArray[i].score
    appendedNameSpans.innerHTML = sortedArray[i].player_name
  }
}

function gameOver(){
  alert("Final Score: " + score)
  return fetch(postURL, {
    method: 'POST',
    body: JSON.stringify({
     game_name: game,
     player_name: name.value,
     score: score
    }),
   headers: new Headers({
     'content-type': 'application/json'
    })
  })
    .then(function(response) {
      return response.json()
    })
    .then(getData)
    .then(buildScoreBoard)
  }
