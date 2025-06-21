import { For, Index, batch, createEffect, createMemo, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web";
import { createStore } from "solid-js/store";
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContentFirst, setFloatingTextContentFirst] = createSignal([]);
  const [floatingTextContentSecond, setFloatingTextContentSecond] = createSignal([]);
  const [floatingTextContentThird, setFloatingTextContentThird] = createSignal([]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = [[]]; // All words
  
  let checkScrollWidth = (event) => {
    let words = []; // Words in current row
    let textBox:any = event.target;
    
    // Check width of text box on first char entered
    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }

    // Push words to a buffer
    textBox.value.split(' ').forEach((word, i) => {
      words.push(word);
      //wordBuffer[rowsOfText] = words;
    });
    
    if (rowsOfText % 3 == 0) {
      wordBuffer[0] = words;
      setFloatingTextContentFirst(wordBuffer[0]);
      console.log("row 0", floatingTextContentFirst());
    }
    if (rowsOfText % 3 == 1) {
      wordBuffer[1] = words;
      setFloatingTextContentSecond(wordBuffer[1]);
      console.log("row 2", floatingTextContentSecond());
    }
    if (rowsOfText % 3 == 2) {
      wordBuffer[2] = words;
      setFloatingTextContentThird(wordBuffer[2]);
      console.log("row 3", floatingTextContentThird());
    }
    
    // TODO: Make the animation follow the "row pattern" 0 → 1 → 2 → 0 → 1 → 2 → etc 

    // Start animation after the user presses space
    if(textBox.value[textBox.value.length-1] == " ") {
      const wordElems = document.querySelectorAll(".floatingTextWord");
      const lastWordElem = wordElems[wordElems.length-2];
      anime({
        targets: lastWordElem,
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

      });
      
      // Text overflows input, removes text in textfield
      if(textBoxScrollWidth() != textBox.scrollWidth) {
        ++rowsOfText;
        textBox.value = "";
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
      <input type="text" id="textbox" name="textbox" spellcheck="false" oninput={checkScrollWidth}></input>
      
      <div id="floatingTextWrapper"> 
        <Index each={floatingTextContentFirst()}>
          {(word,i) => (
            <span class="floatingTextWord">{word()}</span>
          )}
        </Index>
      </div>

      <div id="floatingTextWrapper"> 
        <Index each={floatingTextContentSecond()}>
          {(word,i) => (
            <span class="floatingTextWord">{word()}</span>
          )}
        </Index>
      </div>

      <div id="floatingTextWrapper"> 
        <Index each={floatingTextContentThird()}>
          {(word,i) => (
            <span class="floatingTextWord">{word()}</span>
          )}
        </Index>
      </div>

    </main>
    </>
  )
}

export default App;
