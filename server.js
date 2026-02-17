/**
 * Serves the welcome page at / and proxies everything else to Next.js (production build).
 * Waits for Next.js to be ready before accepting requests so form submit and /admin work.
 * First time: run  npm run build   then  node server.js
 * Then open: http://localhost:8080
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8080;
const NEXT_PORT = 3010;
const NEXT_READY_TIMEOUT_MS = 240000; // 4 min for first dev compile; prod usually ready in seconds
const POLL_INTERVAL_MS = 1500;

const nextDir = path.join(__dirname, '.next');
const buildIdPath = path.join(nextDir, 'BUILD_ID');
const useProduction = fs.existsSync(buildIdPath);

// Start Next.js (production = instant pages, no compile). shell: false avoids DEP0190.
const next = spawn(
  'npx',
  useProduction ? ['next', 'start', '-p', String(NEXT_PORT)] : ['next', 'dev', '-p', String(NEXT_PORT)],
  { stdio: 'inherit', shell: false, cwd: __dirname, env: { ...process.env, PORT: String(NEXT_PORT) } }
);
next.on('error', (err) => console.error('Next.js failed to start:', err));

if (!useProduction) {
  console.log('\n  No build found. Using dev mode — waiting for Next.js to compile…\n  Run: npm run build   then  node server.js   for instant startup.\n');
}

function isNextReady() {
  return new Promise((resolve) => {
    const req = http.get(
      { hostname: 'localhost', port: NEXT_PORT, path: '/', timeout: 3000 },
      (res) => { res.resume(); resolve(true); }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function waitForNextThenStartProxy() {
  const deadline = Date.now() + NEXT_READY_TIMEOUT_MS;
  function poll() {
    if (Date.now() > deadline) {
      console.log('  Next.js did not become ready in time. Starting proxy anyway.\n  Wait 1–2 min, then try:  http://localhost:' + PORT + '  and  http://localhost:' + PORT + '/admin\n');
      startProxy();
      return;
    }
    isNextReady().then((ready) => {
      if (ready) {
        console.log('  Next.js is ready.\n');
        startProxy();
      } else {
        setTimeout(poll, POLL_INTERVAL_MS);
      }
    });
  }
  poll();
}

function startProxy() {
  const welcomePath = path.join(__dirname, 'public', 'welcome.html');

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/welcome.html')) {
      fs.readFile(welcomePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading welcome page');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }
    const opts = {
      hostname: 'localhost',
      port: NEXT_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };
    const proxy = http.request(opts, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxy.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'text/html' });
      res.end(
        '<html><body style="font-family:sans-serif;padding:2rem;">' +
        '<h1>Next.js not ready</h1><p>Wait 20–30 seconds and refresh. If you see this after building, run: <code>npm run build</code> then <code>node server.js</code></p></body></html>'
      );
    });
    req.pipe(proxy);
  });

  server.listen(PORT, () => {
    console.log('');
    console.log('  Open in your browser:  http://localhost:' + PORT);
    console.log('  Admin:                http://localhost:' + PORT + '/admin');
    console.log('');
  });
}

// Wait for Next.js to respond before opening the proxy so form + admin work
waitForNextThenStartProxy();
