"use strict";

/**
 * @todo показ. валидацию только если button[type=submit]
 */

const Forms = {
  init() {
    document.body.addEventListener("htmx:beforeRequest", (e) => {
      // рекапча
      // const classes = e.detail.target.classList;
      // if (!classes.contains('js-form')) return;
      // console.log(e.detail);
      // this.recaptcha.isOn() && this.recaptcha.run(e);
    });

    document.addEventListener("input", (e) => {
      // email с маленькой буквы
      if (e.target.tagName == "INPUT" && e.target.type == "email") {
        e.target.value = e.target.value.toString().toLowerCase();
      }
    });

    document.addEventListener(
      "blur",
      (e) => {
        if (e.target.closest(".field")) {
          e.target.closest(".field").classList.add("show-validation");
        }
      },
      true
    );

    document.addEventListener(
      "click",
      (e) => {
        if (e.target.closest("[type=submit]") && e.target.closest("form")) {
          e.target.closest("form").classList.add("show-validation");
        }
      },
      true
    );

    this.mask();

    document.body.addEventListener("htmx:afterSettle", (e) => {
      this.mask();
    });
  },

  mask() {
    if (window.Maska) {
      Maska.create("[type=tel]", {
        mask: "+7 (###) ###-##-##",
        preprocessor: (value) => (value == "8" ? "+7" : value),
      });
      document
        .querySelectorAll("[type=tel]")
        .forEach((el) => (el.pattern = ".{18}"));
    }
  },

  ga(target, params = { event_category: "form" }) {
    window.gtag && gtag("event", target, params);
  },

  metrika(target) {
    if (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) {
      const ym = Ya.Metrika || Ya.Metrika2;
      const counters = ym.counters() || [];
      for (let i of counters) {
        const counter = window[`yaCounter${i.id}`];
        counter && counter.reachGoal(target);
      }
    }
  },

  // recaptcha: {
  //     token: false,

  //     run(e) {
  //         if (!this.token) {
  //             e.preventDefault();
  //             this.execute()
  //                 .then((token) => {
  //                     this.token = token;
  //                     console.log(token);
  //                     htmx.trigger(e.detail.target, 'submit');
  //                 })
  //         } else {
  //             e.detail.requestConfig.parameters.token = this.token;
  //             this.token = false;
  //         }
  //     },

  //     isOn() {
  //         return false;
  //     },

  //     execute() {
  //         return new Promise((resolve, reject) => {
  //             setTimeout(() => {
  //                 resolve(12345);
  //             }, 500);
  //         });
  //     },
  // },
};

Forms.init();

// var s = document.createElement('script');
// s.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=6Lf3VZUUAAAAAG34Gk5v1ZimWIULdfOBetgoqDaX');
// document.body.appendChild(s);
