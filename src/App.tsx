import { For, Index, Show, batch, createEffect, createMemo, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web";
import { createStore } from "solid-js/store";
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function Word(offset, string) {
  this.offset = offset; // width of textBox-span (aka. itself)
  this.string = string; // the string to be displayed
}

/*
 div instead of input 
 - https://stackoverflow.com/a/44303103
 remove characters after caret
 - https://stackoverflow.com/a/48166047
 - https://stackoverflow.com/a/11248187
*/

function App() {
  const [showInfo, setShowInfo] = createSignal(false);
  const [floatingTextContent, setFloatingTextContent] = createStore([[]]);
  const [floatingText, setFloatingText] = createSignal([]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = [[]]; // All words
  let textBox: HTMLDivElement;
  let main;

  let clearAllText = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      console.log("ENTER");
      textBox.innerText += " ";
      updateFloatingText(event);
    }
  }
  
  //let updateFloatingText = (event) => {
  function updateFloatingText(event) {
    let words = []; // Words in current row

    //textBox.setAttribute('size', textBox.value.length*0.65);
    
    // Check width of text box on first char entered
    if(textBox.scrollWidth < 20) {
      //setTextBoxScrollWidth(textBox.scrollWidth);
      setTextBoxScrollWidth(main.scrollWidth *0.9);
      console.log(textBoxScrollWidth());
      
    }
    console.log("textBox", textBox.innerText);

    // Push words to an array
    textBox.innerText.split(' ').forEach((word, i) => {
      words.push(word);
    });
    
    let lastWordElem;

    console.log(words);
    

    wordBuffer[rowsOfText] = words;
    setFloatingTextContent(wordBuffer);
    //console.log(floatingTextContent);
    const wordElems = document.querySelectorAll<HTMLElement>(".floatingTextWord");
    if (wordElems.length == 1 && rowsOfText > 2) {
      resetFirstWordInRow(wordElems[0]);
    }
    lastWordElem = wordElems[wordElems.length-2];

    // Start animation after the user presses space
    if(textBox.innerText[textBox.innerText.length-1] == " " || event.key == "Enter") {

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
      if(textBox.scrollWidth > textBoxScrollWidth() || event.key == "Enter") {
        console.log("new line time");
        
        ++rowsOfText;
        textBox.innerText = "";
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

    <main ref={main}>
      <div 
        ref={textBox}
        contenteditable="plaintext-only" 
        id="textbox"
        class="forgive-me-father-for-i-have-sinned-🙏" 
        spellcheck="false" 
        oninput={(event) => updateFloatingText(event)}
        onkeydown={clearAllText}
      ></div>
      
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
