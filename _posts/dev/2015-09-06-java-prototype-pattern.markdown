---
layout: post
title:  java prototype pattern (프로토타입 패턴)
date:   2015-09-06 12:04:16
categories: dev
published: true
comments: true
tags: 
- java
- pattern
---
`prototype pattern`은 생산적인 디자인 패턴 중에 하나로써, 패턴 내에서 object의 생성을 제공해준다. `prototype pattern`은 object 생성이 높은 비용으로 수 많은 요청을 하는 경우, 또는 비슷한 object를 지속적으로 생성해야 할 때 유용하게 사용할 수 있다. `prototype pattern`은 본래의 object로 부터 새로운 object를 만들어내며(서로 다른 인스턴스), 각 객체에 따라 데이터 수정이 가능한 메커니즘을 제공한다.

이 패턴은 예제와 함께 보면 쉽게 이해할 수 있다. 우리가 db로 부터 데이터를 가져온 경우를 생각해보자. 프로그램 내에서 여러번 데이터 수정이 이루어진다고 할 때, 똑같은 데이터를 매번 db에서 가져오는 것은 좋은 생각은 아니다. `prototype pattern`은 이런 문제점을 해결하기 위해 원래의 object의 property들을 확인하여 deep 또는 shallow copy(얕은 카피, 깊은 카피)를 시도하여 clone object를 제공해준다.

아래가 간단한 `prototype pattern`의 예제이다.

``` java
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
```

Cloneable class의 clone() 를 구현하여 복제 메서드를 만드는 것에 주목하자. 위의 클래스는 아래와 같이 사용할 수 있다.

``` java
public class main {
    public static void main(String[] args) throws Exception {
        Users originUsers = new Users();
        originUsers.loadData();

        Users cloneUsers = (Users)originUsers.clone();
    }
}
```

만약 userList의 클론이 제공되지 않는다면 매번 우리는 userList를 DB 또는 file로 부터 로드해야 할 것이다. `prototype pattern`은 그런 비효율을 줄이기 위해 사용된다.