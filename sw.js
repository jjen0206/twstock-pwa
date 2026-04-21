// Service Worker - 台股智慧看盤 PWA
// v9：移除 FinMind（已改付費），改用 TWSE OpenAPI + TPEX OpenAPI + codetabs 代理
//      一次 fetch 抓全市場 2000+ 檔，免費無限制
const CACHE = 'twstock-v9';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;

  // 跨域請求一律不攔截，讓瀏覽器直接走網路（TWSE OpenAPI、codetabs 等）
  let reqUrl;
  try { reqUrl = new URL(e.request.url); } catch(err) { return; }
  if(reqUrl.origin !== self.location.origin) return;

  // 同 origin：cache-first 策略（靜態資源）
  e.respondWith(
    caches.match(e.request).then(cached=>{
      return cached || fetch(e.request).then(res=>{
        if(res && res.status === 200 && res.type === 'basic'){
          const copy = res.clone();
          caches.open(CACHE).then(c=>c.put(e.request, copy));
        }
        return res;
      }).catch(()=>cached);
    })
  );
});
