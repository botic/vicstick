/**
 * @fileoverview To run this basic Stick application start it with: "ringo -m . main.js"
 *
 * "-m ." will add the current directory to the module search path, so that
 * RingoJS can find the main.js module and load it.
 *
 * Please note: If there are "Error: Unhandled request" on your console, this is the favicon.ico
 * request sent by your browser. This demo does not send any favicon repsonses.
 */
 
// Create a logger with the module.id as the name of the logger
var log = require("ringo/logging").getLogger(module.id);

// This will print "The main.js module.id is:  main" on the console.
// You can configure the logging in /config/log4j.properties
// (RingoJS' ringo/logging uses it as default location for logging configurations)
log.info("The main.js module.id is: ", module.id);

// The Application object is a JSGI application that wraps a middleware chain.
var {Application} = require("stick");

// This creates a new application
var app = Application();

// This will configure a middleware chain for the current application.
// We only use the route middleware for HTTP method based local request routing.
// This installs `get`, `post`, `put`, and `del` methods in the application
// object for routing requests with the corresponding HTTP methods.
app.configure("route");

// This module provides response helper functions for composing JSGI response objects.
// Instead of creating the response object manually, we can use response.html("<html>...</html>");
var response = require('ringo/jsgi/response');

// Return a HTML response for the "root" location. The app.get() function was
// installed by the route middleware and handles HTTP GET requests on the route "/".
app.get("/", function(req) {
   return response.html("<html><h1>vicstick is up and running!</h1><p>*drum drum drum*</p></html>");
});

// Auto-parsed parameter routes.
// Example: http://localhost:8080/stevegadd/birthday will return 1945.
app.get("/:alias/:property", function(req, alias, property) {
   var drummers = {
      "stevegadd": {
         birthday: 1945,
         fullname: "Steve Gadd",
         drumset: "Yamaha"
      },
      "ringostarr": {
         birthday: 1940,
         fullname: "Richard Henry Parkin Starkey Jr.",
         drumset: "Premier"
      },
      "jeff": {
         birthday: 1954,
         fullname: "Jeff Porcaro"
      }
   };
   
   // Check if a drummer exists
   if (drummers[alias]) {
      if (drummers[alias][property]) {
         return response.html(
            "<html><h1>Found a drummer's property:</h1>",
            "<p>", alias, ".", property, " is: <b>", drummers[alias][property], "</b></p>",
            "</html>"
         );
      } else {
         // Return a 404
         return response.notFound(alias + "/" + property);
      }
   } else {
      // Return a 404
      return response.notFound(alias);
   }
});

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