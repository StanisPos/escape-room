'use strict';

var ESC_KEYCODE = 27;
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


// Модальные окна

var modalCity = document.querySelector('.modal--city');
var modalQuestion = document.querySelector('.modal--question');
var nameInput = modalQuestion.querySelector('[name=name]');
var emailInput = modalQuestion.querySelector('[name=email]');
var questionInput = modalQuestion.querySelector('[name=question]');
var agreementInput = modalQuestion.querySelector('[name=agreement]');
var questionForm = modalQuestion.querySelector('form');

var nameTip = modalQuestion.querySelector('.modal__tip--name');
var emailTip = modalQuestion.querySelector('.modal__tip--email');

var questionSubmitButton = modalQuestion.querySelector('[type=submit]');

var isStorageSupport = true;
var storage = '';

var mdTriggers = document.querySelectorAll('.md-trigger');

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

// var closeModal = function () {
//   document.querySelector('.modal--show').classList.remove('modal--show');
//   removeOverlay();
// };

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

  nameInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    if (nameInput.value.length > 0) {
      if (!nameTip.classList.contains('visible')) {
        nameTip.classList.add('visible');
      }
    } else {
      nameTip.classList.remove('visible');
    }
  });

  emailInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    if (emailInput.value.length > 0) {
      if (!emailTip.classList.contains('visible')) {
        emailTip.classList.add('visible');
      }
    } else {
      emailTip.classList.remove('visible');
    }
  });

  questionSubmitButton.addEventListener('click', function () {
    nameInput.addEventListener('invalid', function (evt) {
      evt.preventDefault();
      questionForm.classList.add('submit-focused');
    });

    emailInput.addEventListener('invalid', function (evt) {
      evt.preventDefault();
    });

    questionInput.addEventListener('invalid', function (evt) {
      evt.preventDefault();
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
