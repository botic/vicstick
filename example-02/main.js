/**
 * @fileoverview To run this basic Stick application start it with: "ringo -m . main.js"
 *
 * "-m ." will add the current directory to the module search path, so that
 * RingoJS can find the main.js module and load it.
 *
 * Please note: If there are "Error: Unhandled request" on your console, this is the favicon.ico
 * request sent by your browser. This demo does not send any favicon repsonses.
 */

// The Application object is a JSGI application that wraps a middleware chain.
var {Application} = require("stick");

// This creates a new application
var app = Application();

// This configures the middleware chain. It wil be executed in the follwing order:
// HTTP request --> [counter] --> [mount] --> [route] --> HTTP response
//
// Note: the order is very important! If route is before the counter middleware,
// the req.counter property set in counter.js will be undefined in the response!
app.configure(module.resolve("counter-middleware"), "mount", "route");

// This module provides response helper functions for composing JSGI response objects.
// Instead of creating the response object manually, we can use response.html("<html>...</html>");
var response = require('ringo/jsgi/response');

// Return a HTML response for the "root" location. The app.get() function was
// installed by the route middleware and handles HTTP GET requests on the route "/".
app.get("/", function(req) {
   return response.html("<html><h1>vicstick is up and running!</h1>",
      "<p>*drum drum drum*</p>",
      "<p>The current counter value: " + req.counter + "</p>",
      "</html>");
});

// Mount the sayhello module under /sayHello
app.mount("/sayHello", module.resolve("sayhello"));

// Mount the saybuna module under /sayBuna
app.mount("/sayBuna", module.resolve("saybuna"));

// require.main is a property that contains the module launched with "ringo -m . MAIN-MODULE.js".
// If this is equals to the current module, we know that this module is the MAIN-MODULE and
// it's our task to start the server.
if (require.main === module) {
   
   // Start a new HTTP server
   require("ringo/httpserver").Server({
      app: app, // a JSGI application
      port: 8080  // the port to listen for incoming requests
   }).start();
   
}