var ws = new WebSocket('ws://10.130.226.220:8081/hereIsWS');
// 响应onmessage事件:
ws.onmessage = function (msg) { 
  //- console.log('3333',msg.data);
  var resJson = JSON.parse(msg.data);
  //- console.log('222',resJson);
  $("#message").html(resJson.commentD);
  $("#label_sel").val(resJson.label);
  $("#category_sel").val(resJson.category);

  };
// 给服务器发送一个字符串:
ws.addEventListener('open', function () {
let msg = '我是客户端';
//- ws.send(msg)
});  

$(document).ready(function(){
    res=$.ajax({url:`/findIsVisible`,async:false});
    var sres = res.responseJSON.isVisible;
    var isHidde = "";
    switch(sres){
      case 'no':
        isHidde = "inline";
      break;
      default:
        isHidde = "none";
      break;
    }
    $("#analyis-section").css("display",isHidde)


  $("a[id^=comment]").click(function(){
    var comment = this.name
    res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
    $("#message").html(res.responseJSON.commentD);
    $("#label_sel").val(res.responseJSON.label);
    $("#category_sel").val(res.responseJSON.category);
    ws.send(comment);
  });

  $("[id=comment_switch]").click(function(){
    res=$.ajax({url:`/commentswitch`,async:false});
    var sres = res.responseJSON.commentstatus;
    $("#comment_switch").html(sres);

    var isHidde = "";
    switch(sres){
      case 'comment visible':
        isHidde = "inline";
      break;
      default:
        isHidde = "none";
      break;
    }
    $("#analyis-section").css("display",isHidde)
    //- if( status=='ok'){
    //-   $("#analyis-section").css("visibility","visible")
    //- }else{
    //-   $("#analyis-section").css("visibility","hidden")
    //- }
    

  });
});