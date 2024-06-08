window.onload = function () {
   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];

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
      letters = document.createElement('ul');
      game.appendChild(keyboard);
      keyboard.appendChild(letters);

      for (let i = 0; i < alphabet.length; i++) {
         letters.className = 'keyboard__list';
         list = document.createElement('li');
         list.className = 'keyboard__letter';
         list.innerHTML = alphabet[i];
         keyboard.appendChild(letters);
         letters.appendChild(list);
      }
   }

   function startGame() {
      addHeader();
      addMain();
      addGame();
      addLetters();
   }
   startGame();
}