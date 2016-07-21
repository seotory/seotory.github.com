var aEl = document.getElementsByTagName('article')[0];
if ( aEl ) {

;(function(window, ReadDoc) {

var fs = {
	slice: Array.prototype.slice,
	observeDOM: (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
	})()
}

var ReadDoc = ReadDoc || function ( option ) {

	if ( !option || !option.target )
		return ;

	this.option = option;
	this.target = this.option.target;
	this.targetHeight = 0;
	this.printTarget = this.option.printTarget || '';
	this.root = document.querySelectorAll( this.target )[0];
	this.isHeaderTag = this.option.isHeaderTag || true; 
	this.topDepth = 9;

	this.itemIdx = 0;
	this.itemsRegExp = this.option.itemsRegExp || 'H[1-6]';
	this.itemsInfo = {};
	this.itemsTops = [];

	this.init();
}

ReadDoc.OPTION = {
	marginTop : 15
}

ReadDoc.prototype.refresh = function () {

	var that = this;
	var regExp = that.itemsRegExp;
	var idx = 0;
	var items = [];
	var scrollTop = document.body.scrollTop;

	this.targetHeight = that.root.offsetHeight;
	this.itemsInfo = {};
	this.itemsTops = [];

	for ( var p in that.root.children ) {
    if ( p > -1 ) {
      var childEl = that.root.children[p];
      var tagName = childEl.tagName;

      if ( (new RegExp(regExp, 'ig')).test(tagName) ) {
        var locationInfo = childEl.getBoundingClientRect();
        var childElOfferTop = Math.floor(locationInfo.top - ReadDoc.OPTION.marginTop);

        items.push({
          index: idx,
          tagName: tagName,
          txt: childEl.textContent,
          top: scrollTop + childElOfferTop,
          el: childEl
        });

      	if ( this.isHeaderTag ) {
	        var depth = tagName.replace( /H/ig, '' );
	        if ( this.topDepth > depth ) this.topDepth = depth;
	        items[idx].depth = depth;
      	}

        this.itemsTops.push( items[idx].top );
        idx++;
      }
    }
  }
  this.itemsInfo.list = items;
  if ( this.printTarget ) $( this.printTarget ).html ( this.print() );
}

ReadDoc.prototype.print = function () {
	
	var html = '';
	var items = this.itemsInfo.list || [];

  for (var i=0 ; i<items.length ; i++) {

    var row = items[i];
    var headerStr = '';
    if ( this.isHeaderTag ) {
    	headerStr = '<li class="title-index-'+(i+1)+' title-depth-'+(row.depth-(this.topDepth-1))+'" ' 
    								+ 'data-title-depth="'+row.depth+'"'
    								+ '>';
    } else {
    	headStr = '<li class="title-index-'+(i+1)+'">';
    }

    html += headerStr
        + '<a href="#" data-top="'+row.top+'" onclick="ReadDoc.move(this, '+i+');return false;">'
        + row.txt 
        + '</a>'
        + '</li>';
  }
  
  return '<ul>'+html+'</ul>';
}

ReadDoc.prototype.readPosition = function ( option ) {

	var that = this;

	function moveIdx () {
		that.itemIdx = 0;
	  for ( var i=0 ; i<that.itemsTops.length ; i++ ) {
	    if ( that.itemsTops[i] <= document.body.scrollTop ) {
	      that.itemIdx ++;
	    } 
	  }
	}

	moveIdx();

  if ( option.onReachEvent ) option.onReachEvent( that.itemIdx ); 

	return function ( cursor ) {
		if ( that.itemsTops[that.itemIdx] <= cursor && (that.itemIdx+1) <= that.itemsTops.length ) {
			if ( that.itemsTops[that.itemIdx+1] <= cursor ) {
			  moveIdx();
			} else {
      	that.itemIdx ++;
			}
      if ( option.onReachEvent ) option.onReachEvent( that.itemIdx ); 
    } else if ( that.itemIdx > 0 && that.itemsTops[that.itemIdx-1] > cursor ) {
    	if ( that.itemsTops[that.itemIdx-1] > cursor ) {
			  moveIdx();
    	} else {
      	that.itemIdx --;
    	}
      if ( option.onReachEvent ) option.onReachEvent( that.itemIdx ); 
    }
	}
}

ReadDoc.prototype.readProcess = function ( option ) {

	var that = this;
  var topGap = document.body.scrollTop + Math.floor(that.root.getBoundingClientRect().top);

	return function ( cursor ) {
		if ( cursor >= topGap ) {
      var per = ((cursor-500) / that.root.offsetHeight) * 100;
      if ( per <= 100 ) {
				if ( option.onChangeEvent ) option.onChangeEvent ( per );
      } else {
      	if ( option.onChangeEvent ) option.onChangeEvent ( 100 );
      }
    } else {
      if ( option.onChangeEvent ) option.onChangeEvent ( 0 );
    }
	}
}

ReadDoc.prototype.readBox = function ( option ) {
  
	var el = document.querySelector( option.target );
  var topGap = document.body.scrollTop + Math.floor(el.getBoundingClientRect().top);
  var topMargin = option.marginTop || 15;

  var startPosition = topGap-topMargin;
  var endPosition = topGap + option.limiteHeight - topMargin - el.offsetHeight;

  return function ( cursor ) {
    var limiteHeight = option.limiteHeight;
    if ( cursor >= startPosition && cursor < endPosition ) {
      el.style.top = '10px';
      el.style.position = 'fixed';
    } else if ( cursor - topMargin < topGap ) {
      el.style.top = '0px';
      el.style.position = 'absolute';
    } else {
    	el.style.top = (limiteHeight-el.clientHeight) + 'px';
      el.style.position = 'absolute';
    }
  }
}

ReadDoc.prototype.run = function () {
	var that = this;
	var readPosition = that.readPosition( that.option.readPosition );
	var readProcess = that.readProcess( that.option.readProcess );
	var readBox = that.readBox( that.option.readBox );

	$( window ).scroll(function () {

		if ( that.targetHeight != that.root.offsetHeight )
			that.refresh();

    var cursor = $(window).scrollTop();
    readPosition( cursor );
    readProcess( cursor );
    readBox( cursor );
  });
}

ReadDoc.prototype.init = function () {
	this.refresh();
}

ReadDoc.move = function ( el ) {
	window.scrollTo(0, el.dataset.top);
}

window.ReadDoc = ReadDoc;
})(window);

var a = new ReadDoc({
	target: 'article',
	printTarget: '.post .post-info-title',
	readPosition : {
		onReachEvent : function ( idx ) {
      $('.post .post-info-title').find('li').removeClass('on');
      idx = idx-1;
      if ( idx > -1 ) {
        $('.post .post-info-title').find('li').eq(idx).addClass('on');
      }
		}
	},
	readProcess : {
		onChangeEvent : function ( per ) {
			var bar = document.querySelector(".progress div");
			bar.style.width = per + '%';
		}
	},
	readBox : {
		target: '.post .post-info-move',
		marginTop: 15,
		limiteHeight: document.querySelector('.post').offsetHeight
	}
});
a.run();

}