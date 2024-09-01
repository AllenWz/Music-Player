//DOM 
const image = document.getElementsByClassName("image")[0];
const albumTitle = document.getElementsByClassName("title")[0];
const musicContainer = document.getElementsByClassName("musicContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const timer = document.getElementsByClassName("timer")[0];
const progress = document.getElementsByClassName("progress")[0];
const prevBtn = document.getElementsByClassName("prevBtn")[0];
const nextBtn = document.getElementsByClassName("nextBtn")[0];
const playBtn = document.getElementsByClassName("playBtn")[0];
const pauseBtn = document.getElementsByClassName("pauseBtn")[0];

const musicList = [
    {playId: "songs/Aharen-san wa Hakarenai Opening - Hanarenai Kyori.mp3", name:"Aharen-san wa Hakarenai Opening - Hanarenai Kyori"},
    {playId: "songs/Baka to Test to Shoukanjuu Ni Opening - Kimi Nazo Watashi de JUMP.mp3", name:"Baka to Test to Shoukanjuu Ni Opening - Kimi Nazo Watashi de JUMP"},
    {playId: "songs/Food Wars 5 Opening - Last Chapter.mp3", name:"Food Wars 5 Opening - Last Chapter"},
    {playId: "songs/Haikyuu!! To The Top Opening - PHOENIX.mp3", name:"Haikyuu!! To The Top Opening - PHOENIX"},
    {playId: "songs/Kaguya-sama wa Kokurasetai Ultra Romantic Opening - GIRI GIRI.mp3", name: "Kaguya-sama wa Kokurasetai Ultra Romantic Opening - GIRI GIRI" },
    {playId: "songs/Kobayashi San Chi no Maid Dragon S Opening - Ai no Supreme.mp3", name: "Kobayashi San Chi no Maid Dragon S Opening - Ai no Supreme" },
    {playId: "songs/No Game No Life Opening - This game.mp3", name: "No Game No Life Opening - This game" },
    {playId: "songs/Tensei shitara Slime Datta Ken Opening 2 - Meguru Mono.mp3", name:"Tensei shitara Slime Datta Ken Opening 2 - Meguru Mono"},
    {playId: "songs/Trinity Seven Opening - Full Seven Doors.mp3", name: "Trinity Seven Opening - Full Seven Doors" },
    {playId: "songs/Tsuki ga Michibiku Isekai Douchuu Opening - Gamble.mp3", name: "Tsuki ga Michibiku Isekai Douchuu Opening - Gamble" }
]

const photoList = [
    "images/Aheran san.jpg",
    "images/Baka to test.png",
    "images/food war.png",
    "images/haikyuu.jpg",
    "images/kaguya sama.jpeg",
    "images/kobayashi san.jpg",
    "images/no game no life.jpg",
    "images/tensei shitara slime.jpg",
    "images/trinity seven.jpg",
    "images/tsuki michi.jpg"
]

//--------------- Creating song tags and adding songs ------------------//

let songTag;
for(let i=0; i<musicList.length; i++){
    //create DOM and append for music titles
    songTag = document.createElement("div");
    songTag.classList.add("songTag");
    //image
    let img = document.createElement("img");
    img.classList.add("thumbnail");
    img.src = photoList[i];
    //title
    let songName = document.createElement("div");
    songName.classList.add("songName");
    let title = (i+1).toString() + ". " + musicList[i].name;
    songName.textContent = title;
    //append
    songTag.append(img,songName)
    musicContainer.append(songTag);

    //onClick play on song name & change album image
    songTag.addEventListener("click", () => {
        audioIndex = i;
        playSong();
        
    });
}

const calculateTime = (timeText) => {
    const minute = Math.floor(timeText/60);
    const second = timeText%60;

    const minuteText = minute<10 ? "0" + minute.toString() : minute;
    const secondText = second<10 ? "0" + second.toString() : second;

    return minuteText + ":" + secondText;
}

let duration = "00:00";
let audioDuration = 0;
audioTag.addEventListener("loadeddata", ()=>{
    audioDuration = Math.floor(audioTag.duration);
    duration = calculateTime(audioDuration);
});

audioTag.addEventListener("timeupdate", ()=>{
    const currentTime = Math.floor(audioTag.currentTime);
    let playingTime = calculateTime(currentTime);

    timer.textContent = playingTime + " / " + duration;

    //----progress bar----//
    let progressPercentage = Math.floor(100 * (currentTime/audioDuration));
    progress.style.width = progressPercentage.toString() + "%";
    
});


//-------Btn section--------//

let audioIndex = 0;
let isPlaying = false;
playBtn.addEventListener("click", ()=>{
    const currentTime = Math.floor(audioTag.currentTime);
    
    //---play or resume---//
    if(currentTime===0){
        playSong();
    }else{
        audioTag.play();
        isPlaying = true;
    }
    
    //---btn change---//
    playAndPause();

});

pauseBtn.addEventListener("click", ()=>{
    audioTag.pause();
    isPlaying = false;
    playAndPause();
});

prevBtn.addEventListener("click", ()=>{
    if(audioIndex===0){
        return;
    }
        
    audioIndex -= 1;
    playSong();
});

nextBtn.addEventListener("click", ()=>{
    if(audioIndex===musicList.length-1){
        return;
    }

    audioIndex++;
    playSong();

});

audioTag.addEventListener("ended", ()=>{
    if(audioIndex===musicList.length-1){
        audioIndex = 0;
        playSong();
    }else{
        audioIndex++;
        playSong();
    }
    
});

let currentSongTag;
const playSong = () => {  

    let AudioTagArray = [...(document.getElementsByClassName("songTag"))];
    AudioTagArray.forEach((tag)=>{
        if(tag.classList.contains("playing")){
            tag.classList.remove("playing");
        }
    })

    audioTag.src = musicList[audioIndex].playId;
    audioTag.play();
    isPlaying = true;
    playAndPause();
    changeImageAndTitle();

    currentSongTag = document.getElementsByClassName("songTag")[audioIndex];
    currentSongTag.classList.add("playing");  
}

const playAndPause = () => {
    if(isPlaying===true){
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    }else{
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    }
}

//---change image and title---//
const changeImageAndTitle = () => {
    image.src = photoList[audioIndex];
    albumTitle.textContent = musicList[audioIndex].name;
}

