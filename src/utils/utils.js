export const getRandom = ({ collection, amount = 10 }) => {
  const { length } = collection;
  const collected = [];
  const arr = [];
  while (arr.length < amount) {
    const r = Math.floor(Math.random() * length);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      collected.push(collection[r]);
    }
  }
  return collected;
};

let speechSynth;
let voices;
let retry = 0;
const cache = {};

export function loadVoicesWhenAvailable(onComplete = () => { }) {
  speechSynth = window.speechSynthesis;
  const gotVoices = speechSynth.getVoices();
  if (gotVoices.length !== 0 || retry >= 3) {
    voices = gotVoices;
    onComplete();
  } else {
    return setTimeout(() => { retry += 1; loadVoicesWhenAvailable(onComplete); }, 1000);
  }
  return null;
}

function getVoices(locale) {
  if (cache[locale]) return cache[locale];

  cache[locale] = voices.filter((voice) => voice.lang === locale);
  return cache[locale];
}

export function playByText(locale, text) {
  if (!speechSynth) {
    // eslint-disable-next-line no-console
    console.error('Browser does not support speech synthesis');
    return;
  }
  const localVoices = getVoices(locale);
  const utterance = new window.SpeechSynthesisUtterance();
  [utterance.voice] = localVoices;
  utterance.text = text;
  utterance.lang = locale;

  speechSynth.cancel();
  speechSynth.speak(utterance);
}
