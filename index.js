// DOM Elements
const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");
const playPauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");
const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const wave = document.getElementById("wave");
const randomIcon = document.querySelector(".fa-random");
const currTrack = new Audio();

const musicList = [
  {
    img: "images/Mac_Miller_-_The_Divine_Feminine.png",
    name: "My favorite part",
    artist: "Mac Miller, Ariana Grande",
    music: "audiofiles/myFavoritePart.mp3",
  },
  {
    img: "images/orlando.jpg",
    name: "Adelaide",
    artist: "Johnny Orlando",
    music: "audiofiles/Adelaide.mp3",
  },
  {
    img: "images/Willow-front-cover_900x900.jpg",
    name: "Willow",
    artist: "Tindersticks, Robert Pattison",
    music: "audiofiles/Willow.mp3",
  },
  {
    img: "images/Austin_Mahone_-_The_Secret_EP_Cover.png",
    name: "What About Love",
    artist: "Austin Mahone",
    music: "audiofiles/whatAboutLove.mp3",
  },
];

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Initialize the player
loadTrack(trackIndex);

// Function to load a track
function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  const selectedTrack = musicList[index];
  currTrack.src = selectedTrack.music;
  currTrack.load();

  trackArt.src = selectedTrack.img;
  trackName.textContent = selectedTrack.name;
  trackArtist.textContent = selectedTrack.artist;
  nowPlaying.textContent = `Playing music ${index + 1} of ${musicList.length}`;

  updateTimer = setInterval(setUpdate, 1000);

  currTrack.addEventListener("ended", nextTrack);
  randomBackgroundColor();
}

// Function to reset player display
function reset() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

// Function to toggle random playback mode
function toggleRandom() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

// Function to play or pause the current track
function togglePlayPause() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  currTrack.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  wave.classList.add("loader");
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  wave.classList.remove("loader");
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Function to play the next track
function nextTrack() {
  if (!isRandom) {
    trackIndex = (trackIndex + 1) % musicList.length;
  } else {
    trackIndex = Math.floor(Math.random() * musicList.length);
  }
  loadTrack(trackIndex);
  playTrack();
}

// Function to play the previous track
function prevTrack() {
  trackIndex = (trackIndex - 1 + musicList.length) % musicList.length;
  loadTrack(trackIndex);
  playTrack();
}

// Function to seek to a specific position in the track
function seekTo() {
  const seekToTime = (currTrack.duration * seekSlider.value) / 100;
  currTrack.currentTime = seekToTime;
}

// Function to set the volume
function setVolume() {
  currTrack.volume = volumeSlider.value / 100;
}

// Function to update the time display and seek slider
function setUpdate() {
  if (!isNaN(currTrack.duration)) {
    const currentTimeMinutes = Math.floor(currTrack.currentTime / 60);
    const currentTimeSeconds = Math.floor(currTrack.currentTime % 60);
    const durationMinutes = Math.floor(currTrack.duration / 60);
    const durationSeconds = Math.floor(currTrack.duration % 60);

    currTime.textContent = `${currentTimeMinutes}:${currentTimeSeconds
      .toString()
      .padStart(2, "0")}`;
    totalDuration.textContent = `${durationMinutes}:${durationSeconds
      .toString()
      .padStart(2, "0")}`;

    const seekPosition = (currTrack.currentTime / currTrack.duration) * 100;
    seekSlider.value = seekPosition;
  }
}

console.log(currTrack);
