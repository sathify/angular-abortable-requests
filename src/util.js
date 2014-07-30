'use strict';

angular.module('angular-abortable-requests')
  .factory('Util', function() {

  return {
    /**
     * @returns interpolation of the redirect path with the parameters
     * Todo: submit angular patch
     * https://github.com/angular/angular.js/blob/
     * master/src/ngRoute/route.js#L574
     */
    interpolate: function (string, params) {
      var result = [],
        segmentMatch,
        key;
      angular.forEach((string||'').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
        } else {
          segmentMatch = segment.match(/(\w+)(.*)/);
          key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        }
      });
      return result.join('');
    },

    /**
     * Seperates out the http and the domain+other stuff
     * in the string
     *
     * @param {Object} string which starts with Http
     * @return {Object} containing protocol and url part
     */
    disuniteHttp: function (string) {
      var iDomain = string.indexOf('://'),
        uri;
      uri = {
        protocol: string.substring(0, iDomain) + '://',
        url: string.substring(iDomain + 3)
      };
      return uri;
    },

    /**
     * Removes items from an array by mutating it.
     * @param {Array} arr The array to remove from.
     * @param {Object|Array} items The item or array of items to remove.
     * @return {Array} The items actually removed.
     */
    removeFromArray: function(arr, items) {
      var removedItems = [];
      array.getArray(items).forEach(function(item) {
        var index = arr.indexOf(item);
        if (index !== -1) {
          arr.splice(index, 1);
          removedItems.push(item);
        }
      });
      return removedItems;
    }
  };

});
