---
layout: post
title: ruby에서 net/http를 이용한 json api call
date: 2016-03-23  8:59:59 +0900
categories: dev
published: true
comments: true
tags:
- ruby
- ssl
---

ruby의 제공 모듈인 net/http를 이용하여 json api를 하려면 아래와 같이 작성하여 실행해보면된다. java와는 다르게 매우 쉽게 작성할 수 있다.
<!--more-->

```ruby
require 'net/http'
require 'json'

url = 'https://api.github.com/users/seotory'
uri = URI(url)
response = Net::HTTP.get(uri)

obj = JSON.parse(response)

p obj
```

위의 코드에서 url 부분을 바꾸면 테스트 해볼 수 있을 것이다. 

https 호출인 경우 window 환경이라면 아래과 같은 error가 발생한다. 

```shell
C:/Ruby22-x64/lib/ruby/2.2.0/net/http.rb:923:in `connect': SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (OpenSSL::SSL::SSLError)
```

이유는 ruby의 기본 라이브러리인 net/http에서 TLS handshake 시 ssl 인증서가 유효한지 체크하지 않기 때문이다. ruby net/http 안쪽에서 openssl을 이용하고 있다. openssl은 `SSL_CERT_FILE` 이라는 환경변수를 이용하는데, 이 환경변수는 인증서의 위치를 가르킨다. 따라서 아래와 같이 `SSL_CERT_FILE` 셋팅하면 error를 해결할 수 있다.

1. [http://curl.haxx.se/ca/cacert.pem](http://curl.haxx.se/ca/cacert.pem){:target='_blank'} 파일을 `C:\RailsInstaller\` 폴더에 넣는다.
2. `SSL_CERT_FILE=C:\RailsInstaller\cacert.pem` 시스템 환경변수를 추가한다.

cacert.pem 파일이 ssl 인증서 내용을 포함하고 있다. 이 파일을 `SSL_CERT_FILE` 변수에서 가르키게 되면 에러가 해결된다.

## 참조

- [net/http solution](https://gist.github.com/fnichol/867550){:target='_blank'}
- [net/http source code](http://rxr.whitequark.org/mri/source/lib/net/http.rb){:target='_blank'}
- [Ruby OpenSSL](https://blog.udemy.com/ruby-openssl/){:target='_blank'}