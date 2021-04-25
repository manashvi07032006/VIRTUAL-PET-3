class Food{
    constructor(){
        this.foodStock = 0
        this.lastFed;
        this.image = loadImage('Images/Milk.png');       
    }
    updateFoodStock(foodStock){
    this.foodStock = foodStock;
    } 
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1;
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    bedroom(){
        background(bedroomIMG, 250, 250);
    }
    garden(){
        background(gardenIMG, 250, 250);
    }
    washroom(){
        background(washroomIMG, 250, 250);
    }

    display(){
      var x=80,y=10;            
      if(this.foodStock>0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10===0){
            x=80;
            y=y+70;
          }
          image(this.image,x,y,70,70);
          x=x+35;
            }
        }
    }
}