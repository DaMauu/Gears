 /***
  [task_local]
  event-interaction https://raw.githubusercontent.com/oiozi/Gears/main/Package/QuantumultX/1.js, tag=1, img-url=location.fill.viewfinder.system
  
  @XIAO_KOP

  **/

  // var content= `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + response.body + `</p>`;
  var urlIPv4 = "https://api.ip.sb/geoip";
  var urlIPv6 = "https://api-ipv6.ip.sb/geoip";
  var opts = {
      policy: $environment.params
  };
  var message = "";
  
  // 获取IPv4地址信息
  var ipv4Request = {
      url: urlIPv4,
      opts: opts,
      timeout: 4000
  };
  
  // 获取IPv6地址信息
  var ipv6Request = {
      url: urlIPv6,
      opts: opts,
      timeout: 4000
  };
  
  Promise.all([$task.fetch(ipv4Request), $task.fetch(ipv6Request)]).then(responses => {
      var ipv4Response = responses[0];
      var ipv6Response = responses[1];
      
      var ipv4Info = ipv4Response ? JSON.parse(ipv4Response.body) : null;
      var ipv6Info = ipv6Response ? JSON.parse(ipv6Response.body) : null;
      
      message = formatResponse(ipv4Info, ipv6Info);
      
      $done({
          title: "🔎 IP 地理信息查询结果",
          htmlMessage: message
      });
  }).catch(error => {
      message = "</br></br>🛑 查询超时";
      message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`;
      $done({
          title: "🔎 IP 地理信息查询结果",
          htmlMessage: message
      });
  });
  
function formatResponse(ipv4Data, ipv6Data) {
    var result = "------------------------------";
      
    if (ipv4Data) {
        result += "</br><b>IPv4 地址</b>: " + ipv4Data.ip;
        result += "</br><b>ISP 提供商</b>: " + ipv4Data.isp;
        result += "</br><b>国家代码</b>: " + ipv4Data.country_code;
        result += "</br><b>城市</b>: " + ipv4Data.city;
      }
      
    if (ipv6Data) {
        result += "</br><b>IPv6 地址</b>: " + ipv6Data.ip;
    }
      
    result += "------------------------------" + "</br>" + `<font color=#6959CD><b>节点 ➟</b> ${$environment.params}</font>`;
    result = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">${result}</p>`;
      
    return result;
}


var flags = new Map([[ "AC" , "🇦🇨" ] ,["AE","🇦🇪"], [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫🇴" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] ,["HU","🇭🇺"], [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "LU" , "🇱🇺" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "🇸🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇨🇳" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ] , [ "ZA" , "🇿🇦"]])
