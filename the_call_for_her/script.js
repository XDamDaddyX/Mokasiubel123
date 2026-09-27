"use strict";

// Không cần sửa file này để đổi câu chuyện / ảnh / nhạc. Hãy mở config.js.
const C = typeof THE_CALL_CONFIG !== "undefined" ? THE_CALL_CONFIG : {};
const el = (id) => document.getElementById(id);
const incoming = el("incoming");
const chat = el("chat");
const ending = el("ending");
const messages = el("messages");
const typing = el("typing");
const audio = el("bgMusic");
const story = Array.isArray(C.story) ? C.story : [];
const pacing = C.pacing || {};
const screens = [incoming, chat, ending];
const musicControls = [el("musicToggle"), el("endingMusicToggle")];
let storySession = 0;
let nextStoryIndex = 0;
let declineCount = 0;
let declineTimer = null;
let toastTimer = null;
let musicWanted = Boolean(C.music?.autoplay);
let lastLightboxTrigger = null;

function str(value, fallback = "") {
  return value === null || value === undefined ? fallback : String(value);
}
function setText(id, value, fallback = "") {
  el(id).textContent = str(value, fallback);
}
function showScreen(active) {
  screens.forEach((screen) => {
    const selected = screen === active;
    screen.classList.toggle("active", selected);
    screen.setAttribute("aria-hidden", String(!selected));
  });
}
function setAvatar(holder, url, letter, asSmall = false) {
  holder.textContent = "";
  const fallback = document.createElement("span");
  fallback.textContent = letter;
  holder.appendChild(fallback);
  if (!url) return;
  const img = document.createElement("img");
  img.alt = `Ảnh của ${str(C.senderName, "Cục cứcc")}`;
  img.onload = () => { holder.replaceChildren(img); };
  img.onerror = () => { /* giữ chữ cái thay ảnh lỗi */ };
  img.src = url;
}
function initCopy() {
  document.title = str(C.pageTitle, "The Call — Dành cho em");
  setText("deskFrom", C.senderName, "Cục cứcc");
  setText("deskTo", C.receiverName, "Em");
  setText("callerName", C.senderName, "Cục cứcc");
  setText("chatName", C.senderName, "Cục cứcc");
  setText("callerSubtitle", C.callerSubtitle, "Có vài điều tuôimuốn kể cho em...");
  setText("callType", C.callType, "Cốc cốc mở cửa cho anh đê");
  setText("openingEyebrow", C.openingEyebrow, "AN INCOMING MEMORY");
  setText("openingHint", C.openingHint, "Nhấc máy đi, tuôi có chuyện muốn nói ");
  document.querySelector(".incoming-small").textContent = `Đang gọi  ${str(C.receiverName, "em")} từ`;
  setText("endingEyebrow", C.ending?.eyebrow, "CUỘC GỌI ĐÃ KẾT THÚC");
  setText("endingTitle", C.ending?.title, "Nhưng câu chuyện của chúng mình thì chưa.");
  setText("endingNote", C.ending?.note, "Cảm ơn em đã nhận cuộc gọi này. ♡");
  setText("restartBtn", C.ending?.replayLabel, "↻ Nghe tuôi kể lại");
  el("finishBtn").firstChild.textContent = `${str(C.ending?.continueLabel,"Mở lời nhắn cuối ♡")} `;
  const letter = str(C.avatarFallback, str(C.senderName, "A").charAt(0) || "A");
  setAvatar(el("callerAvatar"), str(C.avatarImage), letter);
  setAvatar(el("chatAvatar"), str(C.avatarImage), letter, true);
}
function updateClock() {
  setText("clock", new Date().toLocaleTimeString("vi-VN", {hour:"2-digit",minute:"2-digit"}));
}
function wait(ms) { return new Promise(resolve => setTimeout(resolve, Math.max(0,Number(ms)||0))); }
function scrollDown(instant = false) {
  messages.scrollTo({top:messages.scrollHeight,behavior:instant ? "instant":"smooth"});
}
function showMusicToast(message) {
  const toast = el("musicToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3400);
}
function refreshMusicUI() {
  const playing = !audio.paused && !audio.ended;
  musicControls.forEach(button => {
    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Tắt nhạc nền" : "Bật nhạc nền");
  });
  setText("musicLabel", playing ? "Trong call" : "Trong call hehe");
  el("endingMusicToggle").textContent = playing ? "♫ Tắt nhạc nền" : "♫ Bật nhạc nền";
}
async function playMusic(notifyIfFailed = false) {
  if (!C.music?.src) {
    if (notifyIfFailed) showMusicToast("Chưa có nhạc. Thêm file và sửa music.src trong config.js nhé ♡");
    return;
  }
  try {
    await audio.play();
    // Nếu người dùng kịp tắt nhạc trong lúc lời gọi play chưa hoàn thành
    if (!musicWanted) audio.pause();
  } catch (error) {
    if (notifyIfFailed) showMusicToast("Chưa phát được nhạc. Kiểm tra music.src hoặc bấm lại ♫");
  }
  refreshMusicUI();
}
function toggleMusic() {
  if (!audio.paused) {
    musicWanted = false;
    audio.pause();
    refreshMusicUI();
  } else {
    musicWanted = true;
    playMusic(true);
  }
}
function initMusic() {
  const config = C.music || {};
  audio.loop = config.loop !== false;
  audio.volume = Math.max(0,Math.min(1,Number(config.volume ?? 0.32)));
  if (config.src) audio.src = config.src;
  musicControls.forEach(button => {
    button.dataset.musicControl = "true";
    button.addEventListener("click", toggleMusic);
  });
  audio.addEventListener("play", refreshMusicUI);
  audio.addEventListener("pause", refreshMusicUI);
  audio.addEventListener("ended", refreshMusicUI);
  audio.addEventListener("error", () => {
    if (!audio.paused) audio.pause();
    refreshMusicUI();
  });
  refreshMusicUI();
  if (musicWanted) {
    // Trình duyệt có thể chặn phát nhạc có tiếng khi chưa có thao tác từ người dùng.
    playMusic(false);
    document.addEventListener("pointerdown", (event) => {
      if (musicWanted && audio.paused && !event.target.closest("[data-music-control]")) playMusic(false);
    }, {once:true,capture:true});
    document.addEventListener("keydown", (event) => {
      if (musicWanted && audio.paused && !event.target.closest("[data-music-control]")) playMusic(false);
    }, {once:true,capture:true});
  }
}
function resetStory() {
  storySession++;
  nextStoryIndex = 0;
  messages.replaceChildren();
  typing.classList.add("hidden");
  el("skipBtn").classList.remove("hidden");
  el("finishBtn").classList.add("hidden");
  setText("status", "● Đang kết nối...");
}
function finishStory() {
  typing.classList.add("hidden");
  el("skipBtn").classList.add("hidden");
  el("finishBtn").classList.remove("hidden");
  setText("status", "● Đã gửi hết lời nhắn");
  scrollDown();
}
function createImageVisual(item, index) {
  const visual = document.createElement("div");
  visual.className = "image-visual";
  const fallback = document.createElement("span");
  fallback.className = "image-placeholder";
  fallback.textContent = "♡";
  visual.appendChild(fallback);
  const imageUrl = str(item.src);
  if (imageUrl) {
    const img = document.createElement("img");
    img.alt = str(item.alt, "Một kỷ niệm của hai đứa");
    img.loading = "lazy";
    img.onload = () => { if (img.isConnected) fallback.remove(); };
    img.onerror = () => { img.remove(); };
    visual.appendChild(img);
    img.src = imageUrl;
  }
  visual.style.setProperty("--image-index", index + 1);
  return visual;
}
function showImage(item, trigger) {
  lastLightboxTrigger = trigger || document.activeElement;
  const visual = el("lightboxVisual");
  visual.replaceChildren();
  if (item.src) {
    const image = document.createElement("img");
    image.alt = str(item.alt,"Ảnh kỷ niệm");
    image.onerror = () => {visual.textContent = "♡";};
    image.src = item.src;
    visual.appendChild(image);
  } else {
    visual.textContent = "♡";
  }
  setText("lightboxCaption", item.caption, "Kỷ niệm của chúng mình ♡");
  el("lightbox").classList.add("open");
  el("lightbox").setAttribute("aria-hidden","false");
  el("closeLightbox").focus();
}
function closeImage() {
  el("lightbox").classList.remove("open");
  el("lightbox").setAttribute("aria-hidden","true");
  if (lastLightboxTrigger?.isConnected) lastLightboxTrigger.focus();
}
function renderItem(item, index, instant = false) {
  if (!item || typeof item !== "object") return;
  if (item.type === "date") {
    const date = document.createElement("div");
    date.className = "date";
    date.textContent = str(item.text);
    messages.append(date);
  } else if (item.type === "image") {
    const wrap = document.createElement("div");
    wrap.className = "msg";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "msg-image";
    button.setAttribute("aria-label", `Mở ảnh: ${str(item.caption,"Kỷ niệm")}`);
    button.appendChild(createImageVisual(item,index));
    const caption = document.createElement("div");
    caption.className = "image-caption";
    caption.textContent = str(item.caption,"Một kỷ niệm ♡");
    button.appendChild(caption);
    button.addEventListener("click", () => showImage(item,button));
    wrap.append(button);
    messages.append(wrap);
  } else if (item.type === "text") {
    const wrap = document.createElement("div");
    wrap.className = "msg";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = str(item.text);
    wrap.append(bubble);
    messages.append(wrap);
  }
  scrollDown(instant);
}
async function playStory(session) {
  await wait(pacing.initialDelay ?? 720);
  if (session !== storySession) return;
  setText("status", "● Đang hoạt động");
  while (nextStoryIndex < story.length) {
    const index = nextStoryIndex;
    const item = story[index];
    if (item.type === "date") {
      await wait(320);
    } else {
      await wait(item.delay ?? pacing.messageDelay ?? 560);
      if (session !== storySession) return;
      typing.classList.remove("hidden");
      await wait(item.typingDelay ?? pacing.typingDelay ?? 650);
      if (session !== storySession) return;
      typing.classList.add("hidden");
    }
    if (session !== storySession) return;
    renderItem(item,index);
    nextStoryIndex = index + 1;
  }
  if (session === storySession) finishStory();
}
function startCall() {
  if (musicWanted && audio.paused) playMusic(false);
  resetStory();
  showScreen(chat);
  playStory(storySession);
}
function skipStory() {
  storySession++;
  typing.classList.add("hidden");
  for (let i=nextStoryIndex;i<story.length;i++) renderItem(story[i],i,true);
  nextStoryIndex=story.length;
  finishStory();
}
function backToCall() {
  storySession++;
  typing.classList.add("hidden");
  closeImage();
  showScreen(incoming);
}
function initEvents() {
  el("answerBtn").addEventListener("click", startCall);
  el("backBtn").addEventListener("click", backToCall);
  el("skipBtn").addEventListener("click",skipStory);
  el("finishBtn").addEventListener("click", () => showScreen(ending));
  el("restartBtn").addEventListener("click", () => {backToCall();el("declineMessage").classList.remove("show");});
  el("declineBtn").addEventListener("click", () => {
    const lines = Array.isArray(C.declineLines) ? C.declineLines : [];
    const line = lines.length ? lines[Math.min(declineCount,lines.length-1)] : "Nghe máy đi mà ♡";
    declineCount++;
    setText("declineMessage",line);
    el("declineMessage").classList.add("show");
    clearTimeout(declineTimer);
    declineTimer = setTimeout(() => el("declineMessage").classList.remove("show"),2400);
  });
  el("closeLightbox").addEventListener("click",closeImage);
  el("lightbox").addEventListener("click", event => {if(event.target === el("lightbox")) closeImage();});
  document.addEventListener("keydown", event => {if(event.key === "Escape" && el("lightbox").classList.contains("open"))closeImage();});
}

initCopy();
updateClock();
setInterval(updateClock,30000);
initMusic();
initEvents();
