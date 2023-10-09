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

// 请求 IPv4 地理位置信息
$task.fetch(myRequestV4).then(responseV4 => {
  const ipv4Info = responseV4 ? json2info(responseV4.body, paras) : "IPv4 查询失败";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    const ipv6Info = responseV6 ? json2info(responseV6.body, paras) : "IPv6 查询失败";
    // 合并 IPv4 和 IPv6 信息并显示
    message = `IP 查询结果
------------------------------
IPv4: ${ipv4Info}
IPv6: ${ipv6Info}
------------------------------
节点 ➟ 国旗+节点名字`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    // IPv6 查询超时或失败
    const ipv6Info = "IPv6 查询超时或失败";
    message = `IP 查询结果
------------------------------
IPv4: ${ipv4Info}
IPv6: ${ipv6Info}
------------------------------
节点 ➟ 国旗+节点名字`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
}, reason => {
  // IPv4 查询超时或失败
  const ipv4Info = "IPv4 查询超时或失败";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    const ipv6Info = responseV6 ? json2info(responseV6.body, paras) : "IPv6 查询失败";
    message = `IP 查询结果
------------------------------
IPv4: ${ipv4Info}
IPv6: ${ipv6Info}
------------------------------
节点 ➟ 国旗+节点名字`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    // IPv6 查询超时或失败
    const ipv6Info = "IPv6 查询超时或失败";
    message = `IP 查询结果
------------------------------
IPv4: ${ipv4Info}
IPv6: ${ipv6Info}
------------------------------
节点 ➟ 国旗+节点名字`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
});

function json2info(cnt, paras) {
  cnt = JSON.parse(cnt);
  var res = "";
  for (i = 0; i < paras.length; i++) {
    cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
    res += `${paras[i]}: ${cnt[paras[i]]}\n`;
  }
  return res;
}

var flags = new Map([["AC", "🇦🇨"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AI", "🇦🇮"], ["AL", "🇦🇱"], ["AM", "🇦🇲"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"], ["AT", "🇦🇹"], ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"], ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"], ["BH", "🇧🇭"], ["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"], ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"],
