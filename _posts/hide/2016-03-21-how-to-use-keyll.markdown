---
layout: post
title: jekyll 사용방법
date: 2016-03-21 19:11:01 +0900
categories: hide
published: false
comments: false
---

이 포스팅은 jekyll의 환경변수나 만드는 방법을 알려주는 것이 아니라, 내가 만들면서 사용했던 것들을 팁 형식으로 적은 글이다. 또 다른 분들이 jekyll blog를 만든다면 아래의 글이 도움이 되었으면 좋겠다. 문서는 지속적으로 업데이트가 되고 있다.

<!--more-->

# 목차

1. 현재 글의 카테고리 이전, 이후 글 버튼 생성하기
2. tag 별로 post 리스팅하기
3. 작성중인 문서 관리법
4. rake를 이용해 markdown file 생성하기
5. disqus 댓글 카운트 노출
6. post에 선택적으로 disqus 댓글 보이기
7. image file 관리하기
8. jekyll blog에 ssl 적용하기
9. uri 전략
10. 포스팅을 했는데, 노출되지 않을 때
11. porse.io 이용해보기
12. 사용자 변수 활용해보기
13. jekyll에서 favicon.ico 사용하기 
14. window에서 Gemfile
15. jekyll에서 플로그인은...?

13
http://stackoverflow.com/questions/30551501/unable-to-set-favicon-using-jekyll-and-github-pages

14
http://yizeng.me/2013/05/10/setup-jekyll-on-windows/

## 현재 글의 카테고리 이전, 이후 버튼 생성하기


작성중인 문서 관리법

```shell
jekyll serve --unpublished
```

이미지 관리

https://pixabay.com/

https://gist.github.com/fnichol/867550

```
gem install flickraw
```

- http://blog.pixarea.com/2012/07/fetch-images-from-flickr-to-show-in-octopress-slash-jekyll/
- http://wern-ancheta.com/blog/2013/10/13/getting-started-with-flickr-api/


https://api.flickr.com/services/rest/?
method=flickr.photos.search
&api_key=56517172bcde43971b25a82a2ceaee90
&user_id=139153471@N04
&format=json
&nojsoncallback=1
&extras=url_o


https://api.flickr.com/services/rest/?
method=flickr.photos.getRecent
&api_key=56517172bcde43971b25a82a2ceaee90
&format=json
&nojsoncallback=1
&extras=url_o



https://api.flickr.com/services/rest/?
method=flickr.photos.getRecent
&api_key=56517172bcde43971b25a82a2ceaee90
&photo_id=25961264645
&format=json
&nojsoncallback=1


https://api.flickr.com/services/rest/?
method=flickr.people.getInfo
&api_key=56517172bcde43971b25a82a2ceaee90
&user_id=139153471@N04



https://www.flickr.com/photos/139153471/25961264645 

 
https://api.flickr.com/services/rest/?
method=flickr.photos.getInfo
&api_key=56517172bcde43971b25a82a2ceaee90
&photo_id=25961264645
&format=json
&nojsoncallback=1 
 

# 15

- http://gumpcha.github.io/blog/github-pages-with-jekyll-custom-plugin/
- http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html

이렇게 해야한다. 넘나 복잡한 것.