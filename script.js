let timelineData = [];
let commentsData = [];

async function loadData() {
  const timelineRes = await fetch('data/timeline.json');
  timelineData = await timelineRes.json();
  const commentsRes = await fetch('data/comments.json');
  commentsData = await commentsRes.json();

  const timeline = document.getElementById('timeline');
  timeline.max = timelineData.length - 1;
  timeline.addEventListener('input', updatePhoto);
  updatePhoto();
}

function updatePhoto() {
  const index = document.getElementById('timeline').value;
  const photoInfo = timelineData[index];
  const photo = document.getElementById('photo');
  const commentsLayer = document.getElementById('comments-layer');

  photo.src = photoInfo.photo;
  photo.onload = () => {
    commentsLayer.innerHTML = '';
    const date = photoInfo.date;
    const comments = commentsData.filter(c => c.date === date);
    comments.forEach(c => {
      const el = document.createElement('div');
      el.className = 'comment';
      el.textContent = c.text;
      el.style.top = c.y + 'px';
      el.style.left = c.x + 'px';
      commentsLayer.appendChild(el);
    });
  };
}

document.getElementById('comment-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  if (!text) return;
  const index = document.getElementById('timeline').value;
  const date = timelineData[index].date;
  const x = Math.floor(Math.random() * 300);
  const y = Math.floor(Math.random() * 200);
  commentsData.push({ date, text, x, y });
  input.value = '';
  updatePhoto();
});

loadData();