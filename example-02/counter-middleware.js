/**
 * @fileoverview This module provides a simple middleware
 * to show how the middleware chain works.
 */

/**
 * This middleware adds a property "counter" to the request and
 * increases it on each invocation.
 *
 * @param {Function} next the wrapped middleware chain
 * @param {Object} app the Stick Application object
 * @returns {Function} a JSGI middleware function
 */
exports.middleware = function session(next, app) {

   return function (req) {
      if (req.counter) {
         req.counter ++;
      } else {
         req.counter = 1;
      }
      
      return next(req);
    };
};
