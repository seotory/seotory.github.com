---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-09-05 12:04:16
categories: 
published: false
comments: false
---

{{site.url}}

jekyll 문법 테스트용 페이지입니다.
 
# 코드관련

## 문구 강조

`code` 강조 테스트

## 구문강조 3가지

```
test.
```


You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:


{% highlight ruby linenos %}
def print_hi(name)
	puts "Hi, #{name}"
end
print_hi('Tom')
# prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

{% highlight java linenos %}
public class Users implements Cloneable {
    private List userList;

    public Users() {
        userList = new ArrayList();
    }

    public Users(List list) {
        this.userList = list;
    }

    public void loadData () {
        userList.add("ssw");
        userList.add("bjh");
        userList.add("ysm");
        userList.add("hoj");
    }

    public List getUserList() {
        return userList;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        List temp = new ArrayList();
        for (String s : this.getUserList()) {
            temp.add(s);
        }
        return new Users(temp);
    }
}
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

~~~ javascript
function test() 
{

}
~~~

test

~~~ javascript linenos
function test() 
{

}
~~~

## test

``` javascript
function test() 
{

}
```

- test
    - 1.1 인가?
{% highlight javascript %}
function test() 
{

}
{% endhighlight %}

> This is a blockquote.
>     on multiple lines
that may be lazy.
>
> This is the second paragraph

> This is a paragraph.
>
> > A nested blockquote.
>
> ## Headers work
>
> * lists too
>
> and all other block-level elements

> A code block:
>
> >
``` javscript
function test() {}
```
>

> This is a paragraph inside
a blockquote.
>
> > This is a nested paragraph
that continues here
> and here
> > and here 한글 테스트.

``` javascript
function test(){} 
```

>     ruby -e 'puts :works'

~~~
def what?
  42
end
~~~
{: .language-ruby}

- First item A second paragraph
  - nested list

    > blockquote

### test

* Second item
* {:.cls} This item has the class "cls".
  Here continues the above paragraph.
* This is a normal list item.
- 1qjs
- 2qjs

테스트 하는 중입니다.

- test1
- test2
- test3

# h1

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.

## h2

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.

### h3

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.

#### h4

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.

##### h5

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.

- list 1
- list 2
- list 3
  - list 3-1
  - list 3-2
    - list 3-2-1
      - list 3-2-1-1

###### h6

You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.


<span class="icon green">
  <i class="fa fa-rss"></i>RSS
</span>
<span class="icon orange">
  <i class="fa fa-rss"></i>rss
</span>

<span class="icon blue">
  <i class="fa fa-rss"></i>rss
</span>

<span class="icon gray">
  <i class="fa fa-rss"></i>rss
</span>

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

- [jekyll kmarkdown option](http://kramdown.gettalong.org/rdoc/Kramdown/Options.html){:target="_blank"}

---

## icon

```css
ul.social-buttons li a {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 20px;
    line-height: 40px;
    outline: 0;
    color: #fff;
    background-color: #222;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
}
```

```html
<a href="http://twitter.com/jekyllrb"><i class="fa fa-twitter"></i></a>
```

------------

|test|1|2|3|
|test|1|2|3|

|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------+------------+-----------------+----------------|

----------

- list1  

      function(){}
        

----------

# First level header

### Third level header    ###

## Second level header ######

kramdown
: A Markdown-superset converter

Maruku
:     Another Markdown-superset converter

-----------

ee<div>test
</div>

------

This is some text.[^1]. Other text.[^footnote].

[^1]: Some *crazy* footnote definition.

[^footnote]:
    > Blockquotes can be in a footnote.

        as well as code blocks

    or, naturally, simple paragraphs.

[^other-note]:       no code block here (spaces are stripped away)

[^codeblock-note]:
        this is now a code block (8 spaces indentation)

-----

This is some text not written in HTML but in another language!

*[another language]: It's called Markdown

*[HTML]: HyperTextMarkupLanguage
{:.mega-big}

-------------

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}

---
--------

test for test
{:id="test"}  

{:.ruby}
    Some code here

testsetstsetset  f  
setsetsetsdfs
  

{{page.path}}

{{page.url | }}

<div>test</div>  