const http = require('http');

const url = 'http://localhost:3001/login';

http.get(url, res => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('headers', JSON.stringify(res.headers, null, 2));
    console.log('bodyStart:\n' + body.slice(0, 3000));
  });
}).on('error', e => {
  console.error('error', e.message);
  process.exit(1);
});
