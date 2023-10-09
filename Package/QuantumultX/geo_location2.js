/***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system

  @XIAO_KOP
***/

var urlIPv4 = "https://api.ip.sb/geoip";
var urlIPv6 = "https://api-ipv6.ip.sb/geoip";
var opts = {
    policy: $environment.params
};
var message = "";
const paras = ["ip", "isp", "country_code", "city"];
const paran = ["IP", "ISP", "地区", "城市"];

// 发起IPv4请求
var requestIPv4 = {
    url: urlIPv4,
    opts: opts,
    timeout: 4000
};

// 发起IPv6请求
var requestIPv6 = {
    url: urlIPv6,
    opts: opts,
    timeout: 4000
};

// 获取IPv4和IPv6的数据
var ipv4Data, ipv6Data;

$task.fetch(requestIPv4).then(responseIPv4 => {
    ipv4Data = responseIPv4 ? JSON.parse(responseIPv4.body) : null;
    checkAndDisplayResult();
}, reasonIPv4 => {
    ipv4Data = null;
    checkAndDisplayResult();
});

$task.fetch(requestIPv6).then(responseIPv6 => {
    ipv6Data = responseIPv6 ? JSON.parse(responseIPv6.body) : null;
    checkAndDisplayResult();
}, reasonIPv6 => {
    ipv6Data = null;
    checkAndDisplayResult();
});

function checkAndDisplayResult() {
    if (ipv4Data || ipv6Data) {
        message = json2info(ipv4Data, "IPv4") + json2info(ipv6Data, "IPv6");
        $done({
            "title": "🔎 IP.SB 查询结果",
            "htmlMessage": message
        });
    } else {
        message = "</br></br>🛑 查询超时";
        message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`;
        $done({
            "title": "🔎 IP.SB 查询结果",
            "htmlMessage": message
        });
    }
}

function json2info(cnt, ipType) {
    if (!cnt) return "";

    var res = "------------------------------";
    for (var i = 0; i < paras.length; i++) {
        cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
        res = cnt[paras[i]] ? res + "</br><b>" + "<font  color=>" + paran[i] + "</font> : " + "</b>" + "<font  color=>" + cnt[paras[i]] + "</font></br>" : res;
    }

    // 映射IP类型
    var ipTypeName = ipType === "IPv4" ? "IPv4" : "IPv6";
    res = res + "------------------------------" + "</br>" + "<font color=#6959CD>" + "<b>节点</b> ➟ " + ipTypeName + "</font>";
    res = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`;
    return res;
}

var flags = new Map([[ "AC" , "🇦🇨" ], ["AE", "🇦🇪"], [ "AF" , "🇦🇫" ], [ "AI" , "🇦🇮" ], [ "AL" , "🇦🇱" ], [ "AM" , "🇦🇲" ], [ "AQ" , "🇦🇶" ], [ "AR" , "🇦🇷" ], [ "AS" , "🇦🇸" ], [ "AT" , "🇦🇹" ], [ "AU" , "🇦🇺" ], [ "AW" , "🇦🇼" ], [ "AX" , "🇦🇽" ], [ "AZ" , "🇦🇿" ], ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ], [ "BD" , "🇧🇩" ], [ "BE" , "🇧🇪" ], [ "BF" , "🇧🇫" ], [ "BG" , "🇧🇬" ], [ "BH" , "🇧🇭" ], [ "BI" , "🇧🇮" ], [ "BJ" , "🇧🇯" ], [ "BM" , "🇧🇲" ], [ "BN" , "🇧🇳" ], [ "BO" , "🇧🇴" ], [ "BR" , "🇧🇷" ], [ "BS" , "🇧🇸" ], [ "BT" , "🇧🇹" ], [ "BV" , "🇧🇻" ], [ "BW" , "🇧🇼" ], [ "BY" , "🇧🇾" ], [ "BZ" , "🇧🇿" ], [ "CA" , "🇨🇦" ], [ "CF" , "🇨🇫" ], [ "CH" , "🇨🇭" ], [ "CK" , "🇨🇰" ], [ "CL" , "🇨🇱" ], [ "CM" , "🇨🇲" ], [ "CN" , "🇨🇳" ], [ "CO" , "🇨🇴" ], [ "CP" , "🇨🇵" ], [ "CR" , "🇨🇷" ], [ "CU" , "🇨🇺" ], [ "CV" , "🇨🇻" ], [ "CW" , "🇨🇼" ], [ "CX" , "🇨🇽" ], [ "CY" , "🇨🇾" ], [ "CZ" , "🇨🇿" ], [ "DE" , "🇩🇪" ], [ "DG" , "🇩🇬" ], [ "DJ" , "🇩🇯" ], [ "DK" , "🇩🇰" ], [ "DM" , "🇩🇲" ], [ "DO" , "🇩🇴" ], [ "DZ" , "🇩🇿" ], [ "EA" , "🇪🇦" ], [ "EC" , "🇪🇨" ], [ "EE" , "🇪🇪" ], [ "EG" , "🇪🇬" ], [ "EH" , "🇪🇭" ], [ "ER" , "🇪🇷" ], [ "ES" , "🇪🇸" ], [ "ET" , "🇪🇹" ], [ "EU" , "🇪🇺" ], [ "FI" , "🇫🇮" ], [ "FJ" , "🇫🇯" ], [ "FK" , "🇫🇰" ], [ "FM" , "🇫🇲" ], [ "FO" , "🇫🇴" ], [ "FR" , "🇫🇷" ], [ "GA" , "🇬🇦" ], [ "GB" , "🇬🇧" ], [ "HK" , "🇭🇰" ],["HU","🇭🇺"], [ "ID" , "🇮🇩" ], [ "IE" , "🇮🇪" ], [ "IL" , "🇮🇱" ], [ "IM" , "🇮🇲" ], [ "IN" , "🇮🇳" ], [ "IS" , "🇮🇸" ], [ "IT" , "🇮🇹" ], [ "JP" , "🇯🇵" ], [ "KR" , "🇰🇷" ], [ "LU" , "🇱🇺" ], [ "MO" , "🇲🇴" ], [ "MX" , "🇲🇽" ], [ "MY" , "🇲🇾" ], [ "NL" , "🇳🇱" ], [ "PH" , "🇵🇭" ], [ "RO" , "🇷🇴" ], [ "RS" , "🇷🇸" ], [ "RU" , "🇷🇺" ], [ "RW" , "🇷🇼" ], [ "SA" , "🇸🇦" ], [ "SB" , "🇸🇧" ], [ "SC" , "🇸🇨" ], [ "SD" , "🇸🇩" ], [ "SE" , "🇸🇪" ], [ "SG" , "🇸🇬" ], [ "TH" , "🇹🇭" ], [ "TN" , "🇹🇳" ], [ "TO" , "🇹🇴" ], [ "TR" , "🇹🇷" ], [ "TV" , "🇹🇻" ], [ "TW" , "🇨🇳" ], [ "UK" , "🇬🇧" ], [ "UM" , "🇺🇲" ], [ "US" , "🇺🇸" ], [ "UY" , "🇺🇾" ], [ "UZ" , "🇺🇿" ], [ "VA" , "🇻🇦" ], [ "VE" , "🇻🇪" ], [ "VG" , "🇻🇬" ], [ "VI" , "🇻🇮" ], [ "VN" , "🇻🇳" ], [ "ZA" , "🇿🇦" ]];

