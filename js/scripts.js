/** js/scripts.js of bbauska/2000s making 2000s.bauska.org */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class VCREffect {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Object.assign({
      fps: 60,
      blur: 1,
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 70
    }, options);
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.opacity = this.config.opacity;
    this.generateVCRNoise();
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateVCRNoise() {
    if (this.config.fps >= 60) {
      cancelAnimationFrame(this.vcrInterval);
      const animate = () => {
        this.renderTrackingNoise();
        this.vcrInterval = requestAnimationFrame(animate);
      };
      animate();
    } else {
      clearInterval(this.vcrInterval);
      this.vcrInterval = setInterval(() => {
        this.renderTrackingNoise();
      }, 1000 / this.config.fps);
    }
  }

  renderTrackingNoise(radius = 2) {
    const { canvas, ctx, config } = this;
    let { miny, miny2, num } = config;
    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;
    ctx.beginPath();
    for (let i = 0; i <= num; i++) {
      let x = Math.random() * canvas.width;
      let y1 = getRandomInt(miny += 3, canvas.height);
      let y2 = getRandomInt(0, miny2 -= 3);
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();
      this.renderTail(ctx, x, y1, radius);
      this.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  }

  renderTail(ctx, x, y, radius) {
    const n = getRandomInt(1, 50);
    const dirs = [1, -1];
    let dir = dirs[Math.floor(Math.random() * dirs.length)];

    for (let i = 0; i < n; i++) {
      let r = getRandomInt(radius - 0.01, radius);
      let dx = getRandomInt(1, 4) * dir;
      radius -= 0.1;
      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  }
}  /* of class VCREffect */

// Usage
const canvas = document.getElementById("canvas");
const vcrEffect = new VCREffect(canvas, {
  opacity: 1,
  miny: 220,
  miny2: 220,
  num: 70,
  fps: 60,
  blur: 1
});

/** 2000's nostalgia videos;
 1. https://youtu.be/sPQx_Idiztw = arrested development (2003-2019)
 2. https://youtu.be/CKLor3gpaPo = the sopranos (1/1/1999-6/10/2007)
 3. https://youtu.be/PCYlt6OozSM = the daily show (1/11/1999-present)
 4. https://youtu.be/ErL5R4fv_uc = 30 rock (2006-2013)
 5. https://youtu.be/S8p22rtNMoM = south park (1997-present)
 6. https://youtu.be/t6GOZjSFRiE = the west wing (9/22/1999-5/14/2006)
 7. https://youtu.be/9Zp8UlxyjQ4 = the office (3/24/05-2013)
 8. https://youtu.be/1i8dvWKrsMM = doctor who (2005-present)
 9. https://youtu.be/7uTAIpU0sa0 = band of brothers (2001)
10. https://youtu.be/E3gYi-KvKug = six feet under (2001-2005)
11. https://youtu.be/uDcQbk78CSw = the wire (2002-2008)
**/

const videoIds = ["sPQx_Idiztw", "CKLor3gpaPo", "PCYlt6OozSM", "ErL5R4fv_uc", "S8p22rtNMoM", "t6GOZjSFRiE", 
                  "9Zp8UlxyjQ4", "1i8dvWKrsMM","7uTAIpU0sa0","E3gYi-KvKug","uDcQbk78CSw"];
let currentVideoIndex = 0;
const iframe = document.getElementById("ytplayer");
const snowEffect = document.querySelector(".snow-effect");

function switchToNextVideo() {
  snowEffect.style.opacity = 1;
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    iframe.src = `https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&controls=0&loop=1&mute=1`;
    snowEffect.style.opacity = 0;
  }, 3000);  /* 3 seconds of static before switching */
}

iframe.addEventListener("load", () => {
  setTimeout(switchToNextVideo, 17000);  /* 17 seconds of video play */
});
