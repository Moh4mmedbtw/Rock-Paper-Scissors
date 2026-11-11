 let score =  JSON.parse(localStorage.getItem('score')) || { 
        wins:0,
        loses:0,
        draws:0
      };

    update()

    


   /* if (!score){
      score = {
        wins:0,
        loses:0,
        draws:0
      }
    }*/



    function pickMove() {
      let computerMove='';
      const randomNumber = Math.random();
      if( randomNumber < 1/3 )
        computerMove = 'Rock';
      else if ( randomNumber > 2/3)
        computerMove = 'Paper';
      else
        computerMove = 'Scissors';

      return computerMove;
    }

    let isAutoPlay = false;
    let id;

    // const autoPlay = () => {};
    function autoPlay(){
      if(!isAutoPlay){
        isAutoPlay = true;
        id = setInterval(() => {
        result(pickMove());
        }, 1000);
    }
      else {
      clearInterval(id);
      isAutoPlay = false;
    }
    }

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r')
        result('Rock');
      else if (event.key === 'p')
        result('Paper');
      else if (event.key === 's')  
        result('Scissors');

    })

    document.querySelector('.js-rock-button').addEventListener('click', () =>{result('Rock')})

    document.querySelector('.js-paper-button').addEventListener('click', () =>{result('Paper')})

    document.querySelector('.js-scissors-button').addEventListener('click', () =>{result('Scissors')})



    function result(pick){
      let result ='';
      const computerMove = pickMove();; 

      if(pick === computerMove){
        result = 'Draw!'
        score.draws+=1;
      }
      else if ( (pick === 'Paper' && computerMove === 'Rock') || (pick === 'Rock' && computerMove === 'Scissors') || (pick === 'Scissors' && computerMove === 'Paper')){
        result = 'You Win!'
          score.wins+=1;
      }
      else{
          result = 'You lose!' 
          score.loses+=1;
      }

      localStorage.setItem('score',JSON.stringify(score));


      document.querySelector('.js-result').innerHTML= 
        result;
    
      document.querySelector('.js-moves').innerHTML= 'You <img src="images/'+pick+'-emoji.png" class="move-icon"> <img src="images/'+computerMove+'-emoji.png" class="move-icon"> Computer' ;
      update()

      return result;   
    }
   
  function update(){
     document.querySelector('.js-score').innerHTML= 
      'Wins: '+score.wins+' Losses: '+score.loses+' Draws: '+score.draws;
  }
