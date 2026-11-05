// Lets the school system open and work without internet. Change VERSION whenever you upload a new index.html.
const VERSION='school-v4',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png','favicon.ico'],
SDK=['https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(SHELL.concat(SDK).map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.hostname==='www.gstatic.com'){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const c=n.clone();caches.open(VERSION).then(x=>x.put(r,c));return n})));return}
 if(u.origin===self.location.origin){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(VERSION).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))}
});
