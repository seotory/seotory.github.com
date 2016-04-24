---
layout: post
title: javascript ajax 통신, jsonp 의 모든 것
date: 2016-04-04 19:09:44 +0900
description: 전통적인 웹 브라우져에서는 same-origin policy (SOP) 정책에 따라 다른 도메인간의 request을 제한하고 있다. 그러나 &lt;script/&gt; 태그는 same-origin-policy (SOP) 정책에 속하지 않는다는 사실을 근거로, 서로 다른 도메인간의 javascript 호출을 위하여 jsonp (또는 json with padding) 이 사용되었다.
image: ''
categories: dev
published: true
comments: true
tags:
- javascript
- ajax
---

# jsonp 란?

전통적인 웹 브라우져에서는 same-origin policy (SOP) 정책에 따라 다른 도메인간의 request을 제한하고 있다. 그러나 `<script/>` 태그는 same-origin-policy (SOP) 정책에 속하지 않는다는 사실을 근거로, 서로 다른 도메인간의 javascript 호출을 위하여 jsonp (또는 json with padding) 이 사용되었다.

> jsonp를 사용하기 위해서는 필수적으로 서버단에서 jsonp의 포맷을 따라야한다. 이것은 jsonp를 사용하기 위한 "규칙"이다.

# jsonp 의 원리

jsonp의 원리를 설명하기 전에 먼저 json의 형태를 살펴보자. 아래는 일반적인 json의 코드이다.

```html
{
    data : 'data1',
    data2 : 'data2',
    ary_data : ['1', '2', '3', '4']
}
```

javascript에서 "{ }" 문법은 객체 리터럴 이다. 즉 위의 코드는 객체를 정의하기 위한 코드이다. json은 객체를 정의하기 위한 문법이라고 볼 수 있다. 아래의 json response 를 받는 일반적인 jQuery ajax 을 살펴보자.

```javascript
$.ajax({
    url : 'http://seotory.com/result.json',
    type : 'json'
}).done(funcntion(data){
    // data 는 json 포맷 타입을 받게 된다.
});
```

위의 코드에서 response로 받는 것은 json 포맷 -> 객체를 받는 것이다. 그러면 $.done() 함수 안에서 function(data){} 라는 익명 함수(callback 함수라고 볼 수 있음)가 data객체를 바탕으로 무엇인가 output 을 만들어 내게 된다. 이런 경우는 SOP 정책에 위배되지 않은 매우 일반적인 브라우져간 XMLHttpRequest 통신이라고 볼 수 있다.

하지만 http://seotory.com/test.js 에서 호출 하는 ajax 가 seotory.com/result.json 이 아닌 seotest.com/result.json 의 데이터를 한다면? SOP 정책에 걸려서 데이터를 가져오지 못할 것이다. 어떻게 호출해야 할까?

답은 이미 위에 적혀있다. `<script/>` 태그를 이용하는 것이다.

```html
<script type="text/javascript" src="http://seotest.com/result.json"></script>
```

위의 코드를 html에 선언하면 정상적으로 json URL을 호출 할 것이다. 그러나 result.json 안에 있는 코드는 객체를 정의하는 코드이지 실행 코드가 아니다. 이 말인즉 위의 코드를 실행 코드로 바꿔주기만 하면 도메인이 달라도 SOP 정책을 벗어나 자유로운 javascript 함수 호출이 가능해 진다는 뜻이다. result.json 코드를 이제 아래와 같이 바꿔보자.

```javascript
callback({
    data : 'data1',
    data2 : 'data2',
    ary_data : ['1', '2', '3', '4']
})
```

avascript 에서 "( )" 은 실행 구문이다. 즉 위의 코드는 callback() 이라는 함수를 실행 시키는 구문이다. 잘 보면 argument 로 객체 리터럴(result.json 의 내용)을 사용하고 있음을 볼 수 있다.

```html
<script type="text/javascript" src="http://seotest.com/result.json"></script>
<script>
function callback( data ) {
    // data 는 result.json 의 데이터가 들어오게 된다.
}
</script>
```

위의 소스처럼 callback 이라는 함수를 만들면, seotest.com/result.json 는 선언된 callback 함수를 호출하게 될것이다. 다른 도메인이라고 할지라도 문제 없이 json 데이터를 사용하게 되는 것이다. 사실 jsonp는 이것이 다다.

# jQuery jsonp

jQuery v.1.2 이상부터 jsonp 형태가 지원이 된다. jQuery 의 jsonp 은 위의 원리를 토대로 만들어졌다. 아래의 jQuery 소스를 보면window 영역에 callbackName 의 함수를 만드는 것을 확인 할 수 있다.

```javascript
// Handle iff the expected data type is "jsonp" or we have a parameter to set
if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

	// Get callback name, remembering preexisting value associated with it
	callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
		s.jsonpCallback() :
		s.jsonpCallback;

	// Insert callback into url or form data
	if ( jsonProp ) {
		s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
	} else if ( s.jsonp !== false ) {
		s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
	}

	// Use data converter to retrieve json after script execution
	s.converters["script json"] = function() {
		if ( !responseContainer ) {
			jQuery.error( callbackName + " was not called" );
		}
		return responseContainer[ 0 ];
	};

	// force json dataType
	s.dataTypes[ 0 ] = "json";

	// Install callback
	overwritten = window[ callbackName ];
	window[ callbackName ] = function() {
		responseContainer = arguments;
	};

	// Clean-up function (fires after converters)
	jqXHR.always(function() {
		// Restore preexisting value
		window[ callbackName ] = overwritten;

		// Save back as free
		if ( s[ callbackName ] ) {
			// make sure that re-using the options doesn't screw things around
			s.jsonpCallback = originalSettings.jsonpCallback;

			// save the callback name for future use
			oldCallbacks.push( callbackName );
		}

		// Call if it was a function and we have a response
		if ( responseContainer && jQuery.isFunction( overwritten ) ) {
			overwritten( responseContainer[ 0 ] );
		}

		responseContainer = overwritten = undefined;
	});

	// Delegate to script
	return "script";
}
```

# jsonp 팁

가끔 jsonp를 사용하다가 보면 callback 함수를 지정하지 않아서 에러가 난다는 연락을 받을 때가 있다. (대부분 비정상적인 경우이며, 커뮤니케이션이 제대로 되지 않은 상태이다.) 이런 경우에는 response를 보낼때에 "callback({data})" 만 보내지 말고, try catch 문을 이용해서 보내면 에러를 방지 할 수 있다.

```javascript
try {
    callback({
        data : 'data1',
        data2 : 'data2',
        ary_data : ['1', '2', '3', '4']
    })
} catch (e){}
```

다른 경우로 jQuery ajax jsonp 를 이용해 구현하였는데, 자동 단어 완성 같이 빠르게 XMLHttpRequest 통신을 할때에는 콜백 함수를 찾지 못해 에러(response 타이밍에 따라서 jQuery ajax 의 누수)가 나는 경우가 있다. 이 역시 위와 같은 방법으로 해결 할 수도 있고, 아래와 같이 window 영역에 호출될 callback 함수를 명시적으로 만들어서 해결하는 방법도 있다.

```javascript
function callback () {
    // 전역 함수로 작성
}
```

# core javascript 를 이용해서 jsonp 호출하기

위의 내용을 다 이해했다면 어렵지않다. 아래와 같이 jQuery를 사용하지 않더라도 jsonp를 호출 할 수있다.

```javascript
function test () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://seotest.com/result.json";
    document.getElementsByTagName('head').appendChild(script);
}
function callback ( data ) {
    // data 객체 받아 옴
}
test();
```

# 참조

- [위키 jsonp](http://en.wikipedia.org/wiki/JSONP){:target="_blank"}
- [jQuery](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js){:target="_blank"}