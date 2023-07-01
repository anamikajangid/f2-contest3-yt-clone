const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");

video_container.src = `https://www.youtube.com/embed/${videoId} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameborder="0"  scrolling="no" draggable="false"  allowfullscreen autoplay=1&mute=1`;
