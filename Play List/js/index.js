const songName = document.getElementById('song-name');
const like = document.getElementById('like');
const song = document.getElementById('audio');
const currentProgress = document.getElementById('current-progress');
const bandName = document.getElementById('song-band');
const play = document.getElementById('play');
const skip = document.getElementById('skip');
const cover = document.getElementById('cover');
const back = document.getElementById('back');
const progressContainer = document.getElementById('progress-container');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
const timeSong = document.getElementById('time-song');
const totalSong = document.getElementById('time-total');

const noWomanNoCry = {
    songName : "No Woman No Cry",
    bandName : "Bob Marley",
    img : "nowomannocry",
    licked : false,
    music : "Bob Marley - No Women No Cry"
};
const ceuAzul = {
    songName : "Ceu Azul",
    bandName : "Chorão",
    img : "ceuazul",
    licked : true,
    music : "Charlie Brown Jr - Céu Azul"
};
const tempoPerdido = {
    songName : "Tempo Perdido",
    bandName : "Legião Urbana",
    img : "tempo perdido",
    licked : false,
    music : "Tempo Perdido"
};
                                                                            
const playList = [noWomanNoCry, ceuAzul, tempoPerdido];
let index = 0;
let isPlaying = false;
let isShuffled = false;
let sortedShuffle = [...playList];
let repeating = false;
let licked = false;



function songPlay(){
    song.play();
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    isPlaying = true;
}

   function songPause(){
    song.pause();
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    isPlaying = false
    
   }

   function playPauseDecider(){
       if(isPlaying === true){
           songPause()
        }
        else{
            songPlay()
        }
    }

    
    

    function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length
        let currentIndex = size - 1;
            while(currentIndex > 0){
                let randomIndex = Math.floor(Math.random() * size);
                let aux = preShuffleArray[currentIndex];
                preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
                preShuffleArray[randomIndex] = aux;
                currentIndex -= 1;
            }
    }

    function shuffleClick(index){


       
        

        if (isShuffled === false) {
            isShuffled = true;
            shuffle.classList.add('button-active');
            shuffleArray(sortedShuffle);
        }

        else {
            isShuffled = false;
            sortedShuffle = [...playList];
            shuffle.classList.remove('button-active');
        }
 
    }
   function songSkip(){
       play.querySelector('.bi').classList.add('bi-play-circle-fill');
       play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
       index += 1;
       
       songLoad();
    } 
    function songBack(){
        play.querySelector('.bi').classList.add('bi-play-circle-fill');
        play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
        index -= 1;
        
        
        songLoad();
    }

    
    function songLoad() {
        cover.src = `./images/${sortedShuffle[index].img}.jpg`;
        song.src = `./songs/${sortedShuffle[index].music}.mp3`;
        bandName.innerText = sortedShuffle[index].bandName;
        songName.innerText = sortedShuffle[index].songName;
        likeButton();
    }
    
    function updateProgressBar(){
        let barWidth = (song.currentTime/song.duration)*100;
        currentProgress.style.setProperty('--progress', `${barWidth}%`);
        let timeSongMin = Math.floor(song.currentTime/60);
        let timeSongSeg = Math.floor(song.currentTime%60);
        let timeSongMinF = Math.floor(song.duration/60);
        let timeSongSegF = Math.floor(song.duration%60);
        
        
        if (timeSongMinF < 10) {
            timeSongMinF = `0${timeSongMinF}`
        }
        if (timeSongSegF < 10) {
            timeSongSegF = `0${timeSongSegF}`
        }
        
        let timeF = `${timeSongMinF}:${timeSongSegF}`;
        if (timeF === `${NaN}:${NaN}`) {
            totalSong.innerText = "00:00"
            
        }
        else {
            
            totalSong.innerText = timeF;
        }
        if (timeSongMin < 10) {
            timeSongMin = `0${timeSongMin}`
        }
        
        if (timeSongSeg < 10) {
            timeSongSeg = `0${timeSongSeg}`
        }
        timeSong.innerText = `${timeSongMin}:${timeSongSeg}`;
        
        if (barWidth === 100 && repeating === false) {
            songSkip();
            songPlay();
       
        }
        else if(barWidth === 100 && repeating === true){
            barWidth = 0;
            songPlay();
        
        }
    }
    
 
        
        


    function jumpTo(event) {
        const clickPosition = event.offsetX;
        const width = progressContainer.clientWidth;
        const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;  
   }

   function clickRepeat(){

    if (repeating === false) {
        repeating = true;
        repeat.classList.add('button-active');
     
        
    }

    else {
        repeating = false
        repeat.classList.remove('button-active');
   
        
    }
}

    function likeButtonClicked(){

    }

function likeButton(){
    if (playList[index].licked === true) {
        like.querySelector('.bi').classList.remove('bi-heart');
        like.querySelector('.bi').classList.add('bi-heart-fill');
        like.classList.add('button-active');
    }
    else{
        like.querySelector('.bi').classList.add('bi-heart');
        like.querySelector('.bi').classList.remove('bi-heart-fill');
        like.classList.remove('button-active');
    }
}


   songLoad();
skip.addEventListener("click", songSkip);
back.addEventListener("click", songBack);
play.addEventListener("click", playPauseDecider);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffle.addEventListener('click', shuffleClick);