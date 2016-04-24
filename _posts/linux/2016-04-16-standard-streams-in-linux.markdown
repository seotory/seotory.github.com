---
layout: post
title: 리눅스에서 std(standard streams)란
date: 2016-04-16 20:35:47 +0900
description: 
image: 
categories: linux
published: true
comments: true
tags: linux
---

리눅스에서 프로그램이 구동시 프로그램과 실행환경 사이를 소통하기 위해서는 미리 연결된 data stream이 필요하다. 프로그램에 기본적으로 표준입력, 표준출력, 표준에러 3가지의 데이터 스트림(data stream)이 연결(connected)된다. 이 3가지의 I/O 커넥션을 스텐다드 스트림(standard streams) 즉 `STD`라고 말한다. 

원래 I/O 는 물리적은 장치에 의해 발생하지만, `STD`에서 이야기하는 I/O는 이것보다 좀 더 추상적이다. 일반적으로 shell에서 명령어가 실행될 때 standard stream가 연결이 되고 pipe를 통해 standard stream은 서로 연결이 되기도 한다. 또한 부모 프로세스에서 자식 프로세스로 standard stream이 상속된다.

> 3가지의 데이터 스트림에는 고유 숫자가 붙여지며 이 번호는 변하지 않는다. STD란 standard의 약자이다.  
> 표준입력(STDIN) stream number 0  
> 표준출력(STDOUT) stream number 1  
> 표준에러(STDERR) stream number 2  

`STDIN`는 키보드를 통해 일어나고 동작 결과는 모니터에 `STDOUT`또는 `STDERR`로 출력한다. 

# 표준입력(STDIN)

`STDIN`이란 프로그램 안으로 stream data가 들어가는 것이다. 별도의 리다이렉션이 없으면 키보드를 통해 `STDIN`을 받게된다.

```shell
$ ls -al
```

# 표준출력(STDOUT)

표준 출력이란 프로그램을 실행시켰을 경우 터미널로 나오는 결과(data)를 말한다.

```shell
$ ls -al
total 32
drwxr-xr-x  19 zion437  staff    646  4 16 20:45 .
drwx------+ 19 zion437  staff    646  4  2 17:52 ..
-rw-r--r--@  1 zion437  staff  10245  9 20  2015 .DS_Store
drwxr-xr-x   6 zion437  staff    204  1 17  2015 Angular
drwxr-xr-x   8 zion437  staff    272  4  6  2015 Cool
drwxr-xr-x  13 zion437  staff    442  1 10 12:07 TS
drwxr-xr-x  16 zion437  staff    544  9 22  2015 editor
drwxr-xr-x  10 zion437  staff    340  3 20 15:12 electron
drwxr-xr-x  25 zion437  staff    850  9 21  2014 jQeury
drwxr-xr-x   6 zion437  staff    204  8  9  2014 layout
drwxr-xr-x   9 zion437  staff    306  5 24  2015 project_moni
drwxr-xr-x   4 zion437  staff    136  9 30  2015 seotory-java
drwxr-xr-x  26 zion437  staff    884  4 16 19:28 seotory.github.com
drwxr-xr-x  13 zion437  staff    442  1 16 17:29 seotoryjs
drwxr-xr-x   7 zion437  staff    238  4 19  2015 skin
drwxr-xr-x  44 zion437  staff   1496  4 12  2015 spring
drwxr-xr-x  12 zion437  staff    408  9 22  2015 tBlog
-rw-r--r--   1 zion437  staff   1094  4 16 20:45 test.txt
drwxr-xr-x   7 zion437  staff    238  4 19  2015 youthgroup
```

# 표준에러(STDERR)

표준에러란 프로그램이 실행시에 발생하는 에러에 해당한다.

```shell
$ ls -al test.txt test.test
ls: test.test: No such file or directory
-rw-r--r--  1 zion437  staff  53  4 16 21:00 test.txt
```

2번째 라인에서 `test.test` 파일을 찾지 못하여 표준에러가 발생하였다.

# 리다이렉션을 이용해 표준입력, 표준출력, 표준에러 사용해보기

 자 이제 위의 내용을 토대로 데이터 스트림을 파일로 기록을 해보자. 주로 `>`, `>>`, `<` 연산자를 사용하게 될 것이다.

## 리다이렉션 표준입력

표준입력을 커맨드창에서 이용하려면 `<` 연산자를 활용한다. `wc`는 라인의 수를 카운트하는 실행 명령어인데, 이 명령어를 활용해서 위에서 만들었던 `test.txt` 파일을 표준입력으로 전달해보자.

1. 표준입력 활용  
       
       $ wc < test.txt 
             20     173    1094

2. 표준입력 미활용
       
       $ wc test.txt 
             20     173    1094 test.txt

1번과 2번의 결과를 보면 확인 할 수 있듯이 `<` 연산자를 넣지 않아도 결과가 똑같음을 알 수 있다. 결과가 똑같다고 해서 `wc` 의 작동 메커니즘이 똑같은 것은 아니다. 1번 같은 경우에는 `wc` 프로그램이 실행되면서 연결되었던 3개의 스트림(표준입력, 출력, 에러) 중에서 표준입력의 스트림이 이용되어 `test.txt`가 전송된다. 2번은 `wc` 프로그램 내부에서 `test.txt` 파일을 읽어들여 실행하게 된다.

## 리다이렉션 표준출력

먼저 표준에러가 없는 실행문에 대해 파일로 만들어 볼 것이다.

```shell
ls -al > test.txt
```

위의 명령어를 실행하면 터미널 창에서 데이터가 나오지 않는다. 이유는 데이터 스트림이 바로 test.txt로 이동되어 파일로 작성되었기 때문이다. test.txt 파일을 열어보자.

```shell
total 24
drwxr-xr-x  19 zion437  staff    646  4 16 20:45 .
drwx------+ 19 zion437  staff    646  4  2 17:52 ..
-rw-r--r--@  1 zion437  staff  10245  9 20  2015 .DS_Store
drwxr-xr-x   6 zion437  staff    204  1 17  2015 Angular
drwxr-xr-x   8 zion437  staff    272  4  6  2015 Cool
drwxr-xr-x  13 zion437  staff    442  1 10 12:07 TS
drwxr-xr-x  16 zion437  staff    544  9 22  2015 editor
drwxr-xr-x  10 zion437  staff    340  3 20 15:12 electron
drwxr-xr-x  25 zion437  staff    850  9 21  2014 jQeury
drwxr-xr-x   6 zion437  staff    204  8  9  2014 layout
drwxr-xr-x   9 zion437  staff    306  5 24  2015 project_moni
drwxr-xr-x   4 zion437  staff    136  9 30  2015 seotory-java
drwxr-xr-x  26 zion437  staff    884  4 16 19:28 seotory.github.com
drwxr-xr-x  13 zion437  staff    442  1 16 17:29 seotoryjs
drwxr-xr-x   7 zion437  staff    238  4 19  2015 skin
drwxr-xr-x  44 zion437  staff   1496  4 12  2015 spring
drwxr-xr-x  12 zion437  staff    408  9 22  2015 tBlog
-rw-r--r--   1 zion437  staff      0  4 16 21:04 test.txt
drwxr-xr-x   7 zion437  staff    238  4 19  2015 youthgroup
```

프로그램 실행 결과 데이터가 test.txt파일로 저장되었다. `>` 연산자는 데이터 스트림을 redirect시키는 역활을 한다.

## 리다이렉션 표준에러

터미널 창에서 아래와 같이 입력해보자.

```shell
ls -al test.test > test.txt
ls: test.test: No such file or directory
```

위와 같이 입력했다면 `test.test` 파일이 없어서 화면 상에 에러 메세지가 출력된다. 실제로 `test.txt` 파일을 `vi`로 열어보면 아무것도 없음을 확인 할 수 있다. 에러메세지도 `test.txt` 파일로 담길줄 알았는데 왜 담기지 않은 것일까. 이유는 `>` 연산자가 기본적으로 표준출력 번호 1번을 리다이렉트 시키기 때문이다.

즉 표준에러를 파일로 담기 위해서는 표준에러 stream number 2를 붙여서 아래와 같이 호출해야 한다.

```shell
ls -al test.test 2> test.txt
```

`2>`를 붙이면 `test.txt` 파일에 프로그램 실행 에러 메세지가 제대로 저장되는 것을 확인 할 수 있다.

## >> 사용해보기

`>>` 연산자는 `>` 연산자와는 조금 다른 역활을 한다. 

```shell
ls -al > test.txt
wc test.txt >> test.txt
```

터미널에 위와 같이 입력해보자. `vi`를 통해 `test.txt` 파일을 열어보면 아래와 같은 내용을 확인 할 수 있다.

```shell
total 24
drwxr-xr-x  19 zion437  staff    646  4 24 11:58 .
drwx------+ 19 zion437  staff    646  4  2 17:52 ..
-rw-r--r--@  1 zion437  staff  10245  9 20  2015 .DS_Store
drwxr-xr-x   6 zion437  staff    204  1 17  2015 Angular
drwxr-xr-x   8 zion437  staff    272  4  6  2015 Cool
drwxr-xr-x  13 zion437  staff    442  1 10 12:07 TS
drwxr-xr-x  16 zion437  staff    544  9 22  2015 editor
drwxr-xr-x  10 zion437  staff    340  3 20 15:12 electron
drwxr-xr-x  25 zion437  staff    850  9 21  2014 jQeury
drwxr-xr-x   6 zion437  staff    204  8  9  2014 layout
drwxr-xr-x   9 zion437  staff    306  5 24  2015 project_moni
drwxr-xr-x   4 zion437  staff    136  9 30  2015 seotory-java
drwxr-xr-x  26 zion437  staff    884  4 16 19:28 seotory.github.com
drwxr-xr-x  13 zion437  staff    442  1 16 17:29 seotoryjs
drwxr-xr-x   7 zion437  staff    238  4 19  2015 skin
drwxr-xr-x  44 zion437  staff   1496  4 12  2015 spring
drwxr-xr-x  12 zion437  staff    408  9 22  2015 tBlog
-rw-r--r--   1 zion437  staff      0  4 24 12:13 test.txt
drwxr-xr-x   7 zion437  staff    238  4 19  2015 youthgroup
      20     173    1094 test.txt
```

마지막 줄에서 보면 알 수 있듯이 `ls -al`의 결과 밑에 `wc test.txt` 결과 값이 붙여 쓰여진다. `>`는 파일을 새롭게쓰고, `>>`는 파일 내용을 이어서 작성한다.

## 조합하여 사용하기

위에서 사용했던 리다이렉션 연산자들을 연속적으로 사용해서 아래와 같이 작성도 가능하다

```shell
ls -al > test.txt
wc < test.txt > test2.txt
```

두 번째 라인을 확인하면 `<`,`>` 연산자를 한 줄에 작성하여 입력하였다. 이렇게 작성하게 되면 먼저 `wc < test.txt`의 값을 구하고 후에 결과값을 `test2.txt`에 저장한다. `test2.txt`에는 아래와 같은 값이 저장되어 있을 것이다.

```shell
      20     173    1094
```

# 참고

- [https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80_%EC%8A%A4%ED%8A%B8%EB%A6%BC](https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80_%EC%8A%A4%ED%8A%B8%EB%A6%BC)
- [http://ryanstutorials.net/linuxtutorial/piping.php](http://ryanstutorials.net/linuxtutorial/piping.php)