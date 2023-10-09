/***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
  
  @XIAO_KOP

  **/

// var content= <p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold"> + response.body + </p>;

var urlV4 = "https://api-ipv4.ip.sb/geoip";
var urlV6 = "https://api-ipv6.ip.sb/geoip";
var opts = {
  policy: $environment.params
};
var myRequestV4 = {
  url: urlV4,
  opts: opts,
  timeout: 4000
};
var myRequestV6 = {
  url: urlV6,
  opts: opts,
  timeout: 4000
};

var message = "";
const paras = ["ip", "isp", "country_code", "city"];
const paran = ["IPV4", "ISP", "地区", "城市"];
const param = ["IPV6", "ISP", "地区", "城市"];
var ipv4Info = "";
var ipv6Info = "";

// 请求 IPv4 地理位置信息
$task.fetch(myRequestV4).then(responseV4 => {
  ipv4Info = responseV4 ? json2info(responseV4.body, paras) : "";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    ipv6Info = responseV6 ? json1info(responseV6.body, paras) : "";
    // 合并 IPv4 和 IPv6 信息并显示
    message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">IP查询结果</p>` + ipv4Info + ipv6Info;
    $done({ "htmlMessage": message });
  }, reason => {
    ipv6Info = "</br></br>🛑 IPv6 查询超时";
    ipv6Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv6Info + `</p>`;
    // 只显示 IPv4 信息
    message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">IP查询结果</p>` + ipv4Info;
    $done({ "htmlMessage": message });
  });
}, reason => {
  ipv4Info = "</br></br>🛑 IPv4 查询超时";
  ipv4Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv4Info + `</p>`;
  // 只显示 IPv6 信息
  $task.fetch(myRequestV6).then(responseV6 => {
    ipv6Info = responseV6 ? json2info(responseV6.body, paras) : "";
    message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">IP查询结果</p>` + ipv6Info;
    $done({ "htmlMessage": message });
  }, reason => {
    ipv6Info = "</br></br>🛑 IPv6 查询超时";
    ipv6Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv6Info + `</p>`;
    // 都查询超时
    message = "<p style=\"text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;\">IP查询超时</p>" + "<p style=\"text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;\">IPv6 查询超时</p>";
    $done({ "htmlMessage": message });
  });
});

function json2info(cnt, paras) {
  var res = "------------------------------";
  cnt = JSON.parse(cnt);
  for (i = 0; i < paras.length; i++) {
    cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
    res = cnt[paras[i]] ? res + "</br><b>" + "<font  color=>" + paran[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res;
  }
  res = res + "<font color=#6959CD>" + "<b>节点</b> ➟ " + $environment.params + "</font>";
  res = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`;
  return res;
}
function json1info(cnt, paras) {
  var res = "------------------------------";
  cnt = JSON.parse(cnt);
  i = 0;
    cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
    res = cnt[paras[i]] ? res + "</br><b>" + "<font  color=>" + param[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res;
    res = res.replace("IPV6", "IPV4 ➟ IPV6");
  return res;
}

var flags = new Map([[ "AC" , "🇦🇨" ] ,["AE","🇦🇪"], [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ] , [ "BD" ,
