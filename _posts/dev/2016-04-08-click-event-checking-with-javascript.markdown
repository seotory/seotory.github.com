---
layout: post
title: click event 자바스크립트로 체크하기
date: 2016-04-08 16:55:59 +0900
description: ''
image: ''
categories: dev
published: false
comments: false
tags:
- javascript
---

방문자의 클릭 형태를 조사하기 위해 스크립트를 짜야 할 일이 생겼다. 어떤 방법으로 해야할지 매우 고민스러웠는데, 일단 아래와 같이 작성하였다. 절대적인 가이드는 아니며, 코드를 만들면서 알게 되었던 새로운 사실들을 중점으로 작성되었다. 누군가에게 도움이 되길 바라면서..

# 요구사항

- 최소한의 브라우저 호환성을 보장한다.
- 프레임워크를 사용하지 않고 스크립트를 작성한다.
- 작은 크기로 프로그래밍한다.
- a link tag나, ajax 버튼을 눌렀을 시에도 click log는 남겨야한다.
- event 전파 현상이 막혀있더라도 log는 남겨야한다.

# 

# 골치덩어리의 ie 8 이하 버전


```javascript
/* event =================================================== */
function addEvent( el, eventType, func ) {
	log( el );

	// chrome.
	if ( document.addEventListener ) {
		el.addEventListener( eventType, func, true ); // true > capture, false > bubble

	// ie
	} else if ( document.attachEvent ) {
		el.attachEvent( 'on' + eventType, func );
	}
}

addEvent( document.getElementsByTagName('body')[0], 'click', function ( e ) {
	if ( ! e ) e = window.event;

	var path;

	if ( e.path ) {
		path = e.path;
	} else {
		path = nodePath( e.target || e.srcElement );
	}

	log( path );
	if ( path.length > 0 ) {
		logDataParser( path );
	}
});

function nodePath( el ) {
	var path = [];

	if ( el ) {
		path.push( el );
		while ( el.parentNode ) {
			path.push( el.parentNode );
			el = el.parentNode;
		}
	}

	return path;
}

function logDataParser ( ary ) {
	//log( "----------- path ----------" );
	if ( ary && ary.length > 0 ) {
		for ( var i=0 ; i<ary.length ; i++ ) {
			var el = ary[i];
			if ( el.hasAttribute && el.hasAttribute('data-log') ) {
				log( '<logging start>' );
				ajax.open('GET', '/test/?log=Y', true);
				ajax.send(null);
				break;
			}
		}
	}
}
```