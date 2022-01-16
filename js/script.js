const play=document.getElementById("play");
const music=document.querySelector("audio");
const img=document.querySelector("img");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
let progress=document.getElementById("progress");
let current_time=document.getElementById("current_time");

let durat=document.getElementById("duration");
const progress_div=document.getElementById("progress_div");
const songs=[{
    name:"m1",
    title:"Lotus Lane",
    artist:'loyalist'
},
{
    name:"m2",
    title:"Lotus Lane",
    artist:'loyalist'
},
{
    name:"m3",
    title:"Lotus Lane",
    artist:'loyalist'
},
{
    name:"m4",
    title:"Mai Woh Chaand",
    artist:'Darshan Raval'
},
{
    name:"m5",
    title:"Pal",
    artist:'Arijit Singh'
},
{
    name:"m6",
    title:"Mera Pyaar",
    artist:'Arijit Singh'
},
{
    name:"m7",
    title:"Lotus Lane",
    artist:'loyalist'
},
{
    name:"m8",
    title:"Let Me Down",
    artist:'Alec Benjamin'
},
{
    name:"m9",
    title:"Lotus Lane",
    artist:'loyalist'
},
{
    name:"m10",
    title:"Thoda Thoda Pyaar",
    artist:'Stebin Ben'
},

]
let isPlaying =false;
const playMusic=()=>{
    isPlaying =true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime")
    img.style.animationPlayState="running";
};
const pauseMusic=()=>{
    isPlaying =false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.style.animationPlayState="paused";
};
play.addEventListener("click",()=>{
    isPlaying ? pauseMusic():playMusic();
});
// changing music data
const loadSong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src="music/"+songs.name+".mp3";
    img.src="images/"+songs.name+".jpg";
}
songIndex=0;

const nextSong=()=>{
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
    
};
const prevSong=()=>{
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]);  
    playMusic();
};
// progress js work
music.addEventListener("timeupdate",(event)=>{
   const {currentTime, duration}= event.srcElement;
   let progress_time=(currentTime/duration)*100;
   progress.style.width=`${progress_time}%`;

//    music duration update

   let min_duration=Math.floor(duration/60);
   let sec_duration=Math.floor(duration%60);
   if(sec_duration<10){
    sec_duration=`0${sec_duration}`;
   }
   if(duration){
    durat.textContent=`${min_duration}:${sec_duration}`;
   }
   
   //    music currentTime update
   let min_currentTime=Math.floor(currentTime/60);
   let sec_currentTime=Math.floor(currentTime%60);
   if(sec_currentTime<10){
       sec_currentTime=`0${sec_currentTime}`;
   }
    current_time.textContent=`${min_currentTime}:${sec_currentTime}`;
   
});
// progress on click functionality
 progress_div.addEventListener("click",(event)=>{
    const {duration}=music;
    
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=move_progress;
 });
// if music end call nextSong

music.addEventListener("ended", nextSong);

next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);