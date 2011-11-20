/**
 * @fileoverview This is a sample module to show how the middleware chain works.
 */

// The Application object is a JSGI application that wraps a middleware chain.
var {Application} = require("stick");

// This creates a new application. To enable the mount in main.js, it's also exported.
var app = exports.app = Application();

// Note: The only middleware we need to configure is route. It's required for
// the request handling. But as this module is mounted under /sayHello/ by main.js,
// we already have the req.counter property on the request object.
app.configure("route");

// This module provides response helper functions for composing JSGI response objects.
// Instead of creating the response object manually, we can use response.html("<html>...</html>");
var response = require('ringo/jsgi/response');

// Return a HTML response for the "root" location. The app.get() function was
// installed by the route middleware and handles HTTP GET requests on the local route "/".
app.get("/", function(req) {
   return response.html("<html><h1>Say Hello?</h1>",
      "<p>*drum drum drum*</p>",
      "<h2>Hello World! The counter is: " + req.counter + "</h2>",
      "</html>");
});