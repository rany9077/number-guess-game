// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 3. 만약에 유저가 랜덤번호를 맞추면 => 맞췄습니다
// 랜덤번호 < 유저번호 => Down
// 랜덤번호 > 유저번호 => Up
// 4. Reset 버튼을 누르면 게임이 리셋된다
// 5. 5번의 기회를 다쓰면 게임이 끝남 (버튼 disable)
// 6. 유저가 1~100 범위 밖에 숫자 입력하면 알려줌 (기회는 차감 안됨)
// 7. 유저가 이미 입력한 숫자를 또 입력하면 알려줌 (기회는 차감 안됨)

let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history=[]

playButton.addEventListener('click',play)
resetButton.addEventListener('click',reset)
userInput.addEventListener('focus',function(){userInput.value=''})

function pickRandomNum(){
    // 1. 랜덤번호 지정
    computerNum = Math.floor(Math.random()*100) + 1;
    console.log('정답', computerNum)
}

function play(){
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1~100 사이 숫자를 입력해주세요"
        return;
    }
    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 값을 입력해주세요"
        return;
    }

    chances --;
    chanceArea.textContent=`남은 기회 : ${chances}번`

    // 2. 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
    // 3. 만약에 유저가 랜덤번호를 맞추면 => 맞췄습니다
    // 랜덤번호 < 유저번호 => Down
    // 랜덤번호 > 유저번호 => Up
    if (userValue < computerNum) {
        resultArea.textContent = "Up"
    } else if (userValue > computerNum)  {
        resultArea.textContent = "Down"
    } else {
        resultArea.textContent = "Same"
        gameOver=true
    }

    history.push(userValue)

    // 5. 5번의 기회를 다쓰면 게임이 끝남 (버튼 disable)
    if(chances < 1) {
        gameOver=true
    }
    if(gameOver == true) {
        playButton.disabled = true
    }


}

function reset(){
    // 4. Reset 버튼을 누르면 게임이 리셋된다

    // user input 깨끗하게 정리되고
    userInput.value=""
    // 새로운 번호가 생성되고
    pickRandomNum()
}

pickRandomNum()