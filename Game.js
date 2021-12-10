class Game {
  constructor(){
    this.title = createElement('h2')
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();

      } else {
        playerCount = 0;
      }
      form = new Form()
      form.display(playerCount);
    }

    amg1 = createSprite(100,200);
    amg1.scale = 0.4;
    amg2 = createSprite(300,200);
    amg2.scale = 0.5;
    amg3 = createSprite(500,200);
    amg3.scale = 0.3;
    amg4 = createSprite(700,200);
    amg4.scale = 0.3;
    amg1.addImage(amg1Img);
    amg2.addImage(amg2Img);
    amg3.addImage(amg3Img);
    amg4.addImage(amg4Img);
    amigos = [amg1, amg2, amg3, amg4];
    YouWin = createSprite(350,350,700,700);
    YouWin.addImage(YouWinImg);
    YouWin.visible = false;
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getAmgsNofim();
    if(allPlayers !== undefined){
      background(0);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;

      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;

        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        amigos[index-1].x = x;
        amigos[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60)
          amigos[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = amigos[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateAmg(player.rank);
      YouWin.visible = true;
    }
    drawSprites();
  }
  end(){
    console.log('😭 The end 😭')
    console.log(player.rank)
  }
}
// paitoun
// ehehehehehehehehehehehehehe