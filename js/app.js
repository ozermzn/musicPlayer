const container = document.querySelector(".container");
const image = document.getElementById("img-details");
const audio = document.querySelector("#audio-details");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const replay = document.getElementById("replay");
const previous = document.querySelector("#prev");
const prevIcon = document.getElementById("prev-icon");
const playIcon = document.getElementById("play-icon");
const nextIcon = document.getElementById("next-icon");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("time-duration");
const volumeBar = document.getElementById("volume-bar");
const volume = document.getElementById("volume");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});
previous.addEventListener("click", () => {
  previousMusic();
});
const displayMusic = (music) => {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "../img/" + music.img;
  audio.src = "../mp3/" + music.file;
};

const playMusic = () => {
  playIcon.classList = "fa-solid fa-stop";
  container.classList.add("playing");
  audio.play();
};
const pauseMusic = () => {
  container.classList.remove("playing");
  playIcon.classList = "fa-solid fa-play";
  audio.pause();
};
const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  isPlayingNow();
  playMusic();
};
const previousMusic = () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  isPlayingNow();
  playMusic();
};
replay.addEventListener("click", () => {
  let music = player.getMusic();
  displayMusic(music);
  isPlayingNow();
  playMusic();
});
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

const calculateTime = (totalSecond) => {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const updateSecond = second < 10 ? `0${second}` : `${second}`;
  const result = `${minute}:${updateSecond}`;
  return result;
};

let muteState = "on";
volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = "off";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "on";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (muteState == "on") {
    muteState = "off";
    audio.muted = true;
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    muteState = "on";
    audio.muted = false;
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
    <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
  <span>${list[i].getName()}</span>
  <span id="music-${i}" class="badge  rounded-pill"></span>
  <audio class="music-${i}" src="../mp3/${list[i].file}"></audio
  </li>`;
    ul.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
