 /***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
  
  @XIAO_KOP

  **/

// var content= `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + response.body + `</p>`;

  var urlIPv4 = "https://api.ip.sb/ip";
  var urlIPv6 = "https://api-ipv6.ip.sb/geoip";
  var opts = {
      policy: $environment.params
  };
  var myRequestIPv4 = {
      url: urlIPv4,
      opts: opts,
      timeout: 4000
  };
  var myRequestIPv6 = {
      url: urlIPv6,
      opts: opts,
      timeout: 4000
  };
 
  var message = ""
  const paras = ["ip","isp","country_code","city"]
  const paran = ["连接方式","ISP","地区","城市"]
  $task.fetch(myRequestIPv4).then(responseIPv4 => {
    $task.fetch(myRequestIPv6).then(responseIPv6 => {
      var ipv4 = responseIPv4? responseIPv4.body.trim() : "";
      var ipv6 = responseIPv6? json2info(responseIPv6.body, paras).trim() : "";
      if (ipv4 && ipv6) {
          message = "IPv4: " + ipv4 + "<br>IPv6: " + ipv6;
      } else if (ipv4) {
          message = "IPv4: " + ipv4;
      } else if (ipv6) {
          message = "IPv6: " + ipv6;
      } else {
          message = "无法检测到网络连接信息";
      }
      $done({"title": "    🔎 IP.SB 查询结果", "htmlMessage": message});
    }, reason => {
      message = "</br></br>🛑 IPv6 查询超时"
      message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`
      $done({"title": "🔎 IP.SB 查询结果", "htmlMessage": message});
    });
  }, reason => {
    message = "</br></br>🛑 IPv4 查询超时"
    message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`
    $done({"title": "🔎 IP.SB 查询结果", "htmlMessage": message});
  });


function json2info(cnt,paras) {
  var res = "------------------------------"
  cnt = JSON.parse(cnt)
  for (i=0;i<paras.length;i++) {
    if (paras[i] === "country_code") {
        cnt[paras[i]] = cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧";
    }
    res = cnt[paras[i]] ?   res + "</br><b>" + "<font  color=>" + paran[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res
  }
  res =res+ "------------------------------"+"</br>"+"<font color=#6959CD>"+"<b>节点</b> ➟ " + $environment.params+ "</font>"
  res =  `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`
  return res
}
