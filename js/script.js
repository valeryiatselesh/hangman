window.onload = function () {
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
   function createModal() {
      modal = document.createElement('div');
      modal.className = 'modal';
      main.after(modal);
      modalDialog = document.createElement('div');
      modalDialog.className = 'modal__dialog';
      modal.appendChild(modalDialog);
      modalContent = document.createElement('div');
      modalContent.className = 'modal__content';
      modalDialog.appendChild(modalContent);
      modalTitle = document.createElement('h3');
      modalTitle.className = 'modal__title';
      modalContent.appendChild(modalTitle);
      modalWord = document.createElement('p');
      modalWord.className = 'modal__word';
      modalContent.appendChild(modalWord);
      modalBtn = document.createElement('button');
      modalBtn.className = 'modal__btn';
      modalBtn.innerText = 'Play again'
      modalContent.appendChild(modalBtn);
   }
   addHeader();
   addMain();
   addGame();
   addLetters();
   createModal();
   let currentWord,
       currentScore = 0;
   const maxScore = 6;
   function firstIndex(previousIndex) {
      let nextIndex = previousIndex;
      while(nextIndex === previousIndex) {
         nextIndex = wordsList[Math.floor(Math.random() * wordsList.length)];
      }
      return nextIndex;
   };
   let currentIndex = firstIndex(-1);
   function getRandomWord() {
      const { hint, word } = currentIndex;
      document.querySelector(".hint").innerText = hint;
      currentWord = word;
      currentWord = currentWord.toUpperCase();
      document.body.style.overflow = 'visible';
      startGameSettings();
   }
   function startGameSettings() {
      currentScore = 0;
      correctLetters = 0;
      hangmanImg.src = 'img/hangman-start.svg';
      guessWord.innerHTML = currentWord;
      score.innerHTML = `${currentScore} / ${maxScore}`;
      let displayWord = currentWord.replace(/./g, '<li class="word__letter">_</li>');
      guessWord.innerHTML = displayWord;
      console.log(currentWord);
      let pressButtons = document.querySelectorAll(".keyboard__letter");
      pressButtons.forEach((button) => {
         button.disabled = false;
      });
      modal.className = 'modal';
   }
   function disableLetters() {
      let pressButtons = document.querySelectorAll(".keyboard__letter");
      pressButtons.forEach((button) => {
         button.disabled = true;
      });
   }
   function initGame(btn, initBtn) {
      let letterArray = currentWord.split('');
      let dashes = document.getElementsByClassName('word__letter');
      if (letterArray.includes(initBtn)) {
         letterArray.forEach((letter, index) => {
            if (letter === initBtn) {
               dashes[index].innerText = letter;
               correctLetters++;
            }
         });
      } else {
         currentScore++;
         hangmanImg.src = `img/hangman-${currentScore}.svg`;
      }
      score.innerHTML = `${currentScore} / ${maxScore}`;
      if (currentScore == 6) {
         disableLetters();
         setTimeout(() => {
            modal.className = 'modal modal_show';
            modalTitle.innerText = 'You loose!';
            modalWord.innerText = `The mystery word was: ${currentWord}`;
            document.body.style.overflow = 'hidden';
         }, 500);
      }
      if (correctLetters == currentWord.length) {
         disableLetters();
         setTimeout(() => {
            modal.className = 'modal modal_show';
            modalTitle.innerText = 'You win!';
            modalWord.innerText = `The mystery word was: ${currentWord}`;
            document.body.style.overflow = 'hidden';
         }, 500);
      }
      btn.disabled = true;
   }
   for (let i = 65; i < 91; i++) {
      letterBtn = document.createElement('button');
      letterBtn.className = 'keyboard__letter';
      letterBtn.innerText = String.fromCharCode(i);
      lettersList.appendChild(letterBtn);
      letterBtn.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)))
   }
   document.addEventListener('keydown', (e) => {
      const pressedKey = e.key.toUpperCase();
      const btnVirtualKeyboard = document.querySelectorAll('.keyboard__letter');
      btnVirtualKeyboard.forEach(button => {
         if (button.innerText == pressedKey && !button.disabled) {
            initGame(button, pressedKey)
         }
      })
   })
   getRandomWord();
   const playAgainBtn = document.querySelector('.modal__btn');
   playAgainBtn.addEventListener('click', () => {
      currentIndex = firstIndex(currentIndex);
      getRandomWord();
   });
}