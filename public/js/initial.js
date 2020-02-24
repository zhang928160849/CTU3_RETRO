const chars = ['SHARE','RETRO','MANAGE','ENJOY']
var num = 0;


var headeChange = function () {
  var m = chars[num];
  $(".head-span").html(chars[num]);
  if(num == 3){
    num = 0;
  }else{
    num = num+1;
  }
}

this.setInterval(headeChange,2000);