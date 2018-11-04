"use strict";

var directions = {
	topLeft: 'topLeft',
	topCenter: 'topCenter',
	topRight: 'topRight',
	midLeft: 'midLeft',
	midCenter: 'midCenter',
	midRight: 'midRight',
	botLeft: 'botLeft',
	botCenter: 'botCenter',
	botRight: 'botRight'
};

function getPixel(direction, $obj) {
	var result = {
		top: 0,
		left: 0
	};
	
	switch(direction) {
	case directions.topLeft:
		result.top = 50;
		result.left = ($(window).width() / 8) - ($obj.outerWidth() / 2);
		break;
	case directions.topCenter:
		result.top = 50;
		result.left = ($(window).width() / 2) - ($obj.outerWidth() / 2);
		break;
	case directions.topRight:
		result.top = 50;
		result.left = ($(window).width() / 8) * 7 - ($obj.outerWidth() / 2);
		break;
	case directions.midLeft:
		result.top = ($(window).height() / 2) - ($obj.outerHeight() / 2);
		result.left = ($(window).width() / 8) - ($obj.outerWidth() / 2);
		break;
	case directions.midCenter:
		result.top = ($(window).height() / 2) - ($obj.outerHeight() / 2);
		result.left = ($(window).width() / 2) - ($obj.outerWidth() / 2);
		break;
	case directions.midRight:
		result.top = ($(window).height() / 2) - ($obj.outerHeight() / 2);
		result.left = (($(window).width() / 8) * 7) - ($obj.outerWidth() / 2);
		break;
	case directions.botLeft:
		result.top = ($(window).height() - $obj.outerHeight()) - 50;
		result.left = ($(window).width() / 8) - ($obj.outerWidth() / 2);
		break;
	case directions.botCenter:
		result.top = ($(window).height() - $obj.outerHeight()) - 50;
		result.left = ($(window).width() / 2) - ($obj.outerWidth() / 2);
		break;
	case directions.botRight:
		result.top = ($(window).height() - $obj.outerHeight()) - 50;
		result.left = (($(window).width() / 8) * 7) - ($obj.outerWidth() / 2);
		break;
	default:
		result.top = ($(window).height() / 2) - ($obj.outerHeight() / 2);
		result.left = ($(window).width() / 2) - ($obj.outerWidth() / 2);
		break;
	}
	
	return result;
}

(function($) {
	
	/** message auto hidden */
	$.msgAutoHide = function(message, options, direction) {
		var $msg = $('<div id="msg-auto-hidden"></div>');
		$msg.html(message);
		
		if (options == undefined || typeof(options) !== 'object')
			options = {};
		
		var opts = $.extend(true, {}, $.msgAutoHide.defaults, options);
		
		$('body').append($msg);
		$msg.hide().css(opts.css);
		var pixel = getPixel(direction, $msg);
		var _extend = {
			css: {
				top: pixel.top + 'px',
				left: pixel.left + 'px'
			}
		};
		
		$.extend(true, opts, _extend);
		
		$msg.css(opts.css);
		$msg.fadeIn(opts.fadeInTime).delay(opts.delay).fadeOut(opts.fadeOutTime, function() {
			$(this).remove();
		});
	};
	
	/** message auto hidden default options */
	$.msgAutoHide.defaults = {
		fadeInTime: 1000,
		fadeOutTime: 1000,
		delay: 5000,
		css: {
			position: 'absolute',
			padding: '7px 10px',
			border: 'none',
			'border-radius': '4px',
			display: 'none',
			background: '#ffff00',
			color: 'red',
			'font-family': 'Arial, Helvetica, Tahoma',
			'font-style': 'italic',
			'font-size': '12px',
			margin: '0'
		}
	};
	
	/** message confirm */
	$.msgConfirm = function(message, options, yesCallback, noCallback) {
		var $overlay = $('<div id="overlay"></div>');
		var $msg = $('<div id="msg-confirm"></div>');
		var $title = $('<div id="msg-title"></div>');
		var $contents = $('<div id="msg-contents"></div>');
		$contents.html(message).css({
			padding: '15px 10px'
		});
		
		if (options == undefined || typeof(options) !== 'object')
			options = {};
		
		var opts = $.extend(true, {}, $.msgConfirm.defaults, options);
		
		var $contentTitle = $('<div></div>');
		$contentTitle.append('<span style="float: left; padding: 7px 10px; font-weight: bold;">' + opts.title + '</span>');
		var $btnClose = $('<span>&times;</span>');
		$btnClose.css({
			'font-weight': 'bold',
			cursor: 'pointer',
			float: 'right',
			padding: '0px 2px',
			'margin-top': '5px',
			'margin-right': '5px'
		});
		
		$btnClose.on('click', function(e) {
			$overlay.fadeOut(opts.fadeOutTime, function() {
				$overlay.remove();
			});
			$msg.fadeOut(opts.fadeOutTime, function() {
				$msg.remove();
			});
			
			return false;
		});
		
		$contentTitle.append($btnClose).append('<div style="clear: both;"></div>');
		$contentTitle.css({
			'border-bottom': '1px solid #DDD'
		});
		
		var $contentBottom = $('<div style="padding: 7px 10px; border-top: 1px solid #DDD;"></div>');
		var $btnOK = $('<input style="float: right; margin-right: 5px; color: #FFF; background: #0090ff; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;" type="button" value="' + opts.button.yes + '">');
		var $btnCancel = $('<input style="float: right; color: #FFF; background: #AAA; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;" type="button" value="' + opts.button.no + '">');
		$contentBottom.append($btnCancel).append($btnOK).append('<div style="clear: both;"></div>');
		
		$btnOK.on('click', function(e) {
			$overlay.fadeOut(opts.fadeOutTime, function() {
				$overlay.remove();
			});
			$msg.fadeOut(opts.fadeOutTime, function() {
				$msg.remove();
				if (yesCallback && typeof(yesCallback) === 'function')
					yesCallback.call();
			});
		});
		
		$btnCancel.on('click', function(e) {
			$overlay.fadeOut(opts.fadeOutTime, function() {
				$overlay.remove();
			});
			$msg.fadeOut(opts.fadeOutTime, function() {
				$msg.remove();
				if (noCallback && typeof(noCallback) === 'function')
					noCallback.call();
			});
		});
		
		$title.html($contentTitle);
		$msg.append($title);
		$msg.append($contents);
		$msg.append($contentBottom);
		
		$('body').append($overlay);
		$overlay.hide();
		$overlay.css({
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			background: '#000',
			opacity: '0.4',
			cursor: 'not-allowed',
			'z-index': '9999'
		});
		
		$('body').append($msg);
		$msg.hide().css(opts.css);
		var _top = 50;
		var _left = ($(window).width() / 2) - ($msg.outerWidth() / 2);
		var _extend = {
			css: {
				top: _top + 'px',
				left: _left + 'px'
			}
		};
		
		$.extend(true, opts, _extend);
		
		$msg.css(opts.css);
		$overlay.fadeIn(opts.fadeInTime);
		$msg.fadeIn(opts.fadeInTime);
	};
	
	/** message confirm default options */
	$.msgConfirm.defaults = {
		title: 'Notice',
		fadeInTime: 0,
		fadeOutTime: 0,
		css: {
			position: 'absolute',
			border: 'none',
			'border-radius': '4px',
			display: 'none',
			background: '#FFF',
			color: '#333',
			'font-family': 'Arial, Helvetica, Tahoma',
			'font-style': 'none',
			'font-size': '12px',
			'min-width': '200px',
			'z-index': '99999'
		},
		button: {
			yes: 'Yes',
			no: 'No'
		}
	};
	
	/** message */
	$.msg = function(message, options) {
		var $msg = $('<div id="msg-confirm"></div>');
		var $title = $('<div id="msg-title"></div>');
		var $contents = $('<div id="msg-contents"></div>');
		$contents.html(message).css({
			padding: '15px 10px'
		});
		
		if (options == undefined || typeof(options) !== 'object')
			options = {};
		
		var opts = $.extend(true, {}, $.msg.defaults, options);
		
		var $contentTitle = $('<div></div>');
		$contentTitle.append('<span style="float: left; padding: 7px 10px; font-weight: bold;">' + opts.title + '</span>');
		var $btnClose = $('<span>&times;</span>');
		$btnClose.css({
			'font-weight': 'bold',
			cursor: 'pointer',
			float: 'right',
			padding: '0px 2px',
			'margin-top': '5px',
			'margin-right': '5px'
		});
		
		$btnClose.on('click', function(e) {
			$msg.fadeOut(opts.fadeOutTime, function() {
				$msg.remove();
			});
			
			return false;
		});
		
		$contentTitle.append($btnClose).append('<div style="clear: both;"></div>');
		$contentTitle.css({
			'border-bottom': '1px solid #DDD'
		});
		
		$title.html($contentTitle);
		$msg.append($title);
		$msg.append($contents);
		
		$('body').append($msg);
		$msg.hide().css(opts.css);
		var _top = ($(window).height() / 8) - ($msg.outerHeight() / 2);
		var _left = ($(window).width() / 2) - ($msg.outerWidth() / 2);
		var _extend = {
			css: {
				top: _top + 'px',
				left: _left + 'px'
			}
		};
		
		$.extend(true, opts, _extend);
		
		$msg.css(opts.css);
		$msg.fadeIn(opts.fadeInTime);
	};
	
	/** message confirm default options */
	$.msg.defaults = {
		title: 'Notice',
		fadeInTime: 0,
		fadeOutTime: 0,
		css: {
			position: 'absolute',
			border: '1px solid #DDD',
			'border-radius': '4px',
			display: 'none',
			background: '#FFF',
			color: '#333',
			'font-family': 'Arial, Helvetica, Tahoma',
			'font-style': 'none',
			'font-size': '12px',
			'min-width': '200px',
			'z-index': '99999'
		},
		direction: $.msg.directions.topCenter
	};
	
	
})(jQuery);