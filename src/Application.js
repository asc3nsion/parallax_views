import device;
import animate;
import ui.SpriteView;
import ui.ImageView;
import ui.View as View;
import ui.ViewPool as ViewPool;
import ui.ImageScaleView;
import ui.resource.loader as loader;

// my modules
import src.ParallaxViews as ParallaxViews;

exports = Class(GC.Application, function () {

	//Constants
	const GRAVITY = 1400;
	const PLAYERSPEED = 1000;

	this.initUI = function () {

		this.createBG = function (){

			//instantiate the obj
			this.parallaxViews = new ParallaxViews({
				superview: this.view,
				width: this.view.style.width,
				height: this.view.style.height,
			});

			this.parallaxViews.addBGView(new ui.ImageScaleView({
				scaleMethod: 'cover',
				image: 'resources/images/level/backgroundSky.png',
			}));
			//create a parallax view pool of images to scroll
			//this.createViewLayer = function(layer, link, x, y, speed, w, h, offset)
			this.parallaxViews.createViewLayer(0, 'resources/images/level/midgroundBrush.png', 0, 150, PLAYERSPEED*15, 512, 106, 0);
			this.parallaxViews.createViewLayer(1, 'resources/images/level/midgroundTree1.png', 0, 200, PLAYERSPEED*1.5, 100, 80, 0);
			this.parallaxViews.createViewLayer(2, 'resources/images/waves00.png', 0, 200, PLAYERSPEED, 256, 256, 0);

		}
		
		//initialize
		this.createBG();
	};


	
	this.launchUI = function () {};
});
