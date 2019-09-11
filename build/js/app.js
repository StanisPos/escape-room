'use strict';


// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');
//
// pageHeader.classList.remove('page-header--nojs');
//
// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });


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
      level: 'сложный',
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

  var questTemplate = document.querySelector('#quest-template').content.querySelector('.quest-item');

  if (questTemplate) {
    var questsFragment = document.createDocumentFragment();
    var questsContainer = document.querySelector('.quests-list');

    questsData.forEach(function (data) {
      var quest = questTemplate.cloneNode(true);

      if (data.isHit) {
        quest.classList.add('quest-item--hit');
      }

      quest.setAttribute('data-label', data.id);
      var questImg = quest.querySelector('img');
      questImg.src = 'img/cards/' + data.id + '@1x.png';
      questImg.srcset = 'img/cards/' + data.id + '@1x.png 1x, img/cards/' + data.id + '@1x.png 2x';
      questImg.alt = data.title;
      quest.querySelector('h3').textContent = data.title;
      quest.querySelector('.location').textContent = data.location;
      quest.querySelector('.persons').textContent = data.persons;
      quest.querySelector('.level').textContent = data.level;
      questsFragment.appendChild(quest);
    });

    questsContainer.appendChild(questsFragment);
  }
// Модальные окна

(function () {
  var ESC_KEYCODE = 27;

  var modalQuestion = document.querySelector('.modal--question');
  var nameInput = modalQuestion.querySelector('[name=name]');
  var emailInput = modalQuestion.querySelector('[name=email]');
  var agreementInput = modalQuestion.querySelector('[name=agreement]');
  var questionForm = modalQuestion.querySelector('form');
  var questionSubmitButton = modalQuestion.querySelector('[type=submit]');
  var mdTriggers = document.querySelectorAll('.md-trigger');
  var questionInputs = modalQuestion.querySelectorAll('.js-input');

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

  mdTriggers.forEach(function (el) {
    var modal = document.querySelector('.modal--' + el.getAttribute('data-modal'));
    var close = modal.querySelector('.md-close');

    function removeModal() {
      modal.classList.remove('modal--show', 'submit-focused');
      removeOverlay();
    }

    el.addEventListener('click', function (evt) {
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
  });


  if (modalQuestion) {
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
      var modal = document.querySelector('.modal--show');
      if (modal) {
        questionForm.classList.remove('submit-focused');
        modal.classList.remove('modal--show');
        removeOverlay();
      }
    }
  });
}());
