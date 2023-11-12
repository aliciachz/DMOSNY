const input = document.querySelector('label input');
const subMo = document.querySelector('.sub_mo');
const slide = document.querySelectorAll(".slide_wrap>.slide");
const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");
const slideBtns = document.querySelectorAll(".slide_select_btn>li");
const btnPlay = document.querySelector(".btn_play");
const btnPause = document.querySelector(".btn_pause");
const videoDurationBars = document.querySelectorAll(".video-duration-bar");
const slideSelectBtns = document.querySelectorAll(".slide_select_btn li a");
const sections = document.querySelectorAll('.scroll-section');
const bannerWrap = document.querySelector('.store_banner_wrap');
const slideList = document.querySelectorAll(".store_banner_wrap > li");


let activation = (list, i)=>{
    for(let el of list){
      el.classList.remove("on","active");
    }
    list[i].classList.add("on","active");
  }
  function updateVideoDurationBars(currentIndex) {
    videoDurationBars.forEach((bar, index) => {
      if (index === currentIndex) {
        bar.classList.add("on");
      } else {
        bar.classList.remove("on");
      }
    });
  }


  // our schools
  document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector('.animated-title');
    const letters = title.querySelectorAll('span');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          letters.forEach((letter, idx) => {
            letter.style.animation = `slideIn 0.5s forwards ${idx * 0.05}s`; // Adjust the speed here
          });
        }
      });
    }, {
      threshold: 0.6 // Adjust this value based on when you want the animation to start
    });

    observer.observe(title);
  });

  


  
  
// 이전, 다음 슬라이드로 이동
let bnnNum = 0;
const lastNum = slide.length - 1;
console.log(lastNum);
btnNext.addEventListener("click", e => {
  e.preventDefault();
  bnnNum = (bnnNum + 1) % slide.length;
  activation(slide, bnnNum);
  updateVideoDurationBars(bnnNum);
});

btnPrev.addEventListener("click", e => {
  e.preventDefault();
  bnnNum = (bnnNum - 1 + slide.length) % slide.length;
  activation(slide, bnnNum);
  updateVideoDurationBars(bnnNum);
});

// 슬라이드 번호로 이동
slideBtns.forEach((slideBtn, i) => {
  slideBtn.addEventListener("click", e => {
    e.preventDefault();
    activation(slide, i);
    updateVideoDurationBars(i);
  });
});

// 비디오 재생/멈춤 및 밝기
btnPlay.addEventListener("click", () => {
  slide.forEach(el => {
    const video = el.querySelector("video");
    video.play();
    btnPlay.style.opacity = 1; 
    btnPause.style.opacity = 0.5; 
  });
});

btnPause.addEventListener("click", () => {
  slide.forEach(el => {
    const video = el.querySelector("video");
    video.pause();
    btnPause.style.opacity = 1; 
    btnPlay.style.opacity = 0.5; 
  });
});

// 해당하는 index 에 videoDurationBars 
slideSelectBtns.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateVideoDurationBars(index);
  });
});

// 현제 비디오 길이
document.addEventListener("DOMContentLoaded", function () {
  const videoElements = document.querySelectorAll(".slide_wrap video");
  const durationBarInnerElements = document.querySelectorAll(".slide_select_btn .video-duration-bar-inner");

  let isPaused = false;

  btnPlay.addEventListener("click", function (e) {
    e.preventDefault();
    isPaused = false;
    durationBarInnerElements.forEach((barInner) => {
      barInner.style.animationPlayState = "running";
    })
  })

  btnPause.addEventListener("click", function (e) {
    e.preventDefault();
    isPaused = true;
    durationBarInnerElements.forEach((barInner) => {
      barInner.style.animationPlayState = "paused";
    })
  })

  videoElements.forEach((video, index) => {
    video.addEventListener("loadedmetadata", () => {
      const duration = Math.round(video.duration);
      durationBarInnerElements[index].style.animationDuration = `${duration}s`;
      if (isPaused) {
        durationBarInnerElements[index].style.animationPlayState = "paused";
      }
    })
  })
});



