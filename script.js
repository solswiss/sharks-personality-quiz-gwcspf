/*Add your JavaScript here*/
const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const q4 = document.getElementById('q4');
const choices = document.querySelectorAll('.answer-choice');
const resultTxt = document.getElementById('result');
const displayResult = document.getElementById('displayResult');
const restart = document.getElementById('restart');

// decidedly not uppercase
const tigerQualities = ["exercise", "shop", "explore", "seaside", "smart"];
const reefQualities = ["summer", "fall", "home", "shy"];
const lemonQualities = ["spring", "home", "with friends", "sweet"];
const bullQualities = ["winter", "river/lakeside", "eat", "strong-willed"];
const credAttr = "Gili Shark Conservation";
const tigerObj = {
  "color": "#fc9e62",
  "summary": "Tigers are athletic, powerful, and super smart! They're especially talented at hunting with their extra sharp serrated teeth and powerful jaws. Not only that, tiger sharks are very fashionable! Just look at their tiger-like stripes!",
  "summary_cred": credAttr,
  "img_url": "https://i0.wp.com/www.australiangeographic.com.au/wp-content/uploads/2023/07/shutterstock_2263403737-scaled.jpg?fit=1800%2C1510&ssl=1",
  "img_cred": "Australian Geographic"
};
const reefObj = {
  "color": "#f599b3",
  "summary": "Reef sharks are small, calm, and a little shyer compared to other sharks. These beautiful creatures tend to hang out around coral reefs in warm, shallow waters. These sharks are wonderfully chill and have never been associated with a shark attack.",
  "summary_cred": credAttr,
  "img_url": "https://mauioceancenter.com/wp-content/uploads/2024/04/AdobeStock_259954630-scaled.jpeg",
  "img_cred": "Maui Ocean Center"
};
const lemonObj = {
  "color": "#f5ef65",
  "summary": "Lemon sharks are named after bright yellow skin and are not at all 'sour' by nature! They’re super sweet and usually hang out with as many as 50 of their buds! Lemon sharks are also homebodies as studies have shown they return to their birthplace to give birth!",
  "summary_cred": credAttr,
  "img_url": "https://www.oceanactionhub.org/storage/2023/09/Are-Lemon-Sharks-Dangerous.jpg",
  "img_cred": "Ocean Action Hub"
};
const bullObj = {
  "color": "#b28af1",
  "summary": "Bulls are adaptable and have a voracious appetite, known for being aggressive (hangry!) when it comes to food. They can live in both freshwater and saltwater, unlike most other species; sometimes they even leap up river rapids like salmons to reach inland lakes!",
  "summary_cred": credAttr,
  "img_url": "https://www.freep.com/gcdn/authoring/authoring-images/2024/07/12/PDTF/74387872007-1238426453.jpg?width=1733&height=1042&fit=crop&format=pjpg&auto=webp",
  "img_cred": "Detroit Free Press"
};

const objArr = [tigerObj, reefObj, lemonObj, bullObj];

let answerData = new Map();
let totalQuestions = document.querySelectorAll('.question').length;
let quizComplete = false;

for (const choice of choices) {
  choice.addEventListener('click', () => {
    toggleSelect(choice);
  })
}

function toggleSelect(element) {
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    answerData.delete(element.parentElement.id);
    console.log(`deselected ${element.children[1].value} for ${element.parentElement.id}`);
  } else {
    for (const choice of element.parentElement.children) {
      choice.classList.remove("selected");
    }
    element.classList.add("selected");
    answerData.set(element.parentElement.id, element.children[1].value);
    console.log(`selected ${element.children[1].value} for ${element.parentElement.id}`);

    if (answerData.size == totalQuestions)
      tabulateResults();
  }
}

displayResult.addEventListener('click', toggleResult);

restart.addEventListener('click', () => {
  console.log('quiz restarted');
  for (const choice of choices) {
    choice.classList.remove("selected");
  }
  toggleResult();
  resultTxt.innerHTML = "";
  displayResult.innerText = "Compiling result...";
  displayResult.setAttribute('id', '');
  score = 0;
  questionCount = 0;
  quizComplete = false;
})

function tabulateResults() {
  let [i, result] = calculateResults();
  console.log('quiz completed');
  quizComplete = true;

  let obj = objArr[i-1];
  //console.log(i);
  //console.log(obj);
  resultTxt.innerHTML = `<h2><i class="left fa-solid fa-certificate"></i>You are a <span style="color:${obj.color}">${result}</span>!<i class="right fa-solid fa-certificate"></i></h2>
  <p class="shark-summary">${obj.summary}</p><p class="attribution">Above is lightly paraphrased information from the ${obj.summary_cred}</p>
  <img class="result__img" src="${obj.img_url}" alt="no alt yet, sorry! Image attribution goes to the ${obj.img_cred}">`;
  displayResult.innerHTML = 'See result!';
  displayResult.setAttribute('id', 'displayResult__ready');
}

function calculateResults() {
  const valuesArr = [...answerData.values()];
  //console.log(valuesArr);
  const modArr = [];
  valuesArr.forEach(val => {
    //console.log(val);
    if (tigerQualities.includes(val))
      modArr.push(1);
    if (reefQualities.includes(val))
      modArr.push(2);
    if (lemonQualities.includes(val))
      modArr.push(3);
    if (bullQualities.includes(val))
      modArr.push(4);
  });

  let result = mostFrequentUsingReduce(modArr);
  //console.log(modArr);
  //console.log(result);
  
  if (result == 1) return [1, "tiger shark"];
  else if (result == 2) return [2, "reef shark"];
  else if (result == 3) return [3, "lemon shark"];
  else return [4, "bull shark"];
}

function toggleResult() {
  if (quizComplete && resultTxt.style.display == "none") resultTxt.style.display = "block";
  else resultTxt.style.display = "none";
}

// from gfg
function mostFrequentUsingReduce(arr) {
  const counts = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).reduce((a, b) => 
      (counts[a] > counts[b] ? a : b));
}
