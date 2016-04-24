---
layout: post
title: maven 로컬 저장소 셋팅
date: 2016-03-21 15:16:58 +0900
categories: dev
published: true
comments: true
tags:
- java
- maven
---

java에서 maven을 이용한 build 시스템을 만들다보면 로컬 저장소를 만들어야 할 경우가 있다. 만약 프로젝트 경로를 `D:\workspace\application`로 잡은 상태에서 안에 `tmp-repo`를 만들었다면, 아래와 같이 `pom.xml`에 추가해주면 로컬 저장소를 이용할 수 있다.
<!--more-->

```xml
<repositories>
	<!-- local -->
	<repository>
		<id>local-repo</id>
		<name>local Repository</name>
		<url>file://${project.basedir}/tmp-repo</url>
	</repository>
</repositories>
```

`file://${project.basedir}/tmp-repo`은 치환되어 `file://D:/workspace/application/tmp-repo`가 된다. 후에 필요한 jar를 아래와 같이 `dependency`로 추가한다. 아래의 예제는 ojdbc6를 예로 들었다.

```xml
<dependencies>
	<dependency>
		<groupId>com.oracle</groupId>
		<artifactId>ojdbc6</artifactId>
		<version>11.2.0.4</version>
	</dependency>
</dependencies>
```
jar의 실제 물리경로는 `D:/workspace/application/tmp-repo/com/oracle/ojdbc6/11.2.0.4` 폴더여야한다.

만약 이 임시 repository가 jenkins 안에서도 제대로 작동하고 싶다면 추가적으로 아래의 repository도 적어주도록 한다.

```xml
<repositories>
	<!-- jenkins -->
	<repository>
		<id>jenkins-repo</id>
		<name>jenkins Repository</name>
		<url>file://${user.dir}/tmp-repo</url>
	</repository>
</repositories>
```

`${user.dir}`는 java가 제공해주는 env(환경변수)로써 jenkins의 현재 working directory로 치환되어 임시 저장소를 제대로 참조해 줄 수 있도록 도와준다. 만약 위의 환경변수가 jenkins에서 제대로 동작하지 않는다면 아래를 참고해서 수정하여 쓰면 된다.

- [java 제공 환경변수](http://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html){:target="_blank"}
- [maven 제공 프로퍼티](http://books.sonatype.com/mvnref-book/reference/resource-filtering-sect-properties.html){:target="_blank"}
- [jenkins 제공 환경변수](https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project#Buildingasoftwareproject-JenkinsSetEnvironmentVariables){:target="_blank"}