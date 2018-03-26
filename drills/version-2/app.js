const url = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board'

const game = "GBP"
var name
var score

var data = {
  data: {
    game_name: game,
    player_name: name,
    score: score
  }
}

var object = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: ({
          'content-type': 'application/json'
        })
      }

fetch(url)
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    // console.log(response)
    // console.log(data.data)

    var scoreArray = []

    for(let i=0; i<response.length; i++) {
      var allScores = response[i].score
      var scoresSection = document.querySelector('.scores')
      var strings = JSON.stringify(allScores)
      scoreArray.push(strings)
    }
    
    var sortedArray = scoreArray.sort(function(a, b) {
      return a-b
    })
    var reversedArray = sortedArray.reverse()

    console.log(reversedArray)

    for(let i=0; i<3; i++) {
      var createParagraph = document.createElement('p')
      createParagraph.classList = 'score-card'

      var nameSpans = document.createElement('span')
      nameSpans.classList = "player-name"

      var scoreSpans = document.createElement('span')
      scoreSpans.classList = "score"

      var appendedNameSpans = createParagraph.appendChild(nameSpans)
      var appendedScoreSpans = createParagraph.appendChild(scoreSpans)

      var appendedParagraphs = scoresSection.appendChild(createParagraph)


      appendedScoreSpans.innerHTML = reversedArray[i]


    }


    // var slicedArray = reversedArray.slice(0, 3)

    // console.log(slicedArray)

    // scoresSection.innerHTML = slicedArray

  })
