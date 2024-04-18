let flags = []
let current = 0;
let score = 0;
let orig_total = 0;
const flag_cntner = document.getElementById('img_flag');
const targetDiv = document.getElementById("myDiv");
const audioTag = document.getElementById("sfx");
const imgTag = document.getElementById("logo");
const h3Tag = document.getElementById("result");
const nextBtn = document.getElementById("next");
const resultDiv = document.getElementById("res");
const btnCheck = document.getElementById("check");
const scoreTag = document.getElementById("score");
const answer = document.getElementById("answer");

document.addEventListener("DOMContentLoaded", function() {
    fetchData();
  });
async function fetchData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        flags = data.map(country => {
            return {
                name: country.name.common,
                image: country.flags.png,
            };
        });
        orig_total = flags.length;
        shuffleArray(flags);
        console.log("fetching data");
        pickFlag();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
let flag = [];
btnCheck.addEventListener("click", function(){
    var user_ans = answer.value.trim().toLowerCase();
    if(user_ans == flag.name.toLowerCase()){
        pickResult(true, flag.name);
        score++;
    }
    else {
        pickResult(false, flag.name); 
    } 
});
async function pickFlag() {
    resultDiv.style.display = "none";
    nextBtn.style.display = "none";
    flag = flags[current];
    current++;
    flag_cntner.src = flag.image;
}
function pickResult(res, ans){
    btnCheck.disabled = false;
    let fileName = ["1.png", "2.png", "3.png", "4.png","5.png"];
    shuffleArray(fileName)
    if(res){
        var dirr = "icons8/correct/" + fileName[0];
        var audiodir = "audio/success-1-6297.mp3";
        var message = "Correct! Good job!";
    }
    else {
        var dirr = "icons8/wrong/" + fileName[4];
        var audiodir = "audio/violin-lose-1-175615.mp3";
        var message = "Wrong answer! The correct answer is "+ ans +". Try again.";
    }

   imgTag.src = dirr;
   audioTag.src = audiodir;
   h3Tag.textContent = message;
   resultDiv.style.display = "flex";
   nextBtn.style.display = "inline-block";
   answer.value = ""
}
nextBtn.addEventListener("click", function(){
    scoreTag.textContent = score + "/" + current;
    if(current != (flags.length-1)){
        pickFlag();
    }
    else {
        resultDiv.style.display = "none";
        nextBtn.style.display = "none";
        alert("You have finished the quiz!");
    }
});
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}