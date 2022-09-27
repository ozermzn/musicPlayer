class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title;
  }
}

const musicList = [
  new Music("Lost On You", "LP", "lost-on-you.jpg", "lost-on-you.mp3"),
  new Music(
    "Feel Nothing",
    "The Plot In You",
    "i-feel-nothing.jpg",
    "i-feel-nothing.mp3"
  ),
  new Music(
    "Sen Kocaman Çöllerde",
    "Canozan",
    "sen-kocaman-collerde.jpg",
    "sen-kocaman-collerde.mp3"
  ),
];
