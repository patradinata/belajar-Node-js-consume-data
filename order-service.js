// eslint disable
const http = require("http");
const url = require("url");

// Array berisi menu
const menus = ["nasi goreng", "mie goreng", "mie ayam", "bakso", "es-teh", "es tawar"];
const MISSING = 3;

// http server
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let id = pathname.match(/^\/(\d+)$/);

  if (!id) {
    res.statusCode = 400;
    return void res.end();
  }
  id = Number(id[1]);

  if (id === MISSING) {
    res.statusCode = 404;
    return void res.end();
  }
  res.setHeader("Content-type", "application/json");
  res.end(
    JSON.stringify({
      id,
      menu: menus[id % menus.length],
    })
  );
});

server.listen(process.env.PORT || 0, () => {
  const { port } = server.address();
  console.log(`Order service listening on localhost on port: ${port}`);
});
