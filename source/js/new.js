(function () {
  var PATH_TO_IMAGE = '../../img/photos/';
  var EXTENSION_IMAGE = '.jpg';

  var preloader = document.querySelector('.js-preloader');
  var quest = localStorage.getItem('quest');
  var currentQuest;
  if (quest !== 'undefined') {
    currentQuest = JSON.parse(quest);

    var image = document.querySelector('.js-container');
    var questContainer = document.querySelector('.quest');
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

    window.addEventListener('load', function () {
      preloader.style.display = 'none';
    });
  } else {
    preloader.style.display = 'none';
  }
})();
