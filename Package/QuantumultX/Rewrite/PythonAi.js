/*
#Python Ai解锁会员
#by-ios黑科技 
#https://apps.apple.com/cn/app/id1471351733

^http:\/\/ws\.60he\.com\/(book|user).+ url script-response-body pyai.js

[mitm]
hostname= ws.60he.com
*/



var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const bk = '/book';
const ur = '/user';

if (url.indexOf(bk) != -1) {
    obj.data.isFree = 1,
    body = JSON.stringify(obj);
} 
if (url.indexOf(ur) != -1) {
    obj.data.vip = 5201314,
    body = JSON.stringify(obj);
} 
$done({body});
