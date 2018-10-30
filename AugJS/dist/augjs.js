(function($) {
	
	/** message auto hidden */
	$.msg = function(message, options) {
		var $msg = $('<div id="msg-auto-hidden"></div>');
		$msg.html(message);
		
		var _top = (window.innerHeight / 8) - ($msg.height() / 2);
		var _left = (window.innerWidth / 2) - ($msg.width() / 2);
		var _extend = {
			css: {
				top: _top + 'px',
				left: _left + 'px'
			}
		};
		
		if (options == undefined || typeof(options) !== 'object')
			options = {};
		
		var opts = $.extend(true, {}, $.msg.defaults, _extend, options);
		console.log(opts);
		
		$msg.css(opts.css);
		$('body').append($msg);
		$('#msg-auto-hidden').fadeIn(opts.fadeInTime).delay(opts.delay).fadeOut(opts.fadeOutTime, function() {
			$(this).remove();
		});
	};
	
	/** message auto hidden default options */
	$.msg.defaults = {
		fadeInTime: 1000,
		fadeOutTime: 1000,
		delay: 5000,
		css: {
			position: 'absolute',
			padding: '5px 10px',
			border: 'none',
			'border-radius': '4px',
			display: 'none',
			background: '#555',
			color: '#EEE'
		}
	};
	
})(jQuery);