var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var YouWin,YouWinImg;
var amigos, amg1, amg2, amg3, amg4;
var amg1Img, amg2Img, amg3Img, amg4Img;
var track;

function preload(){
  amg1Img = loadImage("homem.png");
  amg2Img = loadImage("homem1.png");
  amg3Img = loadImage("homem2.png");
  amg4Img = loadImage("homem3.png");
  track = loadImage("track.jpg");
  YouWinImg = loadImage("you win.jpg")
}

function setup(){
  canvas = createCanvas(700,700);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
