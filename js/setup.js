// Файл setup.js
'use strict';

// количество волшебников
var WIZARDS_QUANTITY = 4;

// данные для создания волшебников (имена, фамилии, цвета мантий и глаз)
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// keys
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// получение случайного элемент массива
var getArr = function (arr) {
  var arrElement = Math.floor(Math.random() * arr.length);
  return arr[arrElement];
};

// случайное true или false
var trueOrFalse = function () {
  return Math.random() < 0.5;
};

// генерация случайных имени и фамилии волшебника в случайном порядке: имя/фамилия или фамилия/имя
var getWizardName = function () {
  var name = getArr(WIZARD_NAMES);
  var surname = getArr(WIZARD_SURNAMES);
  var fullname = trueOrFalse() ? name + ' ' + surname : surname + ' ' + name;

  return fullname;
};

// создание массива волшебников
var wizards = [];

for (var i = 0; i < WIZARDS_QUANTITY; i++) {
  var newWizard = {
    name: getWizardName(),
    coatColor: getArr(WIZARD_COLOR),
    eyesColor: getArr(WIZARD_EYES)
  };

  wizards.push(newWizard);
}

// добавление персонажей на страницу
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// setup popup
var fieldInFocus = false;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  // запрет ESC-key, если поле ввода имени в фокусе
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

closePopup();

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменение цвета мантии персонажа по нажатию
var wizardCoat = document.querySelector('.wizard-coat');
var inputCoatColor = document.getElementsByName('coat-color');

var wizardEyes = document.querySelector('.wizard-eyes');
var inputEyesColor = document.getElementsByName('eyes-color');

var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputFireball = document.getElementsByName('fireball-color');

var coatClickHandler = function () {
  var coatParameter = getArr(WIZARD_COLOR);

  wizardCoat.style.cssText = 'fill: ' + coatParameter;
  inputCoatColor[0].value = coatParameter;
};

var eyesClickHandler = function () {
  var eyesParameter = getArr(WIZARD_EYES);

  wizardEyes.style.cssText = 'fill: ' + eyesParameter;
  inputEyesColor[0].value = eyesParameter;
};

var fireballClickHandler = function () {
  var fireballParameter = getArr(FIREBALL_COLOR);

  setupFireball.style.cssText = 'background-color: ' + fireballParameter;
  inputFireball[0].value = fireballParameter;
};

wizardCoat.addEventListener('click', coatClickHandler);
wizardEyes.addEventListener('click', eyesClickHandler);
setupFireball.addEventListener('click', fireballClickHandler);
