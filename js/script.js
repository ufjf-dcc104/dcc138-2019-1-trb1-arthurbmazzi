
(function (){
    var a = document.querySelector('canvas');
    var b = a.getContext('2d');

    //Funções

    var sprites = [];
    var assetsToLoad = [];
    var tiros = [];
    var inimigos = [];

    var background = new Sprite(0,56,400,500,0,0);
	sprites.push(background);

    var defender = new Sprite(0,0,30,50,185,450);
    sprites.push(defender);

    var img = new Image();
	img.addEventListener('load',loadHandler,false);
	img.src = "img/img.png";
	assetsToLoad.push(img);

    var enemies = 100;
    var timer = 0;
    var loadedAssets = 0;
    
    //Variáveis
    var esq = 37, dir = 39, enter = 13, space = 32;
    var mesq =false;
    var mdir =false;
    var shoot = false;
    var spaceIsDown = false;

    //Estados do jogo
    var loading = 0, jogando = 1, pause = 2, gg = 3;
    var padrao = loading;

    //teclas
    window.addEventListener('keydown', function(e){
        var key = e.keyCode;
        switch(key){
            case esq:
                mesq = true;
                break;
            case dir:
                mdir = true;
                break;
            case space:
                if(!spaceIsDown)
                { 
                    shoot = true;
                    spaceIsDown = true;
                }
                break;

        }
    }, false);
    window.addEventListener('keyup', function(e){
        var key = e.keyCode;
        switch(key){
            case esq:
                mesq = false;
                break;
            case dir:
                mdir = false;
                break;
            case enter:
                if(padrao != jogando){
                    padrao = jogando;
                }
                else{
                    padrao = pause;
                }
                break;
            case space:
                spaceIsDown = false;
        }               
    }, false);

function loadHandler(){
    loadedAssets++;
    if(loadedAssets == assetsToLoad.length){
        img.removeEventListener('load', loadHandler, false);
        padrao = pause;
    }
}
function loop(){
    requestAnimationFrame(loop, a);
    switch(padrao){
        case loading:
            console.log('Loading...');
            break;
        case jogando:
            update();
            break;
    }
    render();
}

function update(){
    if(mesq && !mdir)
    {
        defender.vx = -5;
    }
    if(mdir && !mesq)
    {
        defender.vx = 5
    }
    if(!mdir && !mesq)
    {
        defender.vx = 0;
    }
    if(shoot)
    {
        fire();
        shoot = false;
    }
    defender.x = Math.max(0, Math.min(a.width - defender.width, defender.x + defender.vx));
    for(var i in tiros)
    {
        var tiro1 = tiros[i];
        tiro1.y += tiro1.vy;
        if(tiro1.y < -tiro1.height)
        {
            remove(tiro1, tiros);
            remove(tiro1, sprites);
            i--;
        }

    }
    timer++; 
    if(timer = enemies){
        criaInimigo();
        timer=0;
    if(enemies > 2) enemies--;
    }
    for(var i in inimigos)
}
function remove(objectToRemove, vetor)
{
    var i = vetor.indexOf(objectToRemove);
    if(i != -1)
    {
        vetor.splice(i, 1);
    }
}

function fire(){
    var tiro = new Sprite(136,12, 8, 13, defender.centerX() - 4,
        defender.y - 13);
    tiro.vy = -8;
    sprites.push(tiro);
    tiros.push(tiro);
}

function criaInimigo(){
    var random = (Math.floor(Math.random() * 8) * 50)
    var c = new inimigo(30,0,50,50,random,-50);
    c.vy = 1; 
    sprites.push(c);
    inimigos.push(c);
}

function render(){
    b.clearRect(0,0,a.width,a.height);
    if(sprites.length !== 0){
        for(var i in sprites){
            var spr = sprites[i];
            b.drawImage(img,spr.sourceX,spr.sourceY,spr.width,spr.height,Math.floor(spr.x),Math.floor(spr.y),spr.width,spr.height);
        }
    }
}
loop();


}());