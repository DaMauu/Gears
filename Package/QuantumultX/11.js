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

var ipv4Info = "";
var ipv6Info = "";

// 请求 IPv4 地理位置信息
$task.fetch(myRequestV4).then(responseV4 => {
  ipv4Info = responseV4 ? json2info(responseV4.body) : "";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    ipv6Info = responseV6 ? json2info(responseV6.body) : "";
    // 按照指定格式组合信息并显示
    var message = `
IP 查询结果
------------------------------
IPV4: ${ipv4Info.ip}
IPV6: ${ipv6Info.ip}
ISP: ${ipv4Info.isp}
地区: ${ipv4Info.region}
城市: ${ipv4Info.city}
------------------------------
节点 ➟ 国旗+节点名字
`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    ipv6Info = "IPv6 查询超时";
    // 只显示 IPv4 信息
    var message = `
IP 查询结果
------------------------------
IPV4: ${ipv4Info.ip}
IPV6: ${ipv6Info}
ISP: ${ipv4Info.isp}
地区: ${ipv4Info.region}
城市: ${ipv4Info.city}
------------------------------
节点 ➟ 国旗+节点名字
`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
}, reason => {
  ipv4Info = "IPv4 查询超时";
  // 请求 IPv6 地理位置信息
  $task.fetch(myRequestV6).then(responseV6 => {
    ipv6Info = responseV6 ? json2info(responseV6.body) : "";
    // 只显示 IPv6 信息
    var message = `
IP 查询结果
------------------------------
IPV4: ${ipv4Info}
IPV6: ${ipv6Info.ip}
ISP: ${ipv6Info.isp}
地区: ${ipv6Info.region}
城市: ${ipv6Info.city}
------------------------------
节点 ➟ 国旗+节点名字
`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  }, reason => {
    ipv6Info = "IPv6 查询超时";
    // 都查询超时
    var message = `
IP 查询结果
------------------------------
IPV4: ${ipv4Info}
IPV6: ${ipv6Info}
ISP: 未知
地区: 未知
城市: 未知
------------------------------
节点 ➟ 国旗+节点名字
`;
    $done({ "title": "🔎 IP 查询结果", "htmlMessage": message });
  });
});

function json2info(cnt) {
  cnt = JSON.parse(cnt);
  return {
    ip: cnt.ip,
    isp: cnt.isp,
    region: cnt.region,
    city: cnt.city
  };
}
