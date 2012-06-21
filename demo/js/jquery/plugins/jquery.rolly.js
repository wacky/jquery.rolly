/*
 * Rolly jQuery Plugin version 0.8
 * http://lab.wacky-archive.com/Rolly/
 *
 * Copyright (c) 2012 wacky http://lab.wacky-archive.com/Rolly/
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {

	$.fn.Rolly = function(options) {

		var params = $.extend({}, $.fn.Rolly.defaults, options);

		return this.each(function() {

			var $wrapper = $(this);

			params.animH = $wrapper.parent().outerHeight();

			var $base = $wrapper
				.wrapInner('<span>')
					.find('span')
					.css({
							'position': 'absolute'
						,	'display': 'inline-block'
						,	'top': 0
						,	'left': 0
					});

			$wrapper.css({
				'position': 'relative'
			,	'display': 'inline-block'
			,	'vertical-align': 'bottom'
			,	'overflow': 'hidden'
			,	'width': $base.outerWidth()
			,	'height': params.animH
			});

			var interval = setInterval(function() {

				var $texts = $wrapper.find('span');

				if ($texts.size() > 1) {
					$texts.filter(':not(:last)').remove();
				}

				var color = (params.random)
					? params.colors[Math.floor(Math.random()*params.colors.length)]
					: params.colors[params.index]
				,	$inner = $wrapper.find('span:eq(0)')
				,	$clone = $inner.clone().css(
						{'top': (params.direction === 'up')
							? params.animH
							: -(params.animH), 'color': color
						});

				$wrapper.append($clone);

				$inner.stop(true,false).animate({ 'top': ((params.direction === 'up') ? '-' : '+')+params.animH }, params.speed, params.easing);
				$clone.stop(true,false).animate({ 'top': 0 }, params.speed, params.easing);

				/* change color */
				if (params.index >= params.colors.length -1) {
					params.index = 0;
				} else {
					params.index++;
				}

			}, params.delay);
		});
	};

	$.fn.Rolly.defaults = {
		'colors': [
			'#5c5c5c'
		,	'#b7275f'
		,	'#aaffdd'
		,	'#ffaadd'
		,	'#ddffaa'
		]
	,	'index': 0
	,	'random': false
	,	'speed': 1000
	,	'delay': 1200
	,	'color': 0
	,	'direction': 'up'
	,	'easing': 'swing'
	};

})(jQuery);
