//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById('local-total-victory-field');
const localMaximumAttemptField = document.getElementById('local-maximum-attempt-field');
const destroyDataButton = document.getElementById('destroy-data-button');
const playButton = document.getElementById('play-button');
const beforeGameDisplay = document.getElementById('before-game-display');
const duringGameDisplay = document.getElementById('during-game-display');
const afterGameDisplay = document.getElementById('after-game-display');
const sessionUserAnswerField = document.getElementById('session-user-answer-field');
const sessionUserWrongAnswerField = document.getElementById('session-user-wrong-answer-field');
const sessionTrueAnswerField = document.getElementById('session-true-answer-field');
const sessionUserAttemptsField = document.getElementById('session-user-attempts-amount-field');
const gameOverTitle = document.getElementById('game-over-title');
const resultCardContainer = document.getElementById('result-card-container');
const resultBadge = document.getElementById('result-badge');
const playAgainBtn = document.getElementById('play-again-btn');
const LEVEL_CONFIG = {
  easy: { digits: ['1', '2', '3'], time: 7 },
  medium: { digits: ['1', '2', '3', '4'], time: 10 },
  hard: { digits: ['1', '2', '3', '4', '5'], time: 15 }
};
let selectedLevel = 'easy';
const buttonsContainer = document.getElementById('buttons-container');

let timerInterval = null;
let timeLeft = 15;
const timerField = document.getElementById('timer-field');

function renderAnswerButtons() {
  buttonsContainer.innerHTML = ''; // Bersihkan tombol lama
  const currentDigits = LEVEL_CONFIG[selectedLevel].digits;

  currentDigits.forEach(digit => {
    const btn = document.createElement('button');
    btn.className = 'answer-button';
    btn.innerText = digit;

    // Event listener otomatis untuk setiap tombol yang dibuat
    btn.addEventListener('click', function () {
      playSound('click');
      sessionUserAnswerField.innerText += digit;

      // Pengecekan otomatis saat panjang tebakan sama dengan target digit level
      if (sessionUserAnswerField.innerText.length === currentDigits.length) {
        checkAnswer(sessionUserAnswerField.innerText);
      }
    });

    buttonsContainer.appendChild(btn);
  });
}

// Selector Tombol Level
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    playSound('click');
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    selectedLevel = e.target.dataset.level;
  });
});

if (playAgainBtn) {
  playAgainBtn.addEventListener('click', function () {
    playSound('click');
    document.getElementById('win-modal').classList.remove('show');
    location.reload(); // Refresh permainan
  });
}

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
  let answer = LEVEL_CONFIG[selectedLevel].digits.slice();
  for (let i = 0; i < answer.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = answer[i];
    answer[i] = answer[j];
    answer[j] = tmp;
  }
  return answer.join('');
}

//inisialiasi key untuk session storage
const sessionAnswerKey = 'SESSION_ANSWER';
const sessionUserAttemptsKey = 'SESSION_USER_ATTEMPTS';
const sessionUserIsPlayingKey = 'SESSION_USER_IS_PLAYING';

//inisialisasi key untuk local storage
const localTotalVictoryKey = 'LOCAL_TOTAL_VICTORIES_PLAYED';
const localMaximumAttemptsKey = 'LOCAL_MAXIMUM_ATTEMPTS';

window.addEventListener('load', function () {
  if (typeof (Storage) !== 'undefined') {
    // inisialisasi semua item web storage yang kita akan gunakan jika belum ada
    if (sessionStorage.getItem(sessionAnswerKey) === null) {
      sessionStorage.setItem(sessionAnswerKey, '');
    }
    if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
      sessionStorage.setItem(sessionUserAttemptsKey, 0);
    }
    if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
      sessionStorage.setItem(sessionUserIsPlayingKey, false);
    }
    if (localStorage.getItem(localTotalVictoryKey) === null) {
      localStorage.setItem(localTotalVictoryKey, 0);
    }
    if (localStorage.getItem(localMaximumAttemptsKey) === null) {
      localStorage.setItem(localMaximumAttemptsKey, 0);
    }
  } else {
    alert('Browser yang Anda gunakan tidak mendukung Web Storage');
  }

  //inisialisasi semua nilai field pada dokumen yang menggunakan nilai dari web storage
  sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
  localMaximumAttemptField.innerText = localStorage.getItem(localMaximumAttemptsKey);
});

playButton.addEventListener('click', function () {
  playSound('click');
  //getAnswer() = memiliku 2 fungsinalitas yaitu menghasilkan angka yg harus ditebak dan menyimpannya
  //fungsinalitas keduanya mengubah layout elemen "game board"
  sessionStorage.setItem(sessionAnswerKey, getAnswer());
  sessionStorage.setItem(sessionUserIsPlayingKey, true);
  //mempunya 3 layout berbeda tetapi yg ditampilkan cuman 1
  //layout disembunykan melalui atribut hidden
  renderAnswerButtons();
  beforeGameDisplay.setAttribute('hidden', true);
  //layout sebelumnya disembunykan dgn method setAttribute()
  //jika ingin dimunculkan, atribut perlu di hilangkan dgn method removeAtribute()
  duringGameDisplay.removeAttribute('hidden');
  //maka jika tombol ditekan layout elemen "game board" akan berubah
  startTimer();
});

// answerButton1.addEventListener('click', function () {
//   playSound('click');
//   sessionUserAnswerField.innerText += '1';
//   if (sessionUserAnswerField.innerText.length == 3) {
//     checkAnswer(sessionUserAnswerField.innerText);
//   }
// });

// answerButton2.addEventListener('click', function () {
//   playSound('click');
//   sessionUserAnswerField.innerText += '2';
//   if (sessionUserAnswerField.innerText.length == 3) {
//     checkAnswer(sessionUserAnswerField.innerText);
//   }
// });

// answerButton3.addEventListener('click', function () {
//   playSound('click');
//   sessionUserAnswerField.innerText += '3';
//   if (sessionUserAnswerField.innerText.length == 3) {
//     checkAnswer(sessionUserAnswerField.innerText);
//   }
// });

// //ketiga tombol tsb kurang lebih memiliki fungsinalitas yg sama
// //yaitu menambahkan angka ke dalam kombbinasi tebakan user

// Fungsi untuk menembakkan Konfeti
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Fungsi Menampilkan Modal Kemenangan
function showWinModal(trueAnswer) {
  const modal = document.getElementById('win-modal');
  const answerField = document.getElementById('modal-true-answer');

  // Masukkan jawaban ke teks <strong id="modal-true-answer">
  answerField.innerText = trueAnswer;
  // Tampilkan modal
  modal.classList.add('show');
  // Tembakkan konfeti
  triggerConfetti();
}

// jika input tebakan dari user sudah sepanjangan 3 karakter,
//sebuah fungsi yang bernama checkAnswer() akan dipanggil
function checkAnswer(userGuess) {

  const answer = sessionStorage.getItem(sessionAnswerKey);
  //checkAnswer = menjalankan kode yg beda berdasarkan kondisi user menebak angka

  if (userGuess == answer) {
    stopTimer();
    playSound('win');
    //jika benar => stats akan menghitung masukan tebakan yg salah
    //kemudian web menampilkan informasi
    duringGameDisplay.setAttribute('hidden', true);
    afterGameDisplay.removeAttribute('hidden');

    resultCardContainer.className = "result-card status-win";
    resultBadge.innerText = "VICTORY 🏆";
    gameOverTitle.innerText = "Tebakan Anda Benar!";
    gameOverTitle.style.color = "#4ade80";

    sessionTrueAnswerField.innerText = answer;
    updateScore();
    showWinModal(answer);
  } else {
    stopTimer();
    startTimer();
    playSound('wrong');

    //efek shake
    const gameboard = document.getElementById('gameboard');
    gameboard.classList.add('shake-animation');

    setTimeout(() => {
      gameboard.classList.remove('shake-animation');
    }, 400);
    //jika salah => sesuai denngan jawaban yg dihasilkan pada sistem session storage
    //tampilan "game board" akan berubah dan stats akan ikut di perbarui
    const previousAttemptAmount = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
    sessionStorage.setItem(sessionUserAttemptsKey, previousAttemptAmount + 1);
    sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
    sessionUserAnswerField.innerText = '';
    sessionUserWrongAnswerField.innerText = userGuess;
  }
}

// Event listener untuk tombol "Main Lagi" di modal
document.getElementById('play-again-btn').addEventListener('click', function () {
  playSound('click');
  document.getElementById('win-modal').classList.remove('show');
  location.reload(); // Refresh permainan
});

//fungsi updateScore() berguna untuk memperbarui stats user pada elemen Local Stats.
function updateScore() {
  //mengapa pake parseInt()? ==> karna ingin melakukan operasi matematis pada datanya
  const sessionAttemptsValue = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
  const localAttemptsValue = parseInt(localStorage.getItem(localMaximumAttemptsKey));
  if (sessionAttemptsValue > localAttemptsValue) {
    //dua stats akan diperbarui "jumlah yg berhasil ditebak" dan "jumlah tebakan yg salah sekali main"
    localStorage.setItem(localMaximumAttemptsKey, sessionAttemptsValue);
    localMaximumAttemptField.innerText = sessionAttemptsValue;
  }
  const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
  localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
}

window.addEventListener('beforeunload', function () {
  //event listener menambah event 'beforeunload' = browser akan menghapus
  //dan mengofirmasi semua nilai dari item-item sesion storage kembali kenilai awal
  //jika halaman di reload permainan yg belum selesai akan dihapus,
  //jikan ingin bermain lagi, harus menekan tombol "bermain"
  sessionUserAnswerField.innerText = '';
  sessionUserWrongAnswerField.innerText = '';
  sessionStorage.setItem(sessionUserAttemptsKey, 0);
  sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
});

//menambahkan event listener ke dalam tombol yang memiliki tulisan "Hapus semua data"
destroyDataButton.addEventListener('click', function () {
  playSound('click');
  //jika ditekan semua storege yang di local dan session storage akan terhapus
  sessionStorage.removeItem(sessionAnswerKey);
  sessionStorage.removeItem(sessionUserAttemptsKey);
  sessionStorage.removeItem(sessionUserIsPlayingKey);
  localStorage.removeItem(localTotalVictoryKey);
  localStorage.removeItem(localMaximumAttemptsKey);
  //Untuk melihat perubahannya, lakukan proses refresh/reload pada halaman web permainan tebak angka.
  alert('Mohon me-refresh halaman ini kembali');
});


// Fungsi membuat efek suara digital sederhana
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.value = 400;
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.log('Audio tidak didukung');
  }
}

// Fungsi untuk memulai countdown timer
function startTimer() {
  clearInterval(timerInterval); // Reset timer jika ada yang sedang berjalan
  timeLeft = LEVEL_CONFIG[selectedLevel].time;
  timerField.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerField.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

// Fungsi untuk menghentikan timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Fungsi ketika waktu HABIS (Game Over)
function handleTimeUp() {
  playSound('wrong');
  duringGameDisplay.setAttribute('hidden', true);
  afterGameDisplay.removeAttribute('hidden');

  resultCardContainer.className = "result-card status-lose";
  resultBadge.innerText = "GAME OVER ⏰";
  gameOverTitle.innerText = "Waktu Habis!";
  gameOverTitle.style.color = "#f43f5e";

  // Tampilkan keterangan bahwa waktu habis
  const answer = sessionStorage.getItem(sessionAnswerKey);
  sessionTrueAnswerField.innerText = answer;
  sessionUserAnswerField.innerText = '';
}

function handleDigitClick(digit) {
  playSound('click');
  sessionUserAnswerField.innerText += digit;

  const targetLength = LEVEL_CONFIG[selectedLevel].digits.length;
  if (sessionUserAnswerField.innerText.length === targetLength) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
}