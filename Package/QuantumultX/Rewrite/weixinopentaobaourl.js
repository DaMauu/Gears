/**
 * @江湖中人
 * https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi url script-response-body weixinopentaobaourl.js
 */

 // 在微信中点击淘宝链接，quanx会弹出通知，点击通知自动跳转到淘宝中打开(只测试了quanx)
 
var str = ($response.body);

str = str.match(/:&#x2f;&#x2f;(\S*)"}/)[1]
str = str.replace(/&#x2f;/g, '/');
str = str.replace(/&amp;/g, '&');
console.log(str);//结果bbbcccdddeee 

var option1={"open-url": "taobao://"}
	option1["open-url"]="taobao://"+str
	$notify(``, "","点击打开淘宝", option1);
console.log(option1["open-url"])

$done({body: $response.body});
