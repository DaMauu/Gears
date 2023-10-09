// 定义远程脚本的名称和说明
/**
 * @description IP 地理位置查询
 * @version 1.0
 * @author XIAO_KOP
 * @website https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js
 */

// 导入 flags 映射
var flags = new Map([
  ["AC", "🇦🇨"],
  ["AE", "🇦🇪"],
  ["AF", "🇦🇫"],
  // 其他国家的映射
]);

// 定义参数
var url = "https://api.ip.sb/geoip";
var opts = {
  policy: $environment.params,
};
var myRequest = {
  url: url,
  opts: opts,
  timeout: 4000,
};

// 查询 IP 地理位置信息
var message = "";
const paras = ["ip", "isp", "country_code", "city"];
const paran = ["IP", "ISP", "地区", "城市"];
$task.fetch(myRequest).then(
  (response) => {
    message = response ? json2info(response.body, paras) : "";
    $done({
      title: "🔎 IP.SB 查询结果",
      htmlMessage: message,
    });
  },
  (reason) => {
    message = "</br></br>🛑 查询超时";
    message =
      `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` +
      message +
      `</p>`;
    $done({
      title: "🔎 IP.SB 查询结果",
      htmlMessage: message,
    });
  }
);

// 解析 JSON 数据并构造查询结果
function json2info(cnt, paras) {
  var res = "------------------------------";
  cnt = JSON.parse(cnt);
  for (i = 0; i < paras.length; i++) {
    cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
    res = cnt[paras[i]] ? res + "</br><b>" + "<font  color=>" + paran[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res;
  }
  res = res + "------------------------------" + "</br>" + "<font color=#6959CD>" + "<b>节点</b> ➟ " + $environment.params + "</font>";
  res = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`;
  return res;
}
