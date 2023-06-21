let audioCtx, amp, phaser, inputFreq;

let modal = document.getElementById("welcomeModal");
// open on load
modal.showModal();
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  // from audioContext.js - starts the audio system
  audioInit();
  modal.close();
});

function audioInit(){
  audioCtx = new AudioContext();
  let freq;
  if(inputFreq){ freq = inputFreq }
  else {freq = 50.0}
  //console.log(freq)

  let osc1 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: freq
  });
  let osc2 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: freq
  });
  let lfo = new OscillatorNode(audioCtx, {
    type: 'sine',
    frequency: 0.01
  });
  let delay = audioCtx.createDelay();
  amp1 = new GainNode(audioCtx);
  amp2 = new GainNode(audioCtx);
  amp1.gain.value = 0.3;
  amp2.gain.value = 0.3;
  let lfoAmp = new GainNode(audioCtx);
  lfoAmp.gain.value = 0.001;
  //lfo.connect(lfoAmp).connect(phaser.frequency);
  //lfo.connect(osc1.detune);
  lfo.start();
  lfo.connect(lfoAmp).connect(delay.delayTime);
  osc1.start();
  osc2.start();
  osc1.connect(amp1).connect(delay).connect(audioCtx.destination);
  osc2.connect(amp2).connect(audioCtx.destination);
}