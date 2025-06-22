import { For, Index, Show, batch, createEffect, createMemo, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web";
import { createStore } from "solid-js/store";
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [showInfo, setShowInfo] = createSignal(false);
  const [floatingTextContentFirst, setFloatingTextContentFirst] = createSignal([]);
  const [floatingTextContentSecond, setFloatingTextContentSecond] = createSignal([]);
  const [floatingTextContentThird, setFloatingTextContentThird] = createSignal([]);
  const [floatingTextContent, setFloatingTextContent] = createStore([[]]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = [[]]; // All words
  let textBox;

  let clearAllText = (event) => {
    if (event.key == "Enter") {
      console.log("ENTER");
      textBox.value += " ";
      updateFloatingText(event);
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
    

    wordBuffer[rowsOfText] = words;
    setFloatingTextContent(wordBuffer);
    console.log(floatingTextContent);
    const wordElems = document.querySelectorAll<HTMLElement>(".floatingTextWord");
    if (wordElems.length == 1 && rowsOfText > 2) {
      resetFirstWordInRow(wordElems[0]);
    } else {
    }
    lastWordElem = wordElems[wordElems.length-2];

    // Cleanup words no longer visible
    wordElems.forEach((row, i) => {
      //if(wordElem.style.getPropertyValue("opacity") == "0") {
        //wordElem.remove();
        //wordElems[i]
      //}
    });

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
      <label for="textbox">Pour your heart out to the stars.</label>
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
        //oninput={updateFloatingText}
        oninput={(event) => updateFloatingText(event)}
        onkeydown={clearAllText}
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
