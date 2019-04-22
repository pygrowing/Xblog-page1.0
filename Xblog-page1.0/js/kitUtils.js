var kitUtils = {
	debug: false,

	init: function () {
		if (typeof $('body').data('debug') === 'boolean' && $('body').data('debug') === true) {
			this.debug = true;
		}
		this.episerverIframeCheck();
	},

	isAndroid: function () {
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			return true;
		} else {
			return false;
		}
	},

	isMac: function () {
		if (navigator.platform.toLowerCase().indexOf('mac') > -1) {
			return true;
		} else {
			return false;
		}

	},

	isWindows: function () {
		if (navigator.platform.toLowerCase().indexOf('win') > -1) {
			return true;
		} else {
			return false;
		}
	},

	isLinux: function () {
		if (navigator.platform.toLowerCase().indexOf('linux') > -1) {
			return true;
		} else {
			return false;
		}
	},

	isIOS: function () {
		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
			return true;
		} else {
			return false;
		}
	},

	isBlackBerry: function () {
		if (navigator.userAgent.match(/BlackBerry/i)) {
			return true;
		} else {
			return false;
		}
	},

	isIEMobile: function () {
		if (navigator.userAgent.match(/IEMobile/i)) {
			return true;
		} else {
			return false;
		}
	},

	isOperaMini: function () {
		if (navigator.userAgent.match(/Opera Mini/i)) {
			return true;
		} else {
			return false;
		}
	},

	isMobileBrowser: function () {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
	},

	// Detects the OS and adds a class with current operating system to the HTML element
	detectOS: function () {
		if (kitUtils.isMac()) {
			document.documentElement.className += ' macos';
		} else if (kitUtils.isWindows()) {
			document.documentElement.className += ' windows';
		} else if (kitUtils.isLinux()) {
			document.documentElement.className += ' linux';
		}
	},

	detectBrowserVendor: function() {
		if (kitUtils.isFirefox()) {
			document.documentElement.className += ' firefox';
		} else if (kitUtils.isGoogleChrome()) {
			document.documentElement.className += ' chrome';
		} else if(kitUtils.isSafari()) {
			document.documentElement.className += ' safari';
		} else if (kitUtils.isInternetExplorer()) {
			document.documentElement.className += ' ie';
		}
	},

	// Detects the IE version and adds a class with browser version to the HTML element
	detectIEVersion: function () {
		if (kitUtils.isIE6()) {
			document.documentElement.className += ' ie6';
		} else if (kitUtils.isIE7()) {
			document.documentElement.className += ' ie7';
		} else if (kitUtils.isIE8()) {
			document.documentElement.className += ' ie8';
		} else if (kitUtils.isIE9()) {
			document.documentElement.className += ' ie9';
		} else if (kitUtils.isIE10()) {
			document.documentElement.className += ' ie10';
		}
	},

	isInternetExplorer: function() {
		if ((navigator.appVersion.indexOf('MSIE') != -1) || kitUtils.isIE10() || kitUtils.isIE6()) {
			return true;
		} else {
			return false;
		}
	},

	isFirefox: function() {
		// Firefox/Mac: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0
		if (navigator.userAgent.match(/Firefox/i)) {
			return true;
		} else {
			return false;
		}
	},

	isGoogleChrome: function() {
		// Chrome/Mac: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36
		if (navigator.userAgent.match(/Chrome/i)) {
			return true;
		} else {
			return false;
		}
	},

	isSafari: function() {
		// Safari/Mac: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18
		if (navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i)) {
			return true;
		} else {
			return false;
		}
	},

	isIE6: function() {
		if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
			return true;
		} else {
			return false;
		}
	},

	isIE7: function() {
		if (navigator.appVersion.indexOf('MSIE 7.') != -1) {
			return true;
		} else {
			return false;
		}
	},

	isIE8: function() {
		if (navigator.appVersion.indexOf('MSIE 8.') != -1) {
			return true;
		} else {
			return false;
		}
	},

	isIE9: function() {
		if (navigator.appVersion.indexOf('MSIE 9.') != -1) {
			return true;
		} else {
			return false;
		}
	},

	isIE10: function() {
		if ( /*@cc_on!@*/ false && document.documentMode === 10) {
			return true;
		} else {
			return false;
		}
	},

	isIE11: function() {
		if (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)) {
			return true;
		} else {
			return false;
		}
	},

	// Add class to body tag if page is in episerver edit mode
	episerverIframeCheck: function () {
		var isInIframe = (window.location !== window.parent.location) ? true : false;
		if (isInIframe) {
			$('body').addClass('episerver');
		}
	},

	// Adds class .last-child on all elements with :last-child. A fix for IE8
	lastChildFix: function () {
		if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
			$('*:last-child').addClass('last-child');
		}
	},

	log: function (message, data, type) {

		// Change log type if provided, else default to log
		type = typeof type !== 'undefined' ? type : 'log';

		// Check if debug is enabled
		if (this.debug) {

			// Check for console
			if (window.console) {

				// Check for provided data
				if(typeof data !== 'undefined' || data !== null || data.length > 0) {
					console[type](message, data);
				} else {
					console[type](message, data);
				}
			}
		}
	}
};