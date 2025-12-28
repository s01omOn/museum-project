const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.querySelector('.counter');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
const total = slides.length;

function updateSlider() {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');

  counter.textContent = `0${index + 1} | 0${total}`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % total;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + total) % total;
  updateSlider();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
  });
});

document.querySelectorAll('.tour-link').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Virtual tour clicked');
  });
});

document.querySelectorAll('.image-compare').forEach(section => {
  const container = section.querySelector('.compare-images');
  const frontWrapper = section.querySelector('.img-front-wrapper');
  const slider = section.querySelector('.compare-slider');

  let isDragging = false;

  function move(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;

    frontWrapper.style.width = percent + '%';
    slider.style.left = percent + '%';
  }

  slider.addEventListener('mousedown', e => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (isDragging) move(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  slider.addEventListener('touchstart', e => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('touchmove', e => {
    if (isDragging) move(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
});

const video = document.getElementById('mainVideo');
const thumbs = document.querySelectorAll('.thumb');
const dots1 = document.querySelectorAll('.video-dots .dot');
const prev = document.querySelector('.video-arrow.prev');
const next = document.querySelector('.video-arrow.next');

const videoIds = [
  "zp1BXPX8jcU", "Vi5D6FKhRmo", "NOhDysLnTvY", "aWmJ5DgyWPI", "2OR0OCr6uRE"
];

let current = 0;

function updateVideo(index) {
  const videoId = videoIds[index];
  video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  thumbs.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  thumbs[index].classList.add('active');
  dots[index].classList.add('active');

  current = index;
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => updateVideo(index));
});

next.addEventListener('click', () => {
  const index = (current + 1) % videoIds.length;
  updateVideo(index);
});

prev.addEventListener('click', () => {
  const index = (current - 1 + videoIds.length) % videoIds.length;
  updateVideo(index);
});

dots1.forEach((dot, index) => {
  dot.addEventListener('click', () => updateVideo(index));
});

document.querySelectorAll('.gallery-column').forEach(column => {
  column.addEventListener('wheel', (e) => {
  e.preventDefault();
  column.scrollTop += e.deltaY;
  });
});

const prices = {
  basic: 20,
  senior: 10
};

const counts = {
  basic: 1,
  senior: 1
};

const basicEl = document.getElementById('basicCount');
const seniorEl = document.getElementById('seniorCount');
const totalEl = document.getElementById('total');

document.querySelectorAll('.plus').forEach(btn => {
  btn.addEventListener('click', () => {
    counts[btn.dataset.type]++;
    update();
  });
});

document.querySelectorAll('.minus').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    if (counts[type] > 0) counts[type]--;
    update();
  });
});

function update() {
  basicEl.textContent = counts.basic;
  seniorEl.textContent = counts.senior;
  totalEl.textContent =
    counts.basic * prices.basic +
    counts.senior * prices.senior;
}

function updateTotal() {
    const basicCount = parseInt(document.getElementById('basicCount').textContent);
    const seniorCount = parseInt(document.getElementById('seniorCount').textContent);

    const basicPrice = 20;
    const seniorPrice = 10;

    const total = (basicCount * basicPrice) + (seniorCount * seniorPrice);
    document.getElementById('total').textContent = total;
}

document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        const countElement = document.getElementById(`${type}Count`);
        countElement.textContent = parseInt(countElement.textContent) + 1;
        updateTotal();
    });
});

document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        const countElement = document.getElementById(`${type}Count`);
        let count = parseInt(countElement.textContent);
        if (count > 1) {
            countElement.textContent = count - 1;
            updateTotal();
        }
    });
});

document.getElementById('payButton').addEventListener('click', function() {
    const total = document.getElementById('total').textContent;
    
    if (parseInt(total) > 0) {
        window.location.href = "payment.html";
    } else {
        alert("Пожалуйста, выберите количество билетов.");
    }
});
