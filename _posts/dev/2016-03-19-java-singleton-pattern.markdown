---
layout: post
title:  java singleton pattern (싱글톤 패턴)
date:   2016-03-19 12:04:16
categories: dev
published: true
comments: true
tags: 
- java
- pattern
---

예전 블로그에서도 singleton 에 대한 글을 쓴적이 있다. 그때는 매우 단순하게 적었으나 이번에는 조금 방대할 것이다. 단일 인스턴스를 다양하게 만들 수 있는 
방법을 예제로 통해 한번 알아 보도록 하자.

<!--more-->

# singleton 이란?

프로그래밍 세계에 OOP 의 개념이 생기면서 객체 자체에 대한 많은 연구와 패턴(pattern)들이 생겨났다. singleton pattern은 인스턴스가 사용될 때에 똑같은 인스턴스를 만들어 내는 것이 아니라, 동일 인스턴스를 사용하게끔 하는 것이 기본 전략이다. 프로그램상에서 동일한 커넥션 객체를 만든다던지, 하나만 사용되야하는 객체를 만들때 매우 유용하다. singleton pattern은 4대 디자인 패턴에 들어갈 정도로 흔히 쓰이는 패턴이다. 물론 core java(java.lang.Runtime, java.awt.Desktop 등등)에서도 singleton pattern이 사용된다.

# Eager initialization

아래가 가장 기본적인 singleton pattern이다. 전역 변수로 instance를 만드는데 `private static`을 이용한다. `static`이 붙은 클래스변수는 인스턴스화에 상관없이 사용이 가능하게 된다. 하지만 앞의 `private` 접근제어자로 인해 `EagerInitialization.instance`로의 접근은 불가능하다. 이런 상태에서 생성자를 `private`로 명시한다. 생성자를 `private`로 붙이게되면, `new` 키워드를 사용할 수 없게된다. 즉 다른 클래스에서 `EagerInitialization instance = new EagerInitialization();` 이런 방법을 통한 인스턴스 생성은 불가능해진다. 결국 외부 클래스가 EagerInitialization 클래스의 인스턴스를 가질 수 있는 방법은 11번째 라인에 있는 `getInstance()` method를 사용하는 수 밖에 없다.

```java
public class EagerInitialization {
	// private static 로 선언.
	private static EagerInitialization instance = new EagerInitialization();
	// 생성자
	private EagerInitialization () {
		System.out.println( "call EagerInitialization constructor." );
	}
	// 조회 method
	public static EagerInitialization getInstance () {
		return instance;
	}
	
	public void print () {
		System.out.println("It's print() method in EagerInitialization instance.");
		System.out.println("instance hashCode > " + instance.hashCode());
	}
}
```

위의 단순한 singleton pattern은 리소스가 작은 프로그램일때엔 고도화 대상이 아니다. 하지만 프로그램의 크기가 커져서 수 많은 클래스에서 위와 같은 singleton pattern을 사용한다고 가정해보자. 3번째 라인의 `new EagerInitialization();`으로 인해 클래스가 load 되는 시점에 인스턴스를 생성시키는데 이마저도 부담스러울 수가 있다. 또한 이 소스는 EagerInitialization 클래스가 인스턴스화 되는 시점에 어떠한 에러처리도 할 수가 없다.

# static block initialization

```java
public class StaticBlockInitalization {
	private static StaticBlockInitalization instance;
	private StaticBlockInitalization () {}
	
	static {
		try {
			System.out.println("instance create..");
			instance = new StaticBlockInitalization();
		} catch (Exception e) {
			throw new RuntimeException("Exception creating StaticBlockInitalization instance.");
		}
	}
	
	public static StaticBlockInitalization getInstance () {
		return instance;
	}
	
	public void print () {
		System.out.println("It's print() method in StaticBlockInitalization instance.");
		System.out.println("instance hashCode > " + instance.hashCode());
	}
	
}
```

`static` 초기화블럭을 이용하면 클래스가 로딩 될 때 최초 한번 실행하게 된다. 특히나 초기화블럭을 이용하면 logic을 담을 수 있기 때문에 복잡한 초기변수 셋팅이나 위와 같이 에러처리를 위한 구문을 담을 수 있다. 첫 번째 패턴보다 좋아보이지만 인스턴스가 사용되는 시점에 생성되는 것은 아니다.

# lazy initialization

이제 클래스 인스턴스가 사용되는 시점에 인스턴스를 만드는 singleton pattern을 배워보도록 하자. 아래 소스의 lazy initialization pattern은 필요할때 인스턴스를 생성시키는 것이 핵심이다.

```java
public class LazyInitialization {
	
	private static LazyInitialization instance;
	private LazyInitialization () {}
	
	public static LazyInitialization getInstance () {
		if ( instance == null )
			instance = new LazyInitialization();
		return instance;
	}
	
	public void print () {
		System.out.println("It's print() method in LazyInitialization instance.");
		System.out.println("instance hashCode > " + instance.hashCode());
	}
}
```

`new LazyInitialization();` 가 어디에 선언되었는지 주목해보자. `getInstance()` method 안에서 사용되었다. if문을 이용해 instance가 null 인 경우에만 `new`를 사용해 객체를 생성하였다. 최초 사용시점에만 인스턴스화 시키기 때문에 프로그램이 메모리에 적재되는 시점에 부담이 많이 줄게된다. 하지만 여전히 문제는 남아있다. 만약 프로그램이 muilti thread 방식이라면 위와 같은 singleton pattern은 안전하지 않다. 동일 시점에 `getInstance()` method를 호출하면 인스턴스가 두번 생길 위험이 있다.

# thread safe initalization

위에서 문제가 되었던 muilit thread문제를 해결하기 위해 synchronized(동기화)를 사용하여 singleton pattern을 구현한다. 여러 thread들이 동시에 접근해서 인스턴스를 생성시키는 위험은 없어졌다. 하지만 수 많은 thread 들이 `getInstance()` method 를 호출하게 되면 높은 cost 비용으로 인해 프로그램 전반에 성능저하가 일어난다.

```java
public class ThreadSafeInitalization {
	
	private static ThreadSafeInitalization instance;
	private ThreadSafeInitalization () {}
	
	public static synchronized ThreadSafeInitalization getInstance () {
		if (instance == null)
			instance = new ThreadSafeInitalization();
		return instance;
	}
	
	public void print () {
		System.out.println("It's print() method in ThreadSafeInitalization instance.");
		System.out.println("instance hashCode > " + instance.hashCode());
	}
	
}
```

# initialization on demand holder idiom

미국 메릴랜드 대학의 컴퓨터 과학 연구원인 Bill pugh 가 기존의 java singleton pattern이 가지고 있는 문제들을 해결 하기 위해 새로운 singleton pattern을 제시하였다. Initialization on demand holder idiom기법이다. 이것은 jvm 의 class loader의 매커니즘과 class의 load 시점을 이용하여 내부 class를 생성시킴으로 thread 간의 동기화 문제를 해결한다.

```java
public class InitializationOnDemandHolderIdiom {
	
	private InitializationOnDemandHolderIdiom () {}
	private static class Singleton {
		private static final InitializationOnDemandHolderIdiom instance = new InitializationOnDemandHolderIdiom();
	}
	
	public static InitializationOnDemandHolderIdiom getInstance () {
		System.out.println("create instance");
		return Singleton.instance;
	}
}
```

initialization on demand holder idiom 역시 lazy initialization이 가능하며 모든 java 버젼과, jvm에서 사용이 가능하다. 현재 java 에서 singleton 을 생성시킨다고 하면 거의 위의 방법을 사용한다고 보면 된다.

# enum initialization

Joshua Bloch가 작성한 effective java 책에서 enum singleton 방법이 소개 되었다.

```java
public enum EnumInitialization {
	INSTANCE;
	static String test = "";
	public static EnumInitialization getInstance() {
		test = "test";
		return INSTANCE;
	}
}
```

enum 이 singleton pattern 으로 사용될 수 있는 이유는 아래와 같다.

- INSTANCE 가 생성될 때, multi thread 로 부터 안전하다. (추가된 methed 들은 safed 하지 않을 수도 있다.)
- 단 한번의 인스턴스 생성을 보장한다.
- 사용이 간편하다.
- enum value는 자바 프로그램 전역에서 접근이 가능하다.

# using reflection to destroy singleton

위에서 여러 방법으로 singleton을 만들어 보았으니 이번엔 java의 reflection을 이용하여 singleton을 깨뜨려 보는법도 배워보자. 누군가 작성한 코드를 원본 수정없이 작업해야 할때 이용될 수 있을 것이다.

```java
public class UsingReflectionToDestroySingleton {
	
	public static void main (String[] args) {
		EagerInitialization instance = EagerInitialization.getInstance();
		EagerInitialization instance2 = null;
		
		try {
			Constructor[] constructors = EagerInitialization.class.getDeclaredConstructors();
			for ( Constructor constructor : constructors ) {
				constructor.setAccessible(true);
				instance2 = (EagerInitialization)constructor.newInstance();
			}
		} catch (Exception e) {
			
		}
		
		System.out.println(instance.hashCode());
		System.out.println(instance2.hashCode());
		
	}
}
```

위의 코드를 실행해보면 아래 `System.out.println();`의 두 라인에서 찍히는 `hachCode()`값이 다른 것을 확인 할 수 있다. java의 reflection은 매우 강력하다. 설령 class 의 생성자가 private 일지라도 강제로 가져와서 새로운 인스턴스 생성이 가능하다. 결국 singleton pattern을 깨뜨리는 것이다. 이 외에도 reflection을 여러곳에서 사용할 수 있으니 알아두는 것이 좋다.
