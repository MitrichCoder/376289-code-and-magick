// Файл setup.js
'use strict';

// количество волшебников
var WIZARDS_QUANTITY = 4;

// данные для создания волшебников (имена, фамилии, цвета мантий и глаз)
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

// генерация случайных имени и фамилии волшебника в случайном порядке: имя/фамилия или фамилия/имя
var getWizardName = function () {
  var name = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)];
  var surname = WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
  var nameOrder = Math.floor(Math.random() * 2);
  var fullname;

  if (nameOrder === 1) {
    fullname = name + ' ' + surname;
  } else {
    fullname = surname + ' ' + name;
  }

  return fullname;
  // console.log(nameOrder, fullname);
};

// генерация случайного цвета мантии волшебника
var getWizardCoat = function () {
  var coatColor = WIZARD_COLOR[Math.floor(Math.random() * WIZARD_COLOR.length)];
  return coatColor;
  // console.log(color);
};

// генерация случайного цвета глаз волшебника
var getWizardEyes = function () {
  var eyesColor = WIZARD_EYES[Math.floor(Math.random() * WIZARD_EYES.length)];
  return eyesColor;
  // console.log(eyesColor);
};

// создание массива волшебников
var wizards = [];

for (var i = 0; i < WIZARDS_QUANTITY; i++) {
  var newWizard = {
    name: getWizardName(),
    coatColor: getWizardCoat(),
    eyesColor: getWizardEyes()
  };

  wizards.push(newWizard);
}

// console.log(wizards);

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
