// nervousSystem for connecting to the individual tabs to the serviceWorker
// nrvSys holds our sW reference and methods
const nrvSys = {
  sW: null,
  // called on page load finish
  async init() {
    // check for if sW available
    if('serviceWorker' in navigator){
      try {
        const registration = await navigator.serviceWorker.register("serviceWorker.js", {
          scope: "/",
        });
        if (registration.installing ||
            registration.waiting ||
            registration.active)
          {
            navigator.serviceWorker.controller.postMessage("init");
          }
        // upon receiving a message
        navigator.serviceWorker.addEventListener('message', e => {
          console.log(e.data);
          if(e.data.freq) {
            inputFreq = e.data.freq;
          }
          //
        });
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  }
}

nrvSys.init();

function genTabs(){
  navigator.serviceWorker.controller.postMessage("v");
}

window.addEventListener('beforeunload', () =>{
  navigator.serviceWorker.controller.postMessage("close");
});