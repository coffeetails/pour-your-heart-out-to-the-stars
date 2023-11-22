import { For, batch, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal([[""]]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = [[]];
  
  let checkScrollWidth = (event) => {
    let words = [[]];
    let textBox:any = event.target;
    // console.log(event);

    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }
    if(rowsOfText >= 1) {
      words = wordBuffer;
    }
    
    // let newWords = [];
    textBox.value.split(' ').forEach((word, i) => {
      // newWords.push(word);
      
      // undefined when rowsOfText = 1;
      words[rowsOfText].push(word);
    });
    
    // words[rowsOfText] = newWords;

    // setFloatingTextContent(newWords);
    setFloatingTextContent(words);
    console.log("floatingTextContent()", floatingTextContent());
    
    if(textBox.value[textBox.value.length-1] == " ") {
      const wordElems = document.querySelectorAll(".floatingTextWord");
      const lastWordElem = wordElems[wordElems.length-1];
      
      anime({
        targets: ".floatingTextWord",
        // targets: wordElems,
        // targets: lastWordElem,
        duration: 5000,
        opacity: 0,
        translateY: -270,
        // translateX: anime.stagger([-100, 100]),
        translateX: function() {
          return anime.random(-50, 50);
        },
        rotate: function() {
          return anime.random(-100, 100);
        },
        easing: 'easeInOutQuad',
        loop: false,
        update: function(animation) {
          if(animation.progress == 100) {
            // console.log(animation);
          }
        }
      });
      
      if(textBoxScrollWidth() != textBox.scrollWidth) {
        ++rowsOfText;
        // wordBuffer = newWords;
        wordBuffer = words;
        wordBuffer.push([]);
        textBox.value = "";
        // console.log(rowsOfText);
      }
    }
  }


  return (
    <>
    <header>
      <label for="textbox">Pour your heart out to the stars.</label>
      <button>What is this?</button>
    </header>
    <main>
      <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth}></input>
      
      <div id="floatingTextWrapper">
        <For each={floatingTextContent()[floatingTextContent().length-1]}>
          {(word) => (
            <span class="floatingTextWord">{word}</span>
          )}
        </For>
        {/* <For each={floatingTextContent()[1]}>
          {(word) => (
            <span class="floatingTextWord">{word}</span>
          )}
        </For> */}
        {/* <For each={floatingTextContent()}>
          {(row) => ( 
            <For each={row}>
              {(word) => (
              <span class="floatingTextWord">{word}</span>
              )}
            </For>
          )}
        </For> */}
      </div>
    </main>
    </>
  )
}

export default App;
