/***
[task_local]
event-interaction https://raw.githubusercontent.com/oiozi/Gears/main/Package/QuantumultX/test.js, tag=test, img-url=location.fill.viewfinder.system

@XIAO_KOP

**/

// var content= `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + response.body + `</p>`;

var urlIPv4 = "https://api-ipv4.ip.sb/geoip"; // 使用 IPv4 地址查询 API
var urlIPv6 = "https://api-ipv6.ip.sb/geoip"; // 使用 IPv6 地址查询 API
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

var messageIPv4 = "";
var messageIPv6 = "";

const paras = ["ip", "isp", "country_code", "city"];
const paran = ["IP", "ISP", "地区", "城市"];

// 查询 IPv4 信息
$task.fetch(myRequestIPv4).then(response => {
    messageIPv4 = response ? json2info(response.body, paras) : "";
    checkAndDone();
}, reason => {
    messageIPv4 = "</br></br>🛑 查询超时";
    checkAndDone();
});

// 查询 IPv6 信息
$task.fetch(myRequestIPv6).then(response => {
    messageIPv6 = response ? json2info(response.body, paras) : "";
    checkAndDone();
}, reason => {
    messageIPv6 = "</br></br>🛑 查询超时";
    checkAndDone();
});

function checkAndDone() {
    // 如果两个查询都完成，就执行 $done 返回结果
    if (messageIPv4 !== "" && messageIPv6 !== "") {
        // 合并 IPv4 和 IPv6 信息，以适当的方式展示给用户
        var message = messageIPv4 + "<br><br>--------------------<br>" + messageIPv6;
        $done({
            "title": "🔎 IP.SB 查询结果",
            "htmlMessage": message
        });
    }
}

function json2info(cnt, paras) {
    var res = "";
    cnt = JSON.parse(cnt);
    for (i = 0; i < paras.length; i++) {
        cnt[paras[i]] = paras[i] == "country_code" ? cnt[paras[i]] + " ⟦" + flags.get(cnt[paras[i]].toUpperCase()) + "⟧" : cnt[paras[i]];
        res = cnt[paras[i]] ? res + "<b><font color=>"
            + paran[i] + "</font> : </b><font color=>" + cnt[paras[i]] + "</font><br>" : res;
    }
    res += "--------------------<br><font color=#6959CD><b>节点</b> ➟ " + $environment.params + "</font>";
    res = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`;
    return res;
}

var flags = new Map([["AC", "🇦🇨"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AI", "🇦🇮"], ["AL", "🇦🇱"], ["AM", "🇦🇲"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"], ["AT", "🇦🇹"], ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"], ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"], ["BH", "🇧🇭"], ["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"], ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"], ["BW", "🇧🇼"], ["BY", "🇧🇾"], ["BZ", "🇧🇿"], ["CA", "🇨🇦"], ["CF", "🇨🇫"], ["CH", "🇨🇭"], ["CK", "🇨🇰"], ["CL", "🇨🇱"], ["CM", "🇨🇲"], ["CN", "🇨🇳"], ["CO", "🇨🇴"], ["CP", "🇨🇵"], ["CR", "🇨🇷"], ["CU", "🇨🇺"], ["CV", "🇨🇻"], ["CW", "🇨🇼"], ["CX", "🇨🇽"], ["CY", "🇨🇾"], ["CZ", "🇨🇿"], ["DE", "🇩🇪"], ["DG", "🇩🇬"], ["DJ", "🇩🇯"], ["DK", "🇩🇰"], ["DM", "🇩🇲"], ["DO", "🇩🇴"], ["DZ", "🇩🇿"], ["EA", "🇪🇦"], ["EC", "🇪🇨"], ["EE", "🇪🇪"], ["EG", "🇪🇬"], ["EH", "🇪🇭"], ["ER", "🇪🇷"], ["ES", "🇪🇸"], ["ET", "🇪🇹"], ["EU", "🇪🇺"], ["FI", "🇫🇮"], ["FJ", "🇫🇯"], ["FK", "🇫🇰"], ["FM", "🇫🇲"], ["FO", "🇫🇴"], ["FR", "🇫🇷"], ["GA", "🇬🇦"], ["GB", "🇬🇧"], ["HK", "🇭🇰"], ["HU", "🇭🇺"], ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"], ["IN", "🇮🇳"], ["IS", "🇮🇸"], ["IT", "🇮🇹"], ["JP", "🇯🇵"], ["KR", "🇰🇷"], ["LU", "🇱🇺"], ["MO", "🇲🇴"], ["MX", "🇲🇽"], ["MY", "🇲🇾"], ["NL", "🇳🇱"], ["PH", "🇵🇭"], ["RO", "🇷🇴"], ["RS", "🇷🇸"], ["RU", "🇷🇺"], ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"], ["SD", "🇸🇩"], ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["TH", "🇹🇭"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TV", "🇹🇻"], ["TW", "🇨🇳"], ["UK", "🇬🇧"], ["UM", "🇺🇲"], ["US", "🇺🇸"], ["UY", "🇺🇾"], ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], ["VN", "🇻🇳"], ["ZA", "🇿🇦"]]);

