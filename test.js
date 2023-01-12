const fs = require('fs');

fs.writeFileSync(
  './hello.json',
  JSON.stringify({ hello: 'world', date: new Date() }, null, 2)
);
