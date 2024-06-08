window.onload = function () {
   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

   const wordsList = [
      {
         hint: 'The Great Wall is located in this country.',
         word: 'china'
      },
      {
         hint: 'This sea creature has three hearts.',
         word: 'octopus'
      },
      {
         hint: 'It is the national animal of India',
         word: 'tiger'
      },
      {
         hint: 'Sun rises in the ...',
         word: 'east'
      },
      {
         hint: 'The first Olympic Games were held in this country',
         word: 'Greece'
      },
      {
         hint: 'Mammal known for the most powerful bite in the world',
         word: 'hippopotamus'
      },
      {
         hint: 'It is the hardest substance on Earth',
         word: 'diamond'
      },
      {
         hint: 'Christopher Columbus was born in this country',
         word: 'Italy'
      },
      {
         hint: 'We wear it on our hands to see the time',
         word: 'wristwatch'
      },
      {
         hint: 'It is the definition of a person who is obsessed with work',
         word: 'workaholic' 
      },
      {
         hint: 'The fastest mammal in the world',
         word: 'hippard'
      },
      {
         hint: 'The planet is known as the Red Planet',
         word: 'Mars' 
      },
      {
         hint: 'The element is known as the building block of life',
         word: 'Carbon' 
      },
      {
         hint: 'The capital city of Canada',
         word: 'Ottawa' 
      },
      {
         hint: 'The longest river in the world',
         word: 'Nile' 
      }
   ]

   function addHeader() {
      header = document.createElement('header');
      title = document.createElement('h1');
      title.className = 'title';
      title.innerText = 'Hangman Game';

      document.body.prepend(header);
      header.appendChild(title);
   }

   function addMain() {
      main = document.createElement('main');
      main.className = 'main';
      header.after(main);
      hangman = document.createElement('div');
      hangman.className = 'hangman';
      main.appendChild(hangman);
      hangmanImg = document.createElement('img');
      hangmanImg.className = 'hangman__img';
      hangman.appendChild(hangmanImg);
      game = document.createElement('div');
      game.className = 'game';
      main.appendChild(game);
   }

   function addGame() {
      guessWord = document.createElement('ul');
      guessWord.className = 'word';
      game.appendChild(guessWord);
      hint = document.createElement('h2');
      hint.className = 'hint';
      game.appendChild(hint);
      score = document.createElement('h2');
      score.className = 'score';
      game.appendChild(score);
   }

   function addLetters() {
      keyboard = document.createElement('div');
      keyboard.className = 'keyboard';
      lettersList = document.createElement('ul');
      lettersList.className = 'keyboard__list';
      game.appendChild(keyboard);

      keyboard.appendChild(lettersList);
   }

   addHeader();
   addMain();
   addGame();
   addLetters();

   let currentWord,
       currentScore = 0;
   const maxScore = 6;

   function getRandomWord() {
      const { hint, word } = wordsList[Math.floor(Math.random() * wordsList.length)];
      document.querySelector(".hint").innerText = hint;
      currentWord = word;
      currentWord = currentWord.toUpperCase();
   }

   function startGameSettings() {
      hangmanImg.src = 'img/hangman-start.svg';
      guessWord.innerHTML = currentWord;
      score.innerHTML = `${currentScore} / ${maxScore}`;

      let displayWord = currentWord.replace(/./g, '<span class="word__letter">_</span>');
      guessWord.innerHTML = displayWord;
      console.log(currentWord);
   }

   function initGame() {
      for (let i = 65; i < 91; i++) {
         letterBtn = document.createElement('li');
         letterBtn.className = 'keyboard__letter';

         letterBtn.innerText = String.fromCharCode(i);

         letterBtn.addEventListener('click', (e) => {
            let letterArray = currentWord.split('');
            let dashes = document.getElementsByClassName('word__letter');
            console.log(letterArray);
            if (letterArray.includes(e.target.innerText)) {
               letterArray.forEach((letter, index) => {
                  if (letter === e.target.innerText) {
                     dashes[index].innerText = letter;
                  }
               });
            }
            console.log(e.target.innerText)
         })
         lettersList.appendChild(letterBtn);
      }
   }
   
   initGame();
   getRandomWord();
   startGameSettings();
}