/**
 * Detect browser, browser version and OS
 *
 * @class
 * @name detectBrowser
 * @version 1.0.0
 * @author Igor Timohin <timohin.i@gmail.com>
 * @copyright Igor Timohin 2015
 *
 * @example
 * var userBrowserIs = new detectBrowser();
 * console.log(userBrowserIs.getBrowser()); // chrome
 * console.log(userBrowserIs.getOS()); // mac
 * console.log(userBrowserIs.getVersion()); // 45.0.2454.93
 * */
var detectBrowser = function() {

    /**
     * @name detectBrowser#that
     * @type {detectBrowser}
     */
    var that = this;

    /**
     * Get browser UserAgent
     * @var
     * @type {string}
     */
    var _ua = window.navigator.userAgent;

    /**
     * Search browser identities in UserAgent string
     * @constant
     * @type {{opera: boolean, msie: boolean, msie6: boolean, msie7: boolean, msie8: boolean, msie9: boolean, mozilla: boolean, chrome: boolean, safari: boolean, msie_mobile: boolean, safari_mobile: boolean, opera_mobile: boolean, opera_mini: boolean, search_bot: boolean}}
     */
    var browser = {
        opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
        msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
        msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
        msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
        msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
        msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
        mozilla: /firefox/i.test(_ua),
        chrome: (!((/opera/i.test(_ua) || /opr/i.test(_ua))) && /chrome/i.test(_ua)),
        safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
        msie_mobile: /iemobile/i.test(_ua),
        safari_mobile: /iphone|ipod|ipad/i.test(_ua),
        opera_mobile: /opera mini|opera mobi/i.test(_ua),
        opera_mini: /opera mini/i.test(_ua),
        search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
    };

    /**
     * Search browser version identities in UserAgent string
     * @constant
     * @type {{version: *}}
     */
    var versions = {
        version: (_ua.match( /.+(?:me|ox|on|rv|it|era|opr|ie|msie)[\/: ]([\d.]+)/ ) || [0,'0'])[1]
    };

    /**
     * Search OS identities in UserAgent string
     * @constant
     * @type {{mac: boolean, iphone: boolean, ipod: boolean, iphone4: boolean, ipod4: boolean, ipad: boolean, android: boolean, bada: boolean, mobile: boolean}}
     */
    var os = {
        mac: /mac/i.test(_ua),
        iphone: /iphone/i.test(_ua),
        ipod: /ipod/i.test(_ua),
        iphone4: /iphone.*OS 4/i.test(_ua),
        ipod4: /ipod.*OS 4/i.test(_ua),
        ipad: /ipad/i.test(_ua),
        android: /android/i.test(_ua),
        bada: /bada/i.test(_ua),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua)
    };

    /**
     * Return user browser name
     * @returns {string}
     * @name detectBrowser#getBrowser
     */
    that.getBrowser = function() {

        for (var browserIs in browser) {
            if (browser[browserIs] == true ) {
                return browserIs;
            }
        }
    };

    /**
     * Return user browser version
     * @returns {string}
     * @name detectBrowser#getVersion
     */
    that.getVersion = function() {

         // IE version is not correctly provides and we get 0. If it is so - run second check (else)
        if (versions.version != 0) {
            return versions.version.split('.')[0];
        }
        else {
            var ieVersion = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer')
            {
                var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(_ua) != null)
                    ieVersion = parseFloat( RegExp.$1 );
            }
            return ieVersion;
        }
    };

    /**
     * Return user OS name
     * @returns {string}
     * @name detectBrowser#getOS
     */
    that.getOS = function () {
        for (var osIs in os) {
            if (os[osIs] == true ) {
                return osIs;
            } else {
                var _up = window.navigator.platform;
                return _up;
            }
        }
    }

};
