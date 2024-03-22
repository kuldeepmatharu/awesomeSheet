/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';



/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["css/awesomeSheet.css","504cca17778ce32ef1cf552e6dc0c9d5"],["css/awesomeSheet.min.css","9ba2deec75e0397c4017f99e99efe402"],["css/vendor.css","b980f06480077133779ce2bb24783187"],["css/vendor.min.css","3c165cea1d60315464000f00bef0a7bc"],["db/feats.csv","20b831ef44183a30e2f46f274686aa57"],["db/languages.csv","be5fdf6ddbe3fd973ac7fc1edb92c3c7"],["db/traits.csv","b761bfd5e9b10a0e4c634e07948cb723"],["fonts/fjalla-one/fjalla-one-regular.ttf","d8c3c0b2a12dae2dd8e43895d33df67e"],["fonts/fjalla-one/fjalla-one-regular.woff","201b2960b726844b0c1142d2c5a82278"],["fonts/fjalla-one/fjalla-one-regular.woff2","f0249cace1e9aa9599c44fc6188ff619"],["fonts/icons/icons.eot","ed22f798768620fc59bdb436520e1556"],["fonts/icons/icons.json","e81b7bbf4d913f1e7a4e70763de5df8f"],["fonts/icons/icons.svg","8fe0a82cedf5857b252474b251d53bfd"],["fonts/icons/icons.ttf","e60cdd3dc6d04f28e23508ce9a49563f"],["fonts/icons/icons.woff","a6133b34182d2046c1a32607caacec87"],["fonts/open-sans/open-sans-bold-italic.eot","217e561bb88d7d3d6bebf715b72dbfed"],["fonts/open-sans/open-sans-bold-italic.ttf","54152d20be5227cba086ca3092ea901e"],["fonts/open-sans/open-sans-bold-italic.woff","7c9a2f7abbf15373d6176894eac76d99"],["fonts/open-sans/open-sans-bold-italic.woff2","1d6d47c5650d81b90e7aa20fe8d90111"],["fonts/open-sans/open-sans-bold.eot","d3e047b61c14c025434c4a18e1c3eed4"],["fonts/open-sans/open-sans-bold.ttf","eb2f9bdd71fa1a515d2b0f210eabce7a"],["fonts/open-sans/open-sans-bold.woff","a012fc5910a16e9cfc7d7529d6507ec8"],["fonts/open-sans/open-sans-bold.woff2","573ea876c76cb20e20ea806279b650b0"],["fonts/open-sans/open-sans-condensed-bold.eot","2fff27a01524360f0f86d7d2097c6fc1"],["fonts/open-sans/open-sans-condensed-bold.ttf","ddad2418ade5824090b9531ff90ff58f"],["fonts/open-sans/open-sans-condensed-bold.woff","8b82d71af711eb30ba75ae2aad24f989"],["fonts/open-sans/open-sans-condensed-bold.woff2","e656c39eeb984e9ba3eab970dcc97e62"],["fonts/open-sans/open-sans-condensed-light-italic.eot","e9b431160632c7e9e6f86a47690d8c6f"],["fonts/open-sans/open-sans-condensed-light-italic.ttf","ab12b2d332e77aaf3f0de3c260fa0d97"],["fonts/open-sans/open-sans-condensed-light-italic.woff","5e4001fdd1ad7e1b515a3032be0210e1"],["fonts/open-sans/open-sans-condensed-light-italic.woff2","50a0539533c0b6d803f20aac449f1acb"],["fonts/open-sans/open-sans-condensed-light.eot","728a184e858d2d1df12a29395e89062e"],["fonts/open-sans/open-sans-condensed-light.ttf","c913cdf509d00f33a1a48848b8673bac"],["fonts/open-sans/open-sans-condensed-light.woff","c47012973254c1720e3a98c1c4a9539f"],["fonts/open-sans/open-sans-condensed-light.woff2","61137440fe3cb7c3335edaa48f2e96e1"],["fonts/open-sans/open-sans-italic.eot","309ade593bd77b9d0ddc6c2bcd8d5318"],["fonts/open-sans/open-sans-italic.ttf","613bc66dc79404ca6c5bf75fdecaa025"],["fonts/open-sans/open-sans-italic.woff","3814fd1eba78acb575ba59a529d09262"],["fonts/open-sans/open-sans-italic.woff2","adedab7e50ce92cc94b80efa3fcaccbb"],["fonts/open-sans/open-sans-light-italic.eot","9077e24b8b902e86d225e0ee9563da75"],["fonts/open-sans/open-sans-light-italic.ttf","971eb5934e01282e2af8e1486dab813c"],["fonts/open-sans/open-sans-light-italic.woff","428027bbc8530c62ebe54c0e66a975ac"],["fonts/open-sans/open-sans-light-italic.woff2","8e02343794db373a41daf6c102654aee"],["fonts/open-sans/open-sans-light.eot","33f5cb2b77653e8efe192de95ba7c94e"],["fonts/open-sans/open-sans-light.ttf","c81ee1cc6db8c8fa312878417b0fbe1e"],["fonts/open-sans/open-sans-light.woff","660970bd910fed5d6207d7363d71824a"],["fonts/open-sans/open-sans-light.woff2","6fdbb5cbc99d308e282ab40b8d5ef613"],["fonts/open-sans/open-sans-regular.eot","8a71aead22fe47842e886256f12278c2"],["fonts/open-sans/open-sans-regular.ttf","2f0f36be216123a090d72eb566515491"],["fonts/open-sans/open-sans-regular.woff","d935d57aeaef8900079e0f4826608496"],["fonts/open-sans/open-sans-regular.woff2","7bb5041c87d452713b7919575c00626a"],["fonts/open-sans/open-sans-semi-bold-italic.eot","130568dcb4a4bc5be9bcdd34ee7b81a9"],["fonts/open-sans/open-sans-semi-bold-italic.ttf","7ec0d8dad01740d014470fc9fe15f0ab"],["fonts/open-sans/open-sans-semi-bold-italic.woff","08db113a8c3a44684f46ffa523678cdb"],["fonts/open-sans/open-sans-semi-bold-italic.woff2","9135b6495e81dfbe3d5791598492cfa0"],["fonts/open-sans/open-sans-semi-bold.eot","beb3250a047fc8ea53eaf5151b098b6a"],["fonts/open-sans/open-sans-semi-bold.ttf","2051311f5d19b85caa65fee862a14d24"],["fonts/open-sans/open-sans-semi-bold.woff","192110caca82ccdef0bc77aa9a1d5dc7"],["fonts/open-sans/open-sans-semi-bold.woff2","0e52d8029c2c5e8312c875a18e043579"],["images/apple-touch-icon.png","360c238af0fa46f0eca7afe99c036f52"],["images/boom.png","fb4afb6ba0e9199b0d54d5c249753cfc"],["images/chrome-touch-icon-128x128.png","9abb3bc7a18720fde8655befdf49e5d1"],["images/chrome-touch-icon-192x192.png","a29973a0bfeadab52c19bb31e84abf9f"],["images/chrome-touch-icon-512x512.png","d93300a7231530b5058088c06ab41443"],["images/ms-touch-icon-144x144-precomposed.png","faea373fd12907ae64275cfc4e39aa6d"],["index.html","6c1cf7ff1f46dc70fa108ef1aededd11"],["js/armor-shield.js","ab59928cafb366dc39a0326b22233f7f"],["js/auto-suggest.js","3c93da2bdbf208a96a2e13b78624f096"],["js/awesomeSheet.min.js","14c21221b452c1fdde9d512ecbfba6d3"],["js/card.js","270611cecd229ea209296f8eb4368541"],["js/character-image.js","9740ccfe59a727b4931895b5924e8453"],["js/character-select.js","d568dfa48fe1df188260f3b3709460dd"],["js/characters/blank.js","283d8714196f0f7b3b566dc431cba6fa"],["js/characters/izlara.js","be761a84fb53ae5d1230dc8b934c3201"],["js/characters/marika.js","13ddf27cc15eb0870f7332ee9b2a0b74"],["js/characters/nefi.js","2ec356f72381cdd15f65cc4e4f58690e"],["js/characters/nif.js","5ddc9eb70194a5cb4a67df1bbd2c052a"],["js/characters/orrin.js","93e64eeac44bc61870b7abe8ea35f83f"],["js/characters/ravich.js","7d89ecad167646e5310c3b9b4e5d1f8d"],["js/characters/ro.js","0c3db093aad2ff4bb61a7f24b907808b"],["js/characters/vos.js","f0f3f3be1b863e317de76a73b35cc4ad"],["js/check-block.js","19580ebbff48ece6252f949142bce0f2"],["js/check-url.js","60a034665c3ebcab759abad87f8d3d88"],["js/classes.js","79ec7e147969d9b99ad7d37613be9871"],["js/clone.js","59f9e1eb8b62c87e1eefdc503ce3ecda"],["js/data.js","3b3fd6c350a662ed2adbb2d8a950ba7d"],["js/demo.js","a5cb53d032e716baa4f27b60eda5630c"],["js/display.js","307ade0cf251b71788d51edc1a9a6f73"],["js/encumbrance.js","6e6483094ef21cd40427f38883772048"],["js/events.js","5a5823080fc2005803e53a7d25a2b0d5"],["js/exp.js","62c476955ba4e8b31dfd6b0001172f5a"],["js/feats-data.js","1355a30e040b4d1a4e9eb1c7102295bd"],["js/fireball.js","bbae2983e488dd784799b8e0fb803763"],["js/fullscreen.js","c981733decde401d7be352da6cfff5c5"],["js/hard-coded-characters.js","ea2a0f7dfec8b4e2774bbc1a8e82cae2"],["js/header.js","36347fd0d1d32b62bf2cff30db722bf9"],["js/helper.js","b8910e2b085d3b50001a6b1d77f27523"],["js/init.js","aa47c212c2a2d7cbde55e8494932ec9d"],["js/input-block.js","f88784dc1869059597eb03142e384851"],["js/input-range-block.js","f5592eeddb23c549b076975b9d38c56b"],["js/log.js","3a7a408d91747346f392dae1ee9f77a1"],["js/menu.js","99c83151232bb67ecbf653d7fdae6962"],["js/minimise.js","6dca220de9edf42a229b0dd81c4efe2a"],["js/modal.js","9205802b969d55812cfb77a70ad5568d"],["js/nav.js","3ac2fd45f1bbe08e37811b303155d9e4"],["js/night.js","ed4b4117b0d4846742b585ada9e49844"],["js/onboarding.js","9dd1524adc71e826aea5c815b0680209"],["js/page.js","68185b8209a3d2d48cf5542879da99ae"],["js/pill.js","8be1874594334c3eab63ce0f9a9d0764"],["js/prompt.js","e05311acf0603487145d7edd1283b593"],["js/radio-block.js","89b8d39c592ad765fe925d39348aa66a"],["js/register-service-worker.js","78e22d2f0171982a1f487f3638c8f10b"],["js/repair.js","6e6f37a64240106581c05257fd4e8b43"],["js/select-block.js","c25470bc27291429a420640b7b402414"],["js/shade.js","4ff0add94c6d24f9d6c48555fc6de472"],["js/sheet.js","6ad7028c847f46c957142d7bb7cb715b"],["js/size.js","0463e951cc3470702808374d22c01bf0"],["js/skills.js","b3419e1cf2489ef320bbd788c015cdce"],["js/snack.js","021eec12f79243f049bf98ab932e4eba"],["js/spells.js","a7c94a86dd2d126a74bced2d3633dc3c"],["js/stats.js","3fbf3f16076e7b715fb2293f6c54b8e2"],["js/strict.js","85fd5089c3278f8f544a3691fd38f49b"],["js/tabs.js","d56711f6038281e92cfdbc38a30b6e28"],["js/text-block.js","e8eb18b548b809ff7a51133baa20946b"],["js/textarea-block.js","062449f53264321d2f61a978ba4aa2c6"],["js/theme-color.js","aa6f214c8e67f2ab93d6643d0b1ea43d"],["js/tip.js","3713c89142585cf84de2fcb4cab355d9"],["js/total-block.js","8602eb0702d24b59d8ec5fd64452497d"],["js/update.js","26d17b6a9a7be32f9960bdf1f372ac0c"],["js/vendor-options.js","7191edd3dbf79082c50bafaa47ff7223"],["js/wealth.js","08bd38cbaa48c959f04a68735644ef6e"],["manifest.json","e12be9051e140a03c6fdfd8e15140644"],["style-guide.html","8c8d994b8ba200e2d2d7c793081c3e22"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-aS-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function(url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') + 'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var populateCurrentCacheNames = function(precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html')) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


/* @preserve Tue, 16 Jan 2024 02:10:04 GMT */