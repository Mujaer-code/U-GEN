const startBtn = document.querySelector ('.start-btn');
const main = document.querySelector ('.main');
const home = document.querySelector ('.home');
const quizSection = document.querySelector ('.question-box');
const option = document.querySelector ('.option');

startBtn.onclick = () => {
	main.classList.add('active');
	home.classList.add('deactive');
	shuffleArray(questions);
	showQuestions(0);

}

let questionCount = 0;

const optionList = document.querySelector('.option-list');

// Fungsi untuk menampilkan soal baru
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].question}`;

  let optionTag = `<div class="option"><span class="circle"></span><span>${questions[index].options[0]}</span></div>
  <div class="option"><span class="circle"></span><span>${questions[index].options[1]}</span></div>
  <div class="option"><span class="circle"></span><span>${questions[index].options[2]}</span></div>
  <div class="option"><span class="circle"></span><span>${questions[index].options[3]}</span></div>
  <div class="option"><span class="circle"></span><span>${questions[index].options[4]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }}

  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


  function optionSelected(answer) {
  console.log("Jawaban yang diklik:", answer.textContent);

  let userAnswer = answer.textContent.trim();
  let correctAnswer = questions[questionCount].answer.trim();

  console.log("User Answer:", userAnswer);
  console.log("Correct Answer:", correctAnswer);

  if (userAnswer === correctAnswer) {
    console.log("Jawaban benar!");

    answer.classList.add('correct');
    
    correctSound.play();

    setTimeout(() => {
      quizSection.classList.remove('correct');
    }, 1000);

     // **✅ Cek jika sudah soal terakhir**
    if (questionCount < questions.length - 1) {
      questionCount++; // Pindah ke soal berikutnya
      showQuestions(questionCount);
    } else {
      showResultBox(); // **Tampilkan hasil jika semua soal terjawab**
    }

  

  } else {
    console.log("Jawaban salah!");
    answer.classList.add('incorrect');
    wrongSound.play();
  }
}

const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/incorrect.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";


// // Mencegah akses DevTools (Inspect Element)
// document.addEventListener('keydown', function (e) {
//   // Cegah F12 (DevTools)
//   if (e.key === 'F12') {
//     e.preventDefault();
//   }
//   // Cegah Ctrl+Shift+I (Inspect Element)
//   if (e.ctrlKey && e.shiftKey && e.key === 'I') {
//     e.preventDefault();
//   }
//   // Cegah Ctrl+U (View Source)
//   if (e.ctrlKey && e.key === 'U') {
//     e.preventDefault();
//   }
// });

// // Mencegah klik kanan
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

// // Mencegah copy paste
// document.addEventListener('copy', function(e) {
//   e.preventDefault();
// });
