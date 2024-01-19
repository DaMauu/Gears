# no-resolve根据 IP 判断的规则的可选项

当触发IP规则类时,代理软件会发送解析请求去检查主机名是否为一个域名,你可以加上 “no-resolve” 就可以告诉代理软件不要去尝试解析来匹配这条规则，只处理「直接IP 访问」的请求。

`no-resolve` 选项是可选的, 它用于跳过规则的 DNS 解析. 当您想要使用 `GEOIP`、`IP-CIDR`、`IP-CIDR6`、`SCRIPT` 规则, 但又不想立即将域名解析为 IP 地址时, 这个选项就很有用了.
```bash
# 类型,参数,策略(,no-resolve)
TYPE,ARGUMENT,POLICY(,no-resolve)
```

[clash知识库](https://clash.wiki/configuration/rules.html)
