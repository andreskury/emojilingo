export const getRandom = ({ collection, amount = 10 }) => {
    const length = collection.length
    let collected = []
    let arr = []
    while (arr.length < amount) {
        let r = Math.floor(Math.random() * length)
        if (arr.indexOf(r) === -1) {
            arr.push(r)
            collected.push(collection[r])
        }
    }
    return collected;
}

let _speechSynth
let _voices
let _retry = 0
const _cache = {}

export function loadVoicesWhenAvailable(onComplete = () => { }) {
    _speechSynth = window.speechSynthesis
    const voices = _speechSynth.getVoices()
    if (voices.length !== 0 || _retry >= 3) {
        _voices = voices
        console.log(voices)
        onComplete()
    } else {
        return setTimeout(() => { _retry++; loadVoicesWhenAvailable(onComplete) }, 1000)
    }
}

function getVoices(locale) {
    if (_cache[locale]) return _cache[locale]

    _cache[locale] = _voices.filter(voice => voice.lang === locale)
    return _cache[locale]
}

export function playByText(locale, text) {
    if (!_speechSynth) {
        console.error('Browser does not support speech synthesis')
        return
    }
    const voices = getVoices(locale)
    const utterance = new window.SpeechSynthesisUtterance()
    utterance.voice = voices[0]
    utterance.text = text
    utterance.lang = locale

    _speechSynth.cancel()
    _speechSynth.speak(utterance)
}