const carousel = document.querySelector(".carousel");
    const leftBtn = document.querySelector(".nav.left");
    const rightBtn = document.querySelector(".nav.right");

    leftBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
    });