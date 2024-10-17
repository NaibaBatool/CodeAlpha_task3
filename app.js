
const container = document.querySelector(".container"),
musicImage = container.querySelector(".center-img img"),
musicName = container.querySelector(".artist h3"),
musicArtist = container.querySelector(".artist p"),
mainAudio = container.querySelector("#main-audio"),
playPause=container.querySelector(".play-pause"),
forwardBtn=container.querySelector("#forward"),
backwardBtn = container.querySelector("#backward"),
progressBar = container.querySelector(".area"),
progressArea = container.querySelector(".progress-bar");
musicList = container.querySelector(".music-list"),
showBtn = container.querySelector("#more-music"),
hideMusic = musicList.querySelector("#close");

let muiscIndex = 2;

window.addEventListener("load",()=>{
    loadMusic(muiscIndex);
    PlayingNow();
})

function loadMusic(indexNum){
musicName.innerText= MusicList[indexNum-1].title;
musicArtist.innerText = MusicList[indexNum -1].artist;
musicImage.src= MusicList[indexNum-1].images;
mainAudio.src =`./songs/${MusicList[indexNum-1].src}.mp3`;

}
// play music funct
 function playMusic(){
    container.classList.add("paused");
    playPause.querySelector("i").classList="fa-solid fa-pause pause";
    mainAudio.play()
 }
//  pause music funct
 function pauseMusic(){
    container.classList.remove("paused");
    playPause.querySelector("i").classList="fa-solid fa-play play";
    mainAudio.pause()
 }

playPause.addEventListener("click",()=>{
    const musicpause = container.classList.contains("paused");
    musicpause ? pauseMusic() : playMusic();
})
forwardBtn.addEventListener("click", ()=>{
    if (muiscIndex == 6) {
        muiscIndex = 1;
        loadMusic(muiscIndex);
        playMusic()
    }
    else{
        muiscIndex +=1;
        loadMusic(muiscIndex);
        playMusic();
    }
})
backwardBtn.addEventListener("click", ()=>{
    if (muiscIndex == 1) {
        muiscIndex = 6;
        loadMusic(muiscIndex);
        playMusic();
    }
    else{
        muiscIndex -=1;
        loadMusic(muiscIndex);
        playMusic();
    }
})

mainAudio.addEventListener("timeupdate", (e)=>{
   const currentTime =e.target.currentTime;
   const duration =e.target.duration;
   let progessWidth = (currentTime/duration) * 100;
   progressBar.style.width=`${progessWidth}%`;


   let musicCurentTime = container.querySelector(".start"),
   musicDuration = container.querySelector(".end");

   mainAudio.addEventListener("loadeddata",()=>{
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec<10){
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
   })
    // update current time
    let CurrentMin = Math.floor(currentTime/ 60);
    let CurrentSec = Math.floor(currentTime % 60);
    if(CurrentSec<10){
        CurrentSec = `0${CurrentSec}`;
    }
   musicCurentTime.innerText = `${CurrentMin}:${CurrentSec}`;
});

progressArea.addEventListener("click", (e)=>{
    let progresswidthV = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let SongDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progresswidthV) * SongDuration;
    playMusic();
});

showBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show");
    })
    
    hideMusic.addEventListener("click",()=>{
       showBtn.click();
    });

    const ulTag = container.querySelector("ul");
    const allLiTags = ulTag.querySelectorAll("li"); // Use querySelectorAll to get all <li> elements
    function PlayingNow(){
    for (let j = 0; j < allLiTags.length; j++) { 
            if(allLiTags[j].classList.contains("playing")){
                allLiTags[j].classList.remove("playing");
            }
            if (allLiTags[j].getAttribute("li-index") == muiscIndex) { 
                allLiTags[j].classList.add("playing");
            }
            allLiTags[j].setAttribute("onclick", "clicked(this)");
        }
    }
    
    
    function clicked(element) {
        let getLiIndex = element.getAttribute("li-index");
        muiscIndex=getLiIndex
        loadMusic(muiscIndex);
        playMusic();
        PlayingNow();
    }
    