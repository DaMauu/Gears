/***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
***/

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
const paran = ["IP", "ISP", "地区", "城市"];
var ipv4Info = "";

// 请求 IPv4 地理位置信息
$task.fetch(myRequestV4).then(responseV4 => {
  ipv4Info = responseV4 ? json2info(responseV4.body, paras) : "";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    const ipv6Info = responseV6 ? json2info(responseV6.body, paras) : "";
    // 合并 IPv4 和 IPv6 信息并显示
    message = ipv4Info + "</br>" + ipv6Info;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    ipv6Info = "</br></br>🛑 IPv6 查询超时";
    ipv6Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv6Info + `</p>`;
    // 只显示 IPv4 信息
    message = ipv4Info + "</br>" + ipv6Info;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
}, reason => {
  ipv4Info = "</br></br>🛑 IPv4 查询超时";
  ipv4Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv4Info + `</p>`;
  // 只显示 IPv6 信息
  $task.fetch(myRequestV6).then(responseV6 => {
    const ipv6Info = responseV6 ? json2info(responseV6.body, paras) : "";
    message = ipv4Info + "</br>" + ipv6Info;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    ipv6Info = "</br></br>🛑 IPv6 查询超时";
    ipv6Info = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + ipv6Info + `</p>`;
    // 都查询超时
    message = "<p style=\"text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;\">IPv4 查询超时</p>" + "<p style=\"text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;\">IPv6 查询超时</p>";
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
});

function json2info(cnt, paras) {
  var res = "";
  cnt = JSON.parse(cnt);
  for (i = 0; i < paras.length; i++) {
    cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
    res = cnt[paras[i]] ? res + "</br><b>" + "<font  color=>" + paran[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res;
  }
  res = res + "</br>" + "<font color=#6959CD>" + "<b>节点</b> ➟ " + $environment.params + "</font>";
  res = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`;
  return res;
}

var flags = new Map([["AC", "🇦🇨"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AI", "🇦🇮"], ["AL", "🇦🇱"], ["AM", "🇦🇲"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"], ["AT", "🇦🇹"], ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"], ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"], ["BH", "🇧🇭"], ["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"], ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"], /* and so on... */ ]);
