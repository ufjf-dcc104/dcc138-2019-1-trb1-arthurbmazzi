var Sprite = function(sourceX, sourceY, width, height,x, y){
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
}

//PONTOS CENTRAIS DE INÍCIO
Sprite.prototype.centerX = function(){
    return this.x + (this.width/2);
}
Sprite.prototype.centerY = function(){
    return this.y + (this.height/2);
}
Sprite.prototype.halfWidth = function(){
    return this.width/2;
}
Sprite.prototype.halfHeight = function(){
    return this.height/2;
}

var inimigo = function(sourceX, sourceY, width, height,x,y){
    Sprite.call(this, sourceX, sourceY, width, height,x,y);
    this.normal = 1;
    this.explodiu = 2;
    this.state = this.normal;
}
inimigo.prototype = Object.create(Sprite.prototype);
inimigo.prototype.explodiu = function(){
    this.sourceX = 80;
    this.width = this.height = 56;
}