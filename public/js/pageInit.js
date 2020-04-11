// var ws = new WebSocket('ws://10.130.226.220:8081/hereIsWS');
// 响应onmessage事件:
// ws.onmessage = function (msg) { 
//   //- console.log('3333',msg.data);
//   var resJson = JSON.parse(msg.data);
//   //- console.log('222',resJson);
//   $("#message").html(resJson.commentD);
//   $("#label_sel").val(resJson.label);
//   $("#category_sel").val(resJson.category);

//   };
// // 给服务器发送一个字符串:
// ws.addEventListener('open', function () {
// let msg = '我是客户端';
// //- ws.send(msg)
// });  

// var commentDetail = function () {
//   var comment = this.name;
//   res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
//   $("#message").html(res.responseJSON.commentD);
//   $("#label_sel").val(res.responseJSON.label);
//   $("#category_sel").val(res.responseJSON.category);
// }



$(document).ready(function () {

  res = $.ajax({ url: `/findIsVisible`, async: false });
  var sres = res.responseJSON.isVisible;
  var isHidde = "";
  switch (sres) {
    case 'no':
      isHidde = "inline";
      break;
    default:
      isHidde = "none";
      break;
  }
  $("#analyis-section").css("display", isHidde)

  $("a[id^=comment]").click(function () {
    var comment = this.name;
    res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
    $("#message").html(res.responseJSON.commentD);
    $("#label_sel").val(res.responseJSON.label);
    $("#category_sel").val(res.responseJSON.category);
  });

  // change the analysis
  $("#improve_releases").change(function () {
    res = $.ajax({ url: `/analysis?release=${this.value}&category=mid`, async: false });

    $("[help_id='comment_improve_list']").remove();
    for (item of res.responseJSON.analysisItem) {
      console.log(item);
      $("#comment_improve_b").append(`<li help_id='comment_improve_list'> <a id='comment_improve_list' name='${item.comment}' href='#makecomment' onclick='commentDetail()'>${item.commentD.slice(0, 25)}... </a> `)
      $("#comment_improve_b").append("</li>")
    }

    $("#commet_improve_no").html(res.responseJSON.analysisItem.length);
    $("a[id^=comment]").click(function () {
      var comment = this.name;
      res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
      $("#message").html(res.responseJSON.commentD);
      $("#label_sel").val(res.responseJSON.label);
      $("#category_sel").val(res.responseJSON.category);
    });
  });

  $("#good_releases").change(function () {
    res = $.ajax({ url: `/analysis?release=${this.value}&category=good`, async: false });

    $("[help_id='comment_good_list']").remove();
    for (item of res.responseJSON.analysisItem) {
      console.log(item);
      $("#comment_good_b").append(`<li help_id='comment_good_list'> <a id='comment_good_list' name='${item.comment}' href='#makecomment' onclick='commentDetail'>${item.commentD.slice(0, 25)}... </a> `)
      $("#comment_good_b").append("</li>")
    }
    $("#commet_good_no").html(res.responseJSON.analysisItem.length);
    $("a[id^=comment]").click(function () {
      var comment = this.name;
      res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
      $("#message").html(res.responseJSON.commentD);
      $("#label_sel").val(res.responseJSON.label);
      $("#category_sel").val(res.responseJSON.category);
    });
  });

  $("#bad_releases").change(function () {
    res = $.ajax({ url: `/analysis?release=${this.value}&category=bad`, async: false });

    $("[help_id='comment_bad_list']").remove();
    for (item of res.responseJSON.analysisItem) {
      console.log(item);
      $("#comment_bad_b").append(`<li help_id='comment_bad_list'> <a id='comment_bad_list' name='${item.comment}' href='#makecomment' onclick='commentDetail'>${item.commentD.slice(0, 25)}... </a> `)
      $("#comment_bad_b").append("</li>")
    }
    $("#commet_bad_no").html(res.responseJSON.analysisItem.length);
    $("a[id^=comment]").click(function () {
      var comment = this.name;
      res=$.ajax({url:`/commentdetail?comment=${comment}`,async:false});
      $("#message").html(res.responseJSON.commentD);
      $("#label_sel").val(res.responseJSON.label);
      $("#category_sel").val(res.responseJSON.category);
    });
  });



  // fetch comments to display
  $("[id=comment_switch]").click(function () {
    res = $.ajax({ url: `/commentswitch`, async: false });
    var sres = res.responseJSON.commentstatus;
    $("#comment_switch").html(sres);

    var isHidde = "";
    switch (sres) {
      case 'comment visible':
        isHidde = "inline";
        break;
      default:
        isHidde = "none";
        break;
    }
    $("#analyis-section").css("display", isHidde)
    //- if( status=='ok'){
    //-   $("#analyis-section").css("visibility","visible")
    //- }else{
    //-   $("#analyis-section").css("visibility","hidden")
    //- }


  });






});