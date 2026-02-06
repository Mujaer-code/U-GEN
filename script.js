const startBtn = document.querySelector('.start-btn');
const main = document.querySelector('.main');
const home = document.querySelector('.home');
const quizSection = document.querySelector('.question-box');
const optionList = document.querySelector('.option-list');
const nextBtn = document.querySelector('.next');
const saveBtn = document.querySelector('.save-btn');
const prevBtn = document.querySelector('.prev');

let timerInterval;
let questionCount = 0;
let questionOrder = [];
let userAnswers = [];


function resetProgress() {
    // 1. Hapus data dari memori browser
    localStorage.removeItem("quizProgress");

    // 2. Kembalikan variabel ke nilai awal
    questionCount = 0;
    questionOrder = [];
    userAnswers = [];
    
    alert("Progress telah dihapus. Soal akan diacak dan silahkan belajar lagi");
}


// 3. Fungsi untuk update tampilan di HTML
function updateProgress() {
   // Supaya mulai dari 1, bukan 0
   const nomorAktif = questionCount + 1;
   const totalSoal = questions.length;

  document.getElementById('display-nomor').innerText = `${nomorAktif} / ${totalSoal}`;
}


// Panggil fungsi ini setiap kali tombol "Next" diklik



// Load progress jika ada
let savedData = JSON.parse(localStorage.getItem("quizProgress"));
if(savedData) {
  questionOrder = savedData.questionOrder;
  questionCount = savedData.currentQuestionIndex;
  userAnswers = savedData.userAnswers;
}

// Fungsi acak array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start Button
startBtn.onclick = () => {
  main.classList.add('active');
  home.classList.add('deactive');

  // Kalau belum ada progress, acak soal
  if(questionOrder.length === 0) {
    questionOrder = questions.map((_, i) => i);
    shuffleArray(questionOrder);
  }

  showQuestions(questionCount);
  updateProgress();
  oneMinute();

}

const refresh = document.querySelector('.refresh')

refresh.onclick =() => {
  resetProgress();
}

function showQuestions(index) {
  const qIndex = questionOrder[index];
  const questionText = document.querySelector('.question-text');
  const currentQuestion = questions[qIndex];

  let displayContent = `<p>${currentQuestion.question}</p>`;
  
  if (currentQuestion.img) {
    displayContent += `
      <div class="question-image-container" style="text-align: center; margin: 15px 0;">
        <img src="assets/${currentQuestion.img}" alt="Ilustrasi" style="max-width: 100%; border-radius: 8px;">
      </div>`;
  }
  
  questionText.innerHTML = displayContent;

  let optionTag = '';
  currentQuestion.options.forEach(opt => {
    optionTag += `<div class="option"><span class="circle"></span><span>${opt}</span></div>`;
  });
  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  option.forEach((el) => {
    el.setAttribute('onclick', 'optionSelected(this)');

    const jawabanDulu = userAnswers[index];
    const teksOpsi = el.innerText.trim();

    // LOGIKA PINTAR: Cek apakah answer itu angka atau teks
    let teksJawabanBenar;
    if (typeof currentQuestion.answer === 'number') {
      teksJawabanBenar = currentQuestion.options[currentQuestion.answer];
    } else {
      teksJawabanBenar = currentQuestion.answer;
    }

    if(jawabanDulu === teksOpsi) {
      if(teksOpsi === teksJawabanBenar.trim()) {
        el.classList.add('correct'); 
      } else {
        el.classList.add('incorrect');
      }
    }
  });
}

// Pilih jawaban
function optionSelected(answer) {
  const qIndex = questionOrder[questionCount];
  const currentQuestion = questions[qIndex];
  const userAnswer = answer.textContent.trim();

  // LOGIKA PINTAR: Deteksi format answer (String vs Number)
  let correctAnswerText;
  if (typeof currentQuestion.answer === 'number') {
    // Jika formatnya angka (0, 1, 2...), ambil teks dari array options
    correctAnswerText = currentQuestion.options[currentQuestion.answer].trim();
  } else {
    // Jika formatnya sudah teks ("Adefovir"), langsung gunakan
    correctAnswerText = currentQuestion.answer.trim();
  }

  userAnswers[questionCount] = userAnswer;

  if (userAnswer === correctAnswerText) {
    answer.classList.add('correct');
    if(typeof correctSound !== 'undefined') correctSound.play();

    setTimeout(() => {
      if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        if(typeof updateProgress === 'function') updateProgress();
        if(typeof oneMinute === 'function') oneMinute();
      } else {
        if(typeof showResultBox === 'function') showResultBox();
      }
    });

  } else {
    answer.classList.add('incorrect');
    if(typeof wrongSound !== 'undefined') wrongSound.play();
  }
}


// Next Button
nextBtn.onclick = () => {
  console.log("Klik terdeteksi! Nilai sebelum ditampung:", questionCount);

  if(questionCount < questions.length - 1) {
    questionCount++;
    console.log("Nilai setelah ditambah:", questionCount); // Cek apakah naiknya satu-satu?
    showQuestions(questionCount);
    updateProgress();
    oneMinute();
  }
}

prevBtn.onclick = () => {
  if (questionCount > 0) {
    questionCount--;
    showQuestions(questionCount);
    updateProgress();
  }
};


// Save Progress Button
saveBtn.onclick = () => {
  const progress = {
    questionOrder,
    currentQuestionIndex: questionCount,
    userAnswers
  };
  localStorage.setItem("quizProgress", JSON.stringify(progress));
  alert("Progress berhasil disimpan! Nanti kalo mau lanjut, tekan Start! ya, jangan refresh");
}

// Tampilkan Result Box
function showResultBox(){
  main.classList.remove('active');
  home.classList.remove('deactive');
}



const muteX = document.querySelector('.mute-x');

// Mute
muteX.onclick = () => {
  muteAudio();
}


const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/incorrect.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";



function startTimer(duration, display) {
    clearInterval(timerInterval);
    var timer = duration, minutes, seconds;

    function updateDisplay () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

    }

    updateDisplay ();

    timerInterval = setInterval(function() {
    timer--;
        updateDisplay();
    }, 1000);
}

function oneMinute (){
  var oneMinutes = 60 * 1,
  display = document.querySelector('.timer');
  startTimer (oneMinutes, display);

}



