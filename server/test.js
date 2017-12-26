var fs = require('fs');
var Thenjs = require('thenjs');
var Url = "";
var Type = new Object();
function testDecode(type,id,skuId){
    var data = Object();
    Thenjs(function(cont){
        typeJudgement(type,id,skuId);
      })
    .then(function(cont){
        data = capture(Url,Type.image,Type.price,Type.titles);
    })
    .then(function(cont){
        console.log("3");
        return JSON.stringify(data);
    })
    .fail(function(cont,error){
      console.log(error);
      console.log("END!");
    })
}
/*
* 判断类型 待Promise化
*/
function typeJudgement(type,id,skuId){
  var conf = fs.readdirSync('config');
  for(var i=0;i<conf.length;i++){
    if(type == conf[i].split(".")[0]){
      var config = fs.readFileSync('config/'+conf[i]);//返回JSON
      Type = JSON.parse(config);//JSON转对象
      break;
    }
  }
  if(skuId != null){//如果有不同商品的商品选项
    Url = Type.url + id + '&skuId=' + skuId;
  }
  else{
    Url = Type.url + id;
  }
  if(type == 'jd'){
    Url = Type.url+id+'.html';
  }
}
function capture(url,img,price,title) {
  var data = new Object();
  var spawn = require('child_process').spawn;
  var exec = require('child_process').exec;
  ls = exec('casperjs casper.js --url='+url+' --img='+img+' --price='+price+' --title='+title,function(e,out){
    data = JSON.parse(out);
    return data;
  });
}
module.exports = {
  testDecode:testDecode,
}
