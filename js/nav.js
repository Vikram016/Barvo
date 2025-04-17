
(() => {
    const openNav = document.querySelector(".open-menu"),
      closeNav = document.querySelector(".close-menu"),
      navMenu = document.querySelector(".nav-links-container"),
      mediaSize = 992;
  
    openNav.addEventListener("click", toggleMenu);
    closeNav.addEventListener("click", toggleMenu);
  
    function toggleMenu() {
      navMenu.classList.toggle("open");
    }
  
    navMenu.addEventListener("click", (event) => {
      let dropdownMenuBranch;
  
      if (event.target.hasAttribute("data-toggle") && window.innerWidth < mediaSize) {
        event.preventDefault();
        dropdownMenuBranch = event.target.parentElement;
      } else {
        return;
      }
  
      if (dropdownMenuBranch.classList.contains("active")) {
        collapseDropdownMenu();
      } else {
        if (navMenu.querySelector(".dropdown-menu-branch.active")) {
          collapseDropdownMenu();
        }
  
        const dropdownMenu = dropdownMenuBranch.querySelector(".dropdown-menu");
        dropdownMenuBranch.classList.add("active");
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
      }
    });
  
    function collapseDropdownMenu() {
      const activeBranch = navMenu.querySelector(".dropdown-menu-branch.active");
      if (!activeBranch) return;
  
      const dropdown = activeBranch.querySelector(".dropdown-menu");
      if (dropdown) dropdown.removeAttribute("style");
  
      activeBranch.classList.remove("active");
    }
  })();
  