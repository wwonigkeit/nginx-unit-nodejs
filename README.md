# Node.js Hello World

Hello World is a simple webserver to use as an introduction to Vorteil. It hosts a webpage containing a simple hello world message with Vorteil's logo. The background colour of the page can be controlled by setting the `--colour` argument to any valid HTML colour code.

The code has been specifically modified for the [NGINX Unit platform!](https://unit.nginx.org/)

The following changes are needed:

```node
require("unit-http").createServer(function (req, res) {
    var html = buildHtml(req, argv.colour);
    var ip_address = req.connection.remoteAddress;
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(html)
}).listen(3000, function() { console.log("Listening on port 3000")})
```

Note: the changed `unit-http` requirement from the unit-devel package.


## Running

The helloworld binary requires a `--colour` argument

```sh
./helloworld.js --colour=#FFFFFF
```

The argument colour: must be six characters of hexadecimal (like '#FFFFFF')

Should return something like

```
2017/10/13 11:14:32 Listening on port 3000
```

You can connect to the web server by visiting http://localhost/
