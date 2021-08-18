var songs =[

     {
          id    :  0,
          name  : "Aaoromale",
          title : "Aaoromale",
          album : "Vinnaithandi Varuvaayaa",
          artist: "A.R.Rahman",
      },
     {
          id    :1,
          name  :"Mannipaaya",
          title : "Mannipaaya",
          album : "Vinnaithandi Varuvaayaa",
          artist: "A.R.Rahman",
     },
      
      {
          id    :  2,
          title : "New York",
          name  : "New York",
          album : "Jillunu Oru Kadhal",
          artist: "A.R.Rahman",
      },
     {
          id    :  3,
          name  :"Munbe Vaa",
          title : "Munbe Vaa",
          album : "Jillunu Oru Kadhal",
          artist: "A.R.Rahman",
     },
     {
          id    :  4,
          name  : "Mustafa Mustafa",
          title : "Mustafa Mustafa",
          album : "Kadhal Desam",
          artist: "A.R.Rahman",
     },
     {
          id    :  5,
          name  : "Omana-Penne",
          title : "Omana penne",
          album : "Vinnaithandi Varuvaayaa",
          artist: "A.R.Rahman",
     },
     {
          id    :  6,
          name  :"Ennodu Nee Irundhal",
          title : "Ennodu Nee Irundhal",
          album : "I",
          artist: "A.R.Rahman",
          
     },

     {
          id    :  7,
          name  :"Sonapareeya",
          title : "Sonapareeya",
          album : "Mariyan",
          artist: "A.R.Rahman",
          
     },
     {
          id    :  8,
          name  :"Idhu Naal",
          title : "Idhu Naal",
          album : "Achcham Yenbadhu Madamaiyada",
          artist: "A.R.Rahman",
          
     },
];
var music = document.querySelector("audio");
var img = document.querySelector("img");
var title = document.getElementById("title");
var album = document.getElementById("album");

var play = document.getElementById("play");
var prev = document.getElementById("prev");
var next = document.getElementById("next");

var progress = document.getElementById("progress");
var total_duration =document.getElementById("duration");
var current_time = document.getElementById("current_time");
var progress_div = document.getElementById("progress_div")

var isPlaying = false;
// play function
playMusic = () =>
{
     isPlaying = true;
     music.play();
     play.classList.replace("fa-play", "fa-pause");
     img.classList.add("anime");
};


// pause function
pauseMusic = () =>
{
     isPlaying = false;
     music.pause();
     play.classList.replace( "fa-pause","fa-play");
     img.classList.remove("anime");
};
play.addEventListener('click',() =>{
     isPlaying? pauseMusic() : playMusic()
});


// load songs
 var loadSong = (songs) => 
     {
      title.textContent = songs.title;
      album.textContent = songs.album;
      music.src = `./audiofile/${songs.name}.mp3`;
      img.src ="images/"+songs.album+".jpg";
     };
 songIndex =0;
 var nextSong = () => {
     songIndex = (songIndex+1) % songs.length;
     loadSong(songs[songIndex]);
     currentTime.textContent= "0:00";
     progress.style.width=  "0%";
};

var prevSong = () => {
     songIndex = (songIndex-1+songs.length) % songs.length;
     loadSong(songs[songIndex]);
     currentTime.textContent= "0:00";
      
};
// progress bar functions

music.addEventListener("timeupdate",(event) =>
{
     console.log(event);
     var {currentTime,duration} =event.srcElement;
     var progress_time = (currentTime/duration)*100;
     progress.style.width = `${progress_time}%`;

     // update duration time

     var min_duration = Math.floor((duration / 60));
     var sec_duration = Math.floor((duration % 60));
     
          if(sec_duration<10)
          {
           sec_duration = `0${sec_duration}`;
          }

     var tot_duration = `${min_duration}:${sec_duration}`;
     if(duration)
     {
          total_duration.textContent =`${tot_duration}`;
     }

     // Update CurrentTime

     var min_currentTime = Math.floor((currentTime / 60));
     var sec_currentTime = Math.floor((currentTime % 60));
   
          if(sec_currentTime<10)
          {
              sec_currentTime = `0${sec_currentTime}`;
          }

     var tot_currentTime = `${min_currentTime}:${sec_currentTime}`;

     current_time.textContent =`${tot_currentTime}`;

});   

//click event on progress bar
progress_div.addEventListener("click",(event) =>
{
     var {duration} = music;

     // console.log(event);
     var move_progress = (event.offsetX/event.srcElement.clientWidth)*duration;
     music.currentTime = move_progress;

});

music.addEventListener("ended",nextSong);//to load next song when the current song is ended

// next and prev button funcions
     next.addEventListener("click",nextSong);
     prev.addEventListener("click",prevSong);