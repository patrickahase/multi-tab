const frequencies = [
  138.59,
  164.81,
  207.65,
  246.94
];

// serviceWorker for controlling cross-tab communication
console.log('sw');
// run on install
self.addEventListener('install', (e) => {
  console.log('sw installed');
});
// run on active
self.addEventListener('activate', (e) => {
  console.log('sw active');
});
// run on fetch request
self.addEventListener('fetch', (e) => {
  //console.log('intercepted a http request', e.request);
  let msg = 'hey';
  sendMessage(msg);
});
// run on receive message
  self.addEventListener('message', (e) => {
    console.log(e)
});

const sendMessage = async (msg, clientId) => {
  let allClients = [];
  if (clientId) {
    let client = await clients.get(clientId);
    allClients.push(client);
  } else {
    allClients = await clients.matchAll({ includeUncontrolled: true });
  }
  return Promise.all(
    allClients.map((client) => {
      // console.log('postMessage', msg, 'to', client.id);
      console.log(frequencies[allClients.length - 1]);
      return client.postMessage(frequencies[allClients.length - 1]);
    })
  );
};