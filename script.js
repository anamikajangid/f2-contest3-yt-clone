const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyB8MuZhp6gNGiZ4IkkPrd2ECxZ8DiOG1ds";
// "AIzaSyCcdRtT2ZvcsKD5zis-d0WCwgFfjkWTH8k";

const container = document.getElementById("video-container");
async function getVideos(q) {
  const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;

  const response = await fetch(url);
  const data = await response.json();

  const videos = data.items;
  //console.log(videos);
  //console.log(data);
  getVideosData(videos);
}

async function getVideosData(videos) {
  let videodata = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const videoId = video.id.videoId;
    videodata.push(await getVideosDetails(videoId));
  }
  //console.log(videodata);
  renderVideosData(videodata);
}

async function getVideosDetails(videoId) {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();
  return data.items[0];
  //console.log("video details>>>>", data);
}

function renderVideosData(videos) {
  container.innerHTML = ``;
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    container.innerHTML += `   
    <div class="video-info" onclick="openVideo('${video.id}')">
    <div class="video-image">
    <iframe src="${video.snippet.thumbnails.high.url}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameborder="0"  scrolling="no" draggable="false"  allowfullscreen></iframe> 
    </div>
    <div class="video-descripton">
      <div class="channel-avatar">
        <img src="" alt="img1"/>
        <div class="video-title">${video.snippet.localized.title}</div>
      </div>
      
      <div class="channel-description">
        <p class="channel-name"></p>
        <p class="chennl=views"></p>
        <p class="chanel-time"></p>
      </div>
    </div>
  </div>
  
   `;
  }
}
function openVideo(videoId) {
  localStorage.setItem("videoId", videoId);
  window.open("/videoDetails.html");
}

getVideos("");

//getVideosDetails("Pagl1zg0j4A");
