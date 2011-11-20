/**
 * @fileoverview This is a sample module to show how the middleware chain works.
 */

// The Application object is a JSGI application that wraps a middleware chain.
var {Application} = require("stick");

// This creates a new application. To enable the mount in main.js, it's also exported.
var app = exports.app = Application();

// Important: the counter will increased and will be 2!
// This app also gets the chain from main.js, so the resulting chain is:
// HTTP request --> (main.js: [counter] --> [mount] --> [route])
//              --> (saybuna.js: [counter] --> [route]) --> HTTP response
app.configure(module.resolve("./counter-middleware"), "route");

// This module provides response helper functions for composing JSGI response objects.
// Instead of creating the response object manually, we can use response.html("<html>...</html>");
var response = require('ringo/jsgi/response');

// Return a HTML response for the "root" location. The app.get() function was
// installed by the route middleware and handles HTTP GET requests on the local route "/".
app.get("/", function(req) {
   return response.html("<html><h1>Say Buna?</h1>",
      "<p>*drum drum drum*</p>",
      "<h2>Buna ziua! The counter is: " + req.counter + "</h2>",
      "</html>");
});