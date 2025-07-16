Fancybox.bind("[data-fancybox]", {
  on: {
    init: (fancybox, slide) => {
      if (
        !(
          fancybox.options.$trigger.href &&
          fancybox.options.$trigger.href.includes("assets/")
        )
      ) {
        fancybox.options.dragToClose = false;
        fancybox.options.ScrollLock = false;
        fancybox.options.autoFocus = false;
      }
      if (fancybox.options.$trigger.dataset.fancyboxClass) {
        fancybox.options.mainClass =
          fancybox.options.$trigger.dataset.fancyboxClass;
      }
    },
  },
});

/** форматирует 10000 в 10 000 и тр... */
const numFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/** анимация чисел */
const runNumber = (target, number, step = 50, delay = 100, format = false) => {
  let i = 0;
  let interval = setInterval(() => {
    if (number + step > i) {
      target.innerHTML = format ? numFormat(i) : i;
      i += step;
    } else {
      target.innerHTML = format ? numFormat(number) : number;
      clearInterval(interval);
    }
  }, delay);
};

/** спойлеры */
document.addEventListener(
  "click",
  (e) => {
    if (e.target.closest(".spoiler-title")) {
      e.target.closest(".spoiler").classList.toggle("is-open");
    }
  },
  true
);

/** для плавного раскрытия */
const accordions = [].map.call(
  document.querySelectorAll(".js-max-height, .spoiler-content"),
  (el) => el
);
["load", "resize"].map((event) =>
  window.addEventListener(event, () => {
    accordions.map((el) =>
      el.style.setProperty("--max-height", `${el.scrollHeight}px`)
    );
  })
);

/** $on */
const $on = function (event, target, callback) {
  document.addEventListener(
    event,
    (e) => {
      const el = e.target.closest(target);
      if (el) {
        e.preventDefault();
        callback(el);
      }
    },
    true
  );
};

/** Добавление в избранное */
const navbarFavorites = document.querySelector(".navbar__favorites");

const favoritesAnimation = () => {
  navbarFavorites.classList.add("_add");
  setTimeout(() => {
    navbarFavorites.classList.remove("_add");
  }, 1000);
};

const addInFavorites = (id, target) => {
  const favGetFromCoolies = Cookies.get("favorites");
  let favorites;

  if (favGetFromCoolies) {
    favorites = favGetFromCoolies.split(",");
  } else {
    favorites = [];
  }

  if (target.checked) {
    if (favorites.includes(String(id))) {
      console.log("Товар уже в избранном");
    } else {
      favorites.push(id);
      favorites = favorites.join(",");
      Cookies.set("favorites", favorites, { expires: 30 });
      favoritesAnimation();
    }
  } else {
    if (!favorites.includes(String(id))) {
      console.log("Удаляемый товар не найден в избранном");
    } else {
      favorites = favorites.filter((value) => Number(value) !== id);
      Cookies.set("favorites", favorites, { expires: 30 });
    }
  }

  // изменение иконки "избранное" в блоке navbar
  if (Cookies.get("favorites")) {
    navbarFavorites.classList.remove("_empty");
  } else {
    navbarFavorites.classList.add("_empty");
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var input_tel = document.querySelectorAll(".input[type=tel]"); 
  input_tel.forEach((element) => {
        element.addEventListener("input", mask);
        element.addEventListener("focus", mask);
        element.addEventListener("blur", mask);
  })    

  /***/
  function mask(event) {
    var blank = "+_ (___) ___-__-__";
    
    var i = 0;
    var val = this.value.replace(/\D/g, "").replace(/^\d/, "7"); // <---
    
    this.value = blank.replace(/./g, function(char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);
      
      return i >= val.length ? "" : char;
    });
    
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else {
      setCursorPosition(this, this.value.length);
    }
  };
  
  /***/
  function setCursorPosition(elem, pos) {
    elem.focus();
    
    if (elem.setSelectionRange) {    
      elem.setSelectionRange(pos, pos);
      return;
    }
    
    if (elem.createTextRange) {    
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();      
      return;
    }
  }
});

document.body.addEventListener('focusout', function(event) {
    if (event.target.matches('.input[type=tel]')) {
        var g = event.target.value.length;
        var form = event.target.closest('form');
        if (g != 18) {
            form.querySelector('.tel-error').style.display = 'block';
            form.querySelector('button').disabled = true;
        } else {
            form.querySelector('button').disabled = false;
            form.querySelector('.tel-error').style.display = 'none';
        }
    }
});


window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.header');

  // Получаем координаты конца нужного блока
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

  if (window.scrollY > heroBottom) {
    navbar.classList.add('sticky');
  } else if (navbar.classList.contains('mp')) {
    navbar.classList.remove('sticky');
  }
});