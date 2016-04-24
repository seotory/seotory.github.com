---
layout: post
title: java post http
date: 2016-03-30 11:03:10 +0900
description: ''
image: ''
categories: hide
published: false
comments: false
tags:
- java
- http
---
<!--more-->

# java

java 1.5에서 쉬운방법

```java
HttpClient client = new HttpClient();
HttpMethodBase method = new PostMethod(Constants.SHOPPING_MAIN_URL);
method.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
client.executeMethod(method);

String welcomeHtml = new String(method.getResponseBody(), "EUC-KR");
req.setAttribute("cssInfo", getStyleSheetInfo(welcomeHtml));
```

# sql

connent by 구절 예제

```sql
SELECT code, p_code, area_nm, sys_connect_by_path(keyword, '>') keyword,
       (SELECT seq
        FROM wel_cont b
        WHERE b.code = a.code
        AND disp_end_dts >= SYSDATE
        AND ROWNUM = 1
       ) seq
FROM wel_area a
START WITH p_code = 0
CONNECT BY p_code = PRIOR code
```

컬럼추가

```sql
alter table test add(osy number(10));
```

컬럼삭제

```sql
alter table test drop(osy79);
```