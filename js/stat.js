'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40; // ширина столба гистограммы
var BAR_INTERVAL = 50; // расстояние межту столбцами гистограммы
var BARCHART_HEIGHT = 150; // высота гистограммы

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(times);
  // console.log('Максимальное значение в гистограмме: ' + maxTime);

  for (var i = 0; i < players.length; i++) {

    var BAR_HEIGHT = Math.floor(BARCHART_HEIGHT * times[i] / maxTime); // расчёт высоты столбца гистограммы текущего игрока
    var BAR_XPOINT = CLOUD_X + GAP * 4 + ((BAR_WIDTH + BAR_INTERVAL) * i); // положение текущего столбца и подписи гистограммы по оси X
    var BAR_YPOINT = CLOUD_Y + CLOUD_HEIGHT - (GAP * 3) - BAR_HEIGHT; // положение верхнего левого угла гистограммы по оси Y
    var PLAYER_TIME = Math.floor(times[i]); // показатель времени прохождения игры текущим игроком

    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], BAR_XPOINT, CLOUD_Y + CLOUD_HEIGHT - GAP * 2.5);
    ctx.fillText(PLAYER_TIME, BAR_XPOINT, CLOUD_Y + CLOUD_HEIGHT - BAR_HEIGHT - GAP * 5);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsla(235, ' + Math.random() * 100 + '%, 29%, 1)';
    }

    ctx.fillRect(BAR_XPOINT, BAR_YPOINT, BAR_WIDTH, BAR_HEIGHT);

    // console.log('Игрок ' + players[i] + ' справился с задачей за ' + PLAYER_TIME / 1000 + ' секунд. Высота столбца гистограммы: ' + BAR_HEIGHT + 'px');
  }
};
