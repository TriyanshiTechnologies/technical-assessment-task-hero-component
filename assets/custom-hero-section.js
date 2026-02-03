(function () {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      name: "Lorem ipsum",
      date: "22/09/1996",
    },
    {
      text: "Thoughtfully crafted to deliver quality, performance, and reliability every day.",
      name: "John Doe",
      date: "11/04/2001",
    },
    {
      text: "Designed with care to meet modern needs without compromising on comfort.",
      name: "Jane Smith",
      date: "05/08/2010",
    },
    {
      text: "Thoughtfully crafted to deliver quality, performance, and reliability every day.",
      name: "Alex Brown",
      date: "19/12/2018",
    },
  ];

  let current = 0;

  const textEl = document.getElementById("tt-testimonial-text");
  const metaEl = document.querySelector(".tt-testimonial-meta");
  const nameEl = document.querySelector(".tt-testimonial-name");
  const dateEl = document.querySelector(".tt-testimonial-date");

  const dots = document.querySelectorAll(".tt-dot");
  const nextBtn = document.querySelector(".tt-testimonial-nav.tt-next");
  const prevBtn = document.querySelector(".tt-testimonial-nav.tt-prev");

  const swipeContainer = document.querySelector(".tt-testimonial-quote-wrap");

  function updateDots(index) {
    dots.forEach((d) => d.classList.remove("tt-active"));
    dots[index].classList.add("tt-active");
  }

  function fadeTo(index) {
    textEl.classList.add("tt-is-fading");
    metaEl.classList.add("tt-is-fading");

    setTimeout(() => {
      current = index;

      textEl.textContent = `"${testimonials[index].text}"`;
      nameEl.textContent = testimonials[index].name;
      dateEl.textContent = testimonials[index].date;

      updateDots(index);

      void textEl.offsetWidth;

      textEl.classList.remove("tt-is-fading");
      metaEl.classList.remove("tt-is-fading");
    }, 400);
  }

  function nextTestimonial() {
    fadeTo((current + 1) % testimonials.length);
  }

  function prevTestimonial() {
    fadeTo((current - 1 + testimonials.length) % testimonials.length);
  }

  // Buttons
  nextBtn?.addEventListener("click", nextTestimonial);
  prevBtn?.addEventListener("click", prevTestimonial);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      fadeTo(Number(dot.dataset.index));
    });
  });

  // Swipe Logic - Mobile/Tab Devices
  let startX = 0;
  let endX = 0;

  const swipeThreshold = 50; // PX

  swipeContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  swipeContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  // Trackpad / Mouse drag
  swipeContainer.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  swipeContainer.addEventListener("mouseup", (e) => {
    endX = e.clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) {
      nextTestimonial(); // Swipe left
    } else {
      prevTestimonial(); // Swipe right
    }
  }

  // Init
  fadeTo(0);
})();
