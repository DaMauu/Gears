## 根据 IP 判断的规则的可选项

当 GEOIP 或者 IP-CIDR 规则被触发，Surge 会发送一个解析请求去检查主机名是否为一个域名。你可以加上 “no-resolve” 以跳过这个过程。

no-resolve:告诉Clash不要去尝试解析来匹配这条规则，只处理「直接IP 访问」的请求。

### 选项: no-resolve

GEOIP,US,DIRECT,no-resolve

IP-CIDR,172.16.0.0/12,DIRECT,no-resolve

