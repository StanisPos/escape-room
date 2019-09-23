'use strict';

// header

(function () {
  var pageHeader = document.querySelector('.header');
  var headerToggle = document.querySelector('.header__menu-toggle');
  var footer = document.querySelector('.footer');

  if (pageHeader) {
    pageHeader.classList.remove('header--nojs');

    headerToggle.addEventListener('click', function () {
      if (pageHeader.classList.contains('header--closed')) {
        pageHeader.classList.remove('header--closed');
        pageHeader.classList.add('header--opened');
        footer.classList.add('footer--fixed');

      } else {
        pageHeader.classList.add('header--closed');
        pageHeader.classList.remove('header--opened');
        footer.classList.remove('footer--fixed');
      }
    });
  }
}());

// Модальные окна

(function () {
  var ESC_KEYCODE = 27;

  var modalQuestion = document.querySelector('.modal--question');
  var mdTriggers = document.querySelectorAll('.md-trigger');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
  }

  var createOverlay = function () {
    var overlay = document.createElement('div');
    overlay.classList.add('modal__overlay');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function () {
      document.querySelector('.modal--show').classList.remove('modal--show');
      removeOverlay();
    });
    return overlay;
  };

  var removeOverlay = function () {
    document.querySelector('.modal__overlay').classList.remove('modal__overlay--show');
  };

  var overlay = createOverlay();

  for (var i = 0; i < mdTriggers.length; i++) {
    (function () {
      var modal = document.querySelector('.modal--' + mdTriggers[i].getAttribute('data-modal'));
      var close = modal.querySelector('.md-close');

      var removeModal = function () {
        modal.classList.remove('modal--show', 'submit-focused');
        removeOverlay();
      };

      mdTriggers[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        overlay.classList.add('modal__overlay--show');
        modal.classList.add('modal--show');
        overlay.addEventListener('click', removeModal);

        if (modal.classList.contains('.modal--question')) {
          if (storage) {
            nameInput.value = storage;
            emailInput.focus();
          } else {
            nameInput.focus();
          }
        }
      });

      close.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeModal();
      });
    }());
  }

  if (modalQuestion) {
    var nameInput = modalQuestion.querySelector('[name=name]');
    var emailInput = modalQuestion.querySelector('[name=email]');
    var agreementInput = modalQuestion.querySelector('[name=agreement]');
    var questionForm = modalQuestion.querySelector('form');
    var questionSubmitButton = modalQuestion.querySelector('[type=submit]');
    var questionInputs = modalQuestion.querySelectorAll('.js-input');

    agreementInput.addEventListener('input', function () {
      if (agreementInput.checked === true) {
        questionSubmitButton.removeAttribute('disabled');
      } else {
        questionSubmitButton.setAttribute('disabled', 'disabled');
      }
    });

    questionSubmitButton.addEventListener('click', function () {
      questionForm.classList.add('submit-focused');

      questionInputs.forEach(function (input) {
        input.addEventListener('invalid', function (evt) {
          evt.preventDefault();
        });
      });
    });

    questionForm.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', nameInput.value);
      }
      questionForm.classList.remove('submit-focused');
    });
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      var modalVisible = document.querySelector('.modal--show');
      if (modalVisible) {
        questionForm.classList.remove('submit-focused');
        modalVisible.classList.remove('modal--show');
        removeOverlay();
      }
    }
  });
}());

// Все квесты

var ALL_QUESTS = {
  SECRETS: {
    title: 'Тайны старого особняка',
    subtitle: 'приключение, детектив',
    time: '60',
    count: '2-5',
    complexity: 'легкий квест',
    description: 'Погрузитесь в атмосферу служебных помещений закулисья, которые хранят множество тайн и загадок. Вы окажитесь в старом особняке и увидите все, что скрывают его запутанные коридоры.',
    image: 'bg_secrets-mansion'
  },
  RITUAL: {
    title: 'Ритуал',
    subtitle: 'хоррор, мистика',
    time: '60',
    count: '3-5',
    complexity: 'высокая сложность',
    description: 'Тяжелый воздух угнетает, в ночи вы оказыватесь запертыми в сыром помещении вместе с другими ничего не понимающими жертвами. Сквозь щель в двери вы видите, как некто в капюшоне готовит площадку как будто для проведения мистического обряда. Удастся ли вам выбраться, пока вы не станете жертвой ритуала?',
    image: 'bg_ritual'
  },
  EXPERIMENT: {
    title: 'Фатальный эксперимент',
    subtitle: 'приключение, детектив',
    time: '90',
    count: '5-8',
    complexity: 'высокая сложность',
    description: 'Вы стоите на пороге нового научного открытия, которое перевернет судьбу человечества. Но что-то идёт не так, и ядерный реактор, который работает на полную мощность, сигнализирует о скорой поломке. Удастя ли вам починить его в отведенное время и предотвратить гибель людей в этом фатальном эксперименте?',
    image: 'bg_experiment'
  }
};

// Отрисовка квестов

(function () {
  var questsData = [
    {
      isHit: true,
      title: 'Склеп',
      location: 'пр. Ленина, 37',
      persons: '2-5',
      level: 'сложный',
      id: 'crypt'
    },
    {
      isHit: true,
      title: 'Маньяк',
      location: 'Верхнетецкая, 32',
      persons: '3-6',
      level: 'средний',
      id: 'maniac'
    },
    {
      isHit: false,
      title: 'Ритуал',
      location: 'пр. Ленина, 37',
      persons: '3-5',
      level: 'легкий',
      id: 'ritual'
    },
    {
      isHit: false,
      title: 'История призраков',
      location: 'Новослободская, 2а',
      persons: '5-6',
      level: 'легкий',
      id: 'history'
    },
    {
      isHit: false,
      title: 'Тайны старого особняка',
      location: 'пр. Ленина, 37',
      persons: '2-5',
      level: 'легкий',
      id: 'secrets'
    },
    {
      isHit: true,
      title: 'Хижина в лесу',
      location: 'Верхнетецкая, 32',
      persons: '4-7',
      level: 'средний',
      id: 'shed'
    },
    {
      isHit: true,
      title: 'Фатальный эксперимент',
      location: 'Верхнетецкая, 32',
      persons: '5-8',
      level: 'сложный',
      id: 'experiment'
    },
    {
      isHit: false,
      title: 'Метро 2033',
      location: 'Новослободская, 32',
      persons: '6-8',
      level: 'средний',
      id: 'metro'
    },
    {
      isHit: false,
      title: 'Старый чердак',
      location: 'Новослободская, 2а',
      persons: '2-3',
      level: 'легкий',
      id: 'attic'
    },
    {
      isHit: false,
      title: 'Последний рубеж',
      location: 'Верхнетецкая, 32',
      persons: '4-7',
      level: 'средний',
      id: 'frontier'
    },
    {
      isHit: false,
      title: 'Марс 2056',
      location: 'Ленина, 37',
      persons: '2-4',
      level: 'легкий',
      id: 'mars'
    }
  ];

  var isIE = function () {
    var ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  };

  var questTemplate = document.querySelector('#quest-template');

  if (questTemplate) {
    var questsFragment = document.createDocumentFragment();
    var questsContainer = document.querySelector('.quests-list');
    var questImg = null;
    var quest = null;

    for (var i = 0; i < questsData.length; i++) {
      if (isIE()) {
        quest = questTemplate.querySelector('.quest-item').cloneNode(true); // IE
      } else {
        quest = questTemplate.content.querySelector('.quest-item').cloneNode(true); // все нормальные браузеры
      }

      if (questsData[i].isHit) {
        quest.classList.add('quest-item--hit');
      }

      questImg = quest.querySelector('img');

      quest.setAttribute('data-label', questsData[i].id);
      questImg.src = 'img/cards/' + questsData[i].id + '@1x.png';
      questImg.setAttribute('srcset', 'img/cards/' + questsData[i].id + '@1x.png 1x, img/cards/' + questsData[i].id + '@2x.png 2x'); // setAttribute для IE
      questImg.alt = questsData[i].title;
      quest.querySelector('h3').textContent = questsData[i].title;
      quest.querySelector('.location').textContent = questsData[i].location;
      quest.querySelector('.persons').textContent = questsData[i].persons + ' чел';
      quest.querySelector('.level').textContent = questsData[i].level;
      questsFragment.appendChild(quest);
    }

    questsContainer.appendChild(questsFragment);
  }
}());

// Выбор квеста
(function () {
  var quests = document.querySelectorAll('.choose-quest__item');

  if (quests) {
    for (var i = 0; i < quests.length; i++) {
      quests[i].addEventListener('click', function () {
        var currentQuest = ALL_QUESTS[quests[i].dataset.label.toUpperCase()];
        localStorage.setItem('quest', JSON.stringify(currentQuest));
      });
    }
  }
})();

(function () {
  var PATH_TO_IMAGE = '../../img/photos/';
  var EXTENSION_IMAGE = '.jpg';

  var preloader = document.querySelector('.js-preloader');
  var currentQuest;

  if (localStorage) {
    var quest = localStorage.getItem('quest');

    if (quest && (quest !== 'undefined')) {
      currentQuest = JSON.parse(quest);

      var image = document.querySelector('.js-container');
      var questContainer = document.querySelector('.quest');
      if (questContainer) {
        var subtitle = questContainer.querySelector('.js-subtitle');
        var title = questContainer.querySelector('.js-title');
        var time = questContainer.querySelector('.js-time');
        var count = questContainer.querySelector('.js-count');
        var level = questContainer.querySelector('.js-level');
        var description = questContainer.querySelector('.js-description');

        title.textContent = currentQuest.title;
        subtitle.textContent = currentQuest.subtitle;
        time.textContent = currentQuest.time;
        count.textContent = currentQuest.count;
        description.textContent = currentQuest.description;
        level.textContent = currentQuest.complexity;

        image.style.backgroundImage = 'url(' + PATH_TO_IMAGE + currentQuest.image + EXTENSION_IMAGE + ')';
        image.style.backgroundSize = 'cover';
      }
    }

    window.addEventListener('load', function () {
      if (preloader) {
        preloader.style.display = 'none';
      }
    });
  } else {
    if (preloader) {
      preloader.style.display = 'none';
    }
  }
})();

// настройка выбора даты
(function () {
  var months = {
    'январь': 'января',
    'февраль': 'февраля',
    'март': 'марта',
    'апрель': 'апреля',
    'мая': 'мая',
    'июнь': 'июня',
    'июль': 'июля',
    'август': 'августа',
    'сентябрь': 'сентября',
    'октябрь': 'октября',
    'ноябрь': 'ноября',
    'декабрь': 'декабря'
  };

  var isIE = function () {
    var ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  };

  var inputLabel = document.querySelector('.order__date-chosen');

  if (inputLabel) {
    var inputDate = inputLabel.querySelector('#input-date');
    var inputText = inputLabel.querySelector('.order__date-text');

    if (isIE()) { // для IE
      inputLabel.classList.add('js-ie');
      inputDate.value = '';
      inputDate.setAttribute('placeholder', '22 сентября');
    } else { // для нормальных браузеров
      inputText.addEventListener('click', function () {
        inputDate.focus();
        inputDate.click();
      });

      inputDate.addEventListener('change', function () {
        var date = inputDate.valueAsDate.getDate();
        var month = months[inputDate.valueAsDate.toLocaleString('default', {month: 'long'})];
        var text = date + ' ' + month;
        inputText.innerText = text;
      });
    }
  }
}());

// курсор при выборе времени
(function () {
  var timeLabels = document.querySelectorAll('.order__time');

  if (timeLabels) {
    for (var i = 0; i < timeLabels.length; i++) {
      (function () {
        var timeLabel = timeLabels[i];
        timeLabel.addEventListener('mouseover', function () {

          var input = timeLabel.querySelector('input');
          if (input.hasAttribute('disabled')) {
            timeLabel.style.cursor = 'auto';
          } else {
            timeLabel.style.cursor = 'pointer';
          }
        });
      }());
    }
  }
}());
