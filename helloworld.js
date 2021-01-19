#!/usr/bin/env node

'use strict';

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 -colour [hex-colour FFFFFF]')
    .demandOption(['colour'])
    .argv;

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

require("http").createServer(function (req, res) {
    var html = buildHtml(req, argv.colour);
    ip_address = req.connection.remoteAddress
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(html)
}).listen(3000, function() { console.log("Listening on port 3000")})


function buildHtml(req, colour) {
  var header = '';
  var body = '';

  // concatenate header string
  // concatenate body string

  //var ip_address = req.connection.remoteAddress
  var picture = "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"
  var vorteil_cloud = process.env.CLOUD_PROVIDER
  let date_ob = new Date();
  // var colour = "#FF0000";

  return    "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
              "<head>" +
                  "<meta charset=\"UTF-8\">" +
                  "<title>Hello World</title>" +
                  "<meta name=\"description\" content=\"Description\">" +
                  "<meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">" +
                  "<meta http-equiv=\"refresh\" content=\"2\">" +
                  "<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">" +
                  "<!-- Compiled and minified CSS -->" +
                  "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css\">" +
                  "<!-- Compiled and minified JavaScript -->" +
                  "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js\"></script>" +
                  "<style>" +
                    "body {" +
                    "background-color: #" + colour + ";" +
                    "\"}" +
                    "h5 {" +
                    "color: #2396d8;" +
                    "\"}" +
                  "</style>" +
              "</head>" +
              "<body class=\"valign-wrapper\" style=\"height:100vh;\">" +
                  "<div class=\"row\">" +
                    "<div class=\"center-align\">" +
                        "<img src=\"data:image/png;base64," + picture + "\" alt=\"Vorteil\">" +
                        "<h5>WELCOME TO VORTEIL</h5>" +
                    "</div>" +
                  "</div>" +
                  "<div class=\"w3-container w3-content w3-center w3-padding-64\" style=\"max-width:800px\">" +
                    "<h2 class=\"w3-wide\">CONNECTION INFORMATION</h2>" +
                    "<p class=\"w3-opacity\"><i>Visitor Information</i></p>" +
                    "<p class=\"w3-justify\">Visitor IP address: " + req.connection.remoteAddress + "</p>" +
                    "<p class=\"w3-justify\">Visitor User agent: " + req.headers['user-agent'] + "</p>" +
                    "<p></p>" +
                    "<p class=\"w3-justify\">Server IP address: " + addresses + "</p>" +
                    "<p class=\"w3-justify\">Server hosted on: " + vorteil_cloud + "</p>" +
                    "<p class=\"w3-justify\">Server local time: " + date_ob + "</p>" +
                    "<p></p>" +
                  "</div>" +
              "</body>" +
            "</html>"
}
