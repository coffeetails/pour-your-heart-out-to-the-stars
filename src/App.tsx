import { For, Index, Show, batch, createEffect, createMemo, createSignal } from 'solid-js';
import { createStore } from "solid-js/store";
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [showInfo, setShowInfo] = createSignal(false);
  const [backspaced, setBackspaced] = createSignal(false);
  const [floatingTextContent, setFloatingTextContent] = createStore([[]]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = [[]]; // All words
  let textBox;

  let handleKeyDown = (event) => {
    if (event.key == "Enter") {
      console.log("ENTER");
      wordBuffer.push([]);
      textBox.value += " ";
      updateFloatingText(event);
    } else if (event.key == "Backspace") {
      console.log("BACKSPACE");
      setBackspaced(true);
    }
  }
  
  //let updateFloatingText = (event) => {
  function updateFloatingText(event) {
    let words = []; // Words in current row
    
    // Check width of text box on first char entered
    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }
    
    // Push words to an array
    textBox.value.split(' ').forEach((word, i) => {
      words.push(word);
    });
    
    
    let lastWordElem;

    let caretPos = document.caretPositionFromPoint(textBox.current.offsetLeft, textBox.current.offsetTop);
    
    console.log("caretPos", caretPos);
    console.log("words", words);
    console.log("wordBuffer",wordBuffer[rowsOfText]);
    console.log("backspaced", backspaced());
    
    if(backspaced()) {


    }
    
    if (words.length >= wordBuffer[rowsOfText].length) {
      wordBuffer[rowsOfText] = words;
    } else if(wordBuffer[rowsOfText].length > 0) {
      console.log(floatingTextContent[rowsOfText]);
      let lastWord = words[words.length-1]
      let lastWordBuffer = wordBuffer[rowsOfText][wordBuffer[rowsOfText].length-2];
      
      // console.log("wordBuffer",wordBuffer[rowsOfText], lastWordBuffer.length);
      // console.log("words", words, lastWord.length);
      // console.log(lastWord.substring(0, lastWordBuffer.length-2) + " " + lastWord.substring(lastWordBuffer.length-2));
      
      if (lastWord.length > lastWordBuffer.length) {
        words[words.length-1] = lastWord.substring(0, lastWordBuffer.length-2);
        words.push(lastWord.substring(lastWordBuffer.length-1));
        console.log("final words: ", words);
        wordBuffer[rowsOfText] = words;
      }
    }
    
    setFloatingTextContent(wordBuffer);
    const wordElems = document.querySelectorAll<HTMLElement>(".floatingTextWord");
    if (wordElems.length == 1 && rowsOfText > 2) {
      resetFirstWordInRow(wordElems[0]);
    }
    lastWordElem = wordElems[wordElems.length-2];

    // Start animation after the user presses space
    if(textBox.value[textBox.value.length-1] == " " || event.key == "Enter") {

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
      if(textBoxScrollWidth() != textBox.scrollWidth || event.key == "Enter") {
        ++rowsOfText;
        textBox.value = "";
      }
    }
  }

  function resetFirstWordInRow(word) {
    word.style.setProperty('opacity', '1', "important");
    word.style.setProperty('transform', 'translateY(0px) translateX(0px) rotate(0deg)', "important");
  }


  return (
    <>
    <header>
      <p>Pour your heart out to the stars.</p>
      <button onClick={() => setShowInfo((prev) => !prev)}>What is this?</button>
    </header>

    <main>
      <input 
        ref={textBox}
        type="text" 
        id="textbox" 
        name="textbox" 
        spellcheck="false" 
        autocomplete="off" 
        oninput={(event) => updateFloatingText(event)}
        onkeydown={handleKeyDown}
      ></input>
      
      <Index each={floatingTextContent}>
        {(row, i) => (
          <div class="floatingTextWrapper">
            <Index each={row()}>
              {(word, i) => (
                <span class="floatingTextWord">{word()}</span>
              )}
            </Index>
          </div>
        )}
      </Index>

    </main>
    <Show when={showInfo()}>
        <article class="showInfo">
          <p>Welcome, cosmic traveler! 🚀</p>
          <p>Type your thoughts into the field. Watch your words float up and disappear into the stars. ✨ No backspace, no editing, no saving. Just pure stream of consciousness. 🌌</p>
          <p>Let your words fly and enjoy the cosmic ride! 💫</p>
          <button onClick={() => setShowInfo((prev) => !prev)}>Close</button>
        </article>
    </Show>
    </>
  )
}

export default App;
