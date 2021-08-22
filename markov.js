/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()
    this.words.forEach((word, i) => {
      if (this.words[i+1]) {
        if (chains.has(word)) {
          chains.set(word, [...chains.get(word), this.words[i+1]])
        } else {
          chains.set(word, [this.words[i+1]])
        }
      } else {
        if (!chains.has(word)) {
          chains.set(word, [null])
        }
      }
    });
    this.chains = chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let markov = []
    let words = Array.from(this.chains.keys())
    let nextWord = getRandWord(words)

    while (markov.length < numWords && nextWord !== null) {
      markov.push(nextWord)
      nextWord = getRandWord(this.chains.get(nextWord))
    }
    return markov.join(" ")
  }
}
function getRandWord(iterable) {
  
  return iterable[Math.floor(Math.random() * iterable.length)]
}

let mm = new MarkovMachine('the cat in the hat')

mm.makeText(numWords=50);

module.exports = {
  MarkovMachine,
}