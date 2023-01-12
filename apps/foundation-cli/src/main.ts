import fs = require('fs');

console.log('Hello World!');

fs.writeFileSync(
  './hello.json',
  JSON.stringify({
    data: new Date(),
  })
);
