document.addEventListener('DOMContentLoaded', () => {
  const chambers = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]; // 12 positions for a full circle
  let currentChamber = 0;
  let spinning = false;
  let spinInterval;
  let lives = 0;

  const symbols = document.querySelectorAll('.symbol');
  const resultDiv = document.getElementById('result');
  const spinButton = document.getElementById('spinButton');
  const hiddenEmoji = document.getElementById('hiddenEmoji');
  const paypalButtonContainer = document.getElementById('paypalButtonContainer');
  const livesContainer = document.createElement('div');
  livesContainer.style.position = 'fixed';
  livesContainer.style.bottom = '10px';
  livesContainer.style.left = '10px';
  document.body.appendChild(livesContainer);

  const messages = [
      "The Frequency Golems allow atoms to form molecular bonds out of pity.",
      "The Frequency Golems invented causality by causing all phenomena in this universe and a few others.",
      "The Frequency Golems take 80% of the extra fees from all Ticketmaster purchases.",
      "I'm here to chew bubblegum and kick ass... and I'm all out of bubblegum.",
      "The Frequency Golems once created a black hole just to see what would happen.",
      "The Frequency Golems can divide by zero.",
      "The Frequency Golems have a secret recipe for immortality, but they just won't share.",
      "The Frequency Golems have been playing chess with the universe since the beginning of time.",
      "The Frequency Golems once told Schrödinger that his cat is fine."
  ];

  const stopSpinning = () => {
      clearInterval(spinInterval);
      spinning = false;
      spinButton.textContent = 'Spin';
      spinButton.style.backgroundColor = 'blue';
      spinButton.classList.remove('trigger');
      spinButton.classList.add('spin');
      deactivateGlasses();
  };

  const spin = () => {
      if (spinning) return; // Prevent multiple spins at the same time
      spinning = true;
      spinButton.disabled = true;
      spinButton.textContent = 'Trigger';
      spinButton.classList.remove('spin');
      spinButton.classList.add('trigger');
      spinButton.disabled = false;

      spinInterval = setInterval(() => {
          currentChamber = (currentChamber + 1) % 12;
          symbols.forEach((symbol, index) => {
              symbol.style.transform = `rotate(${chambers[(index + currentChamber) % 12]}deg) translate(70px) rotate(-${chambers[(index + currentChamber) % 12]}deg)`;
          });
          new Audio('click.mp3').play(); // Add a click sound effect here
      }, 100);
  };

  const resetGame = () => {
      clearInterval(spinInterval);
      spinning = false;
      currentChamber = 0;
      lives = 0;
      livesContainer.innerHTML = '';
      resultDiv.textContent = '';
      spinButton.textContent = 'Spin';
      spinButton.style.backgroundColor = 'blue';
      spinButton.disabled = false;
      spinButton.classList.remove('trigger');
      spinButton.classList.add('spin');
      symbols.forEach((symbol, index) => {
          symbol.style.transform = `rotate(${chambers[index]}deg) translate(70px) rotate(-${chambers[index]}deg)`;
      });
      deactivateGlasses();
  };

  const deactivateGlasses = () => {
      symbols.forEach(symbol => {
          symbol.textContent = '🪬';
      });
      document.getElementById('center').textContent = '🧿';
      document.querySelector('h1').textContent = 'Roulette Game';
      document.querySelectorAll('.verticalText').forEach(el => el.remove());
      paypalButtonContainer.classList.add('hidden');
  };

  spinButton.addEventListener('click', () => {
      if (spinning) {
          stopSpinning();
          document.body.style.backgroundColor = 'turquoise';
          setTimeout(() => {
              document.body.style.backgroundColor = '';
          }, 2000);
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          resultDiv.textContent = randomMessage;
          resultDiv.style.fontWeight = 'bold';
          resultDiv.style.color = 'neon pink';

          const bangChance = Math.floor(Math.random() * 6);
          if (bangChance === 0) { // 1/6 chance to lose
              setTimeout(() => {
                  alert("✨💥BANG!💥✨");
                  window.location.href = 'youLose.html';
              }, 1000); // Delay for effect
          } else {
              const eyeIcon = document.createElement('span');
              eyeIcon.textContent = '🧿';
              eyeIcon.style.fontSize = '30px';
              eyeIcon.style.marginRight = '5px';
              livesContainer.appendChild(eyeIcon);
              lives += 1;

              if (lives >= 7) {
                  window.location.href = 'winner.html';
              } else {
                  spinButton.textContent = 'Spin';
                  spinButton.classList.remove('trigger');
                  spinButton.classList.add('spin');
                  spinButton.style.backgroundColor = 'blue';
              }
          }
      } else {
          spin();
      }
  });

  hiddenEmoji.addEventListener('click', () => {
      symbols.forEach(symbol => {
          symbol.textContent = '😜';
      });
      document.getElementById('center').textContent = '🤑';

      const eyes = ['👁️', '👀', '👁️👀', '👁️👀👁️'];
      const container = document.createElement('div');
      container.classList.add('eyesContainer');

      eyes.forEach(eye => {
          const eyeSpan = document.createElement('span');
          eyeSpan.textContent = eye;
          eyeSpan.style.position = 'absolute';
          eyeSpan.style.fontSize = `${Math.random() * 50 + 20}px`;
          eyeSpan.style.transform = `rotate(${Math.random() * 360}deg)`;
          eyeSpan.style.top = `${Math.random() * window.innerHeight}px`;
          eyeSpan.style.left = `${Math.random() * window.innerWidth}px`;
          container.appendChild(eyeSpan);
      });

      document.body.appendChild(container);

      const header = document.querySelector('h1');
      header.textContent = 'CONSUME';
      header.classList.add('flashing-orange-blue');

      ['left', 'right'].forEach(side => {
          const obeyText = document.createElement('div');
          obeyText.classList.add('verticalText');
          obeyText.style.position = 'fixed';
          obeyText.style[side] = '0';
          obeyText.style.top = '50%';
          obeyText.style.transform = 'translateY(-50%) rotate(-90deg)';
          obeyText.style.color = 'yellow';
          obeyText.style.fontSize = '2em';
          obeyText.style.animation = 'flash-red-yellow 1s infinite';
          obeyText.textContent = 'OBEY';
          document.body.appendChild(obeyText);
      });

      // Show PayPal button
      paypalButtonContainer.classList.remove('hidden');
      paypal.Buttons({
          createOrder: function (data, actions) {
              return actions.order.create({
                  purchase_units: [{
                      amount: {
                          value: '5.00'
                      }
                  }]
              });
          },
          onApprove: function (data, actions) {
              return actions.order.capture().then(function (details) {
                  alert('Transaction completed by ' + details.payer.name.given_name);
                  window.location.href = 'winner.html';
              });
          }
      }).render('#paypalButton');
  });

  document.getElementById('resetButton')?.addEventListener('click', () => {
      resetGame();
      window.location.href = 'index.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.wiggle')) {
      const largeGlasses = document.createElement('div');
      largeGlasses.textContent = '🕶️';
      largeGlasses.style.fontSize = '100px';
      largeGlasses.style.cursor = 'pointer';
      largeGlasses.style.marginTop = '20px';
      document.body.appendChild(largeGlasses);

      largeGlasses.addEventListener('click', () => {
          document.getElementById('secretPasswordContainer').classList.remove('hidden');
          largeGlasses.textContent = 'Enter';
          largeGlasses.addEventListener('click', () => {
              const password = document.getElementById('secretPassword').value;
              if (password === 'theylive') {
                  window.location.href = 'secret.html';
              } else {
                  alert('Incorrect Password');
              }
          });
      });
  }
});