import device;
import animate;
import ui.SpriteView;
import ui.ImageView;
import ui.View as View;
import ui.ViewPool as ViewPool;
import ui.ScrollView as ScrollView;

var ParallaxViews = exports = Class(View, function (supr) {

	var defaults = {
		
	};

	this.init = function(opts) {
		this._opts = opts = merge(opts, defaults);
		supr(this, 'init', arguments);
	}
	// add static bg view
	this.addBGView = function (view) {
		view.style.width = this.style.width;
		view.style.height = this.style.height;
		this.addSubview(view);
	}

	//create layer with a viewpool
	this.createViewLayer = function(layer, link, x, y, speed, w, h, offset) {
		this.layer = new BGPool({
			superview: this.view,
			x: x,
			y:y
		});

		this.addSubview(this.layer);
		this.layer.setImgAttr(layer, link, x, y, speed, w, h, offset);
	}
	

});

// this is the BG pool class
var BGPool = Class(ui.ImageView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.myImages = []//create array to track images in my pool
		this.imageViewPool = new ViewPool({
			ctor: ImageObj,
			initCount: 1,
			initOpts:{
				parent:this,
			}
		});
	};
	this.setImgAttr = function (layer, link, x, y, speed, w, h, offset) {
		this.myLayer = layer;
		this.myImg = link;
		this.myX = x;
		this.myY = y;
		this.mySpeed = speed;
		this.myWidth = w;
		this.myHeight = h;
		this.scrollX = w;//this is the x coordinate we move to each iteration
		this.resetViews();
	};
	//need a function to setup and position the views in the pool
	this.resetViews = function () {
		var imgMult = Math.ceil((device.width/this.myWidth) + 2); //the number of imgs need to cover screen
		this.style.update({x: 0}); //reset the parent view to 0

		for (var i = 0; i < imgMult; i++) {
			var _x = this.myWidth*(i);
			var _v = this.imageViewPool.obtainView();
			if(i===i){this.end = _x;}
			_v.setImage(this.myImg);

			_v.style.update({
				width: this.myWidth,
				height: this.myHeight,
				x: _x,
				y: this.myY
			});
			_v.updateOpts({
				superview: this.view,
				visible: true
			});
			
		};
		
		this.BGAnimate(this,this.mySpeed, this.myWidth, 0 );

	}

	this.newView = function () {
		//add more stuff here eventially
		this.BGAnimate(this,this.mySpeed, this.myWidth, 0 );
	}

	this.BGAnimate = function (view, speed, width, offset) {

		animate(this).clear()

		.then({x: -this.scrollX}, speed, animate.linear, 0)

		.then(bind(this, function(){
			if(this.myImages.length>0){
				var _v = this.myImages.shift(); //removes and returns first element in array
				this.end += width;
				this.scrollX += width;
				_v.style.update({x: this.end});
				this.newView();//call again
			}else{
				this.scrollX = width;
				this.imageViewPool.releaseAllViews();
				this.resetViews();
			}

		}))
	}



});

var ImageObj = Class(ui.ImageView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);
	};

	this.onObtain = function() {

    };

    this.onRelease = function() {

    };


});