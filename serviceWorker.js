const frequencies = [
  138.59,
  164.81,
  207.65,
  246.94
];

let tabGroups = [
 [],
 [],
 [],
 []
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
  /* let msg = 'hey';
  sendMessage(msg); */
});

// run on receive message
self.addEventListener('message', (e) => {
  //console.log(e.source.id);
  // first time tab connection
  if(e.data === "init"){
    let fundFreq = 20.0;
    // find the first clear voice in the tab groups
    // first check for any with 0 voice (k) then 1 voice etc
    let tabGroup = 0;
    let foundVoice = false;
    const allClients = clients.matchAll({ includeUncontrolled: true });
    console.log(allClients);
    for (let k = 0; k < 1000; k++) {
      if(!foundVoice){
        for (let i = 0; i < tabGroups.length; i++) {
          if(tabGroups[i].length <= k){
            //console.log("found", k, i);
            foundVoice = true;
            tabGroups[i].push(e.source.id);
            sendMessage({
              freq: frequencies[i]
            }, e.source.id);
            break
          }
        }      
      }
      
    } 
    
    
    /* for (let k = 0; k < 1000; k++) {
      // run through each set to find a clear voice
      for (let i = 0; i < tabGroups.length; i++) {
        while(tabGroups[i].length > k){
          tabGroups[i].push(e.source.id);
          fundFreq = frequencies[i];
          sendMessage({freq: fundFreq}, e.source.id);
        }
      }
      
    } */
    
    
  }
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
      // console.log(frequencies[allClients.length - 1]);
      //return client.postMessage(frequencies[allClients.length - 1]);
      return client.postMessage(msg);
    })
  );
};