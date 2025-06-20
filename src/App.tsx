import { For, Index, batch, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal([[""]]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;
  let wordBuffer = []; // All words
  
  let checkScrollWidth = (event) => {
    let words = []; // Words in current row
    let textBox:any = event.target;
    // console.log(event);
    //console.log("rowsOfText", rowsOfText);
    
    // Check width of text box on first char entered
    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }

    textBox.value.split(' ').forEach((word, i) => {
      words.push(word);
      wordBuffer[rowsOfText] = words;
    });
    console.log("wordBuffer ",wordBuffer);
    
    setFloatingTextContent(wordBuffer); // collects all words written, one array per row
    // setFloatingTextContent(words); // collects all words written, one array per row
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
      
      // Text overflows input, removes text in textfield
      if(textBoxScrollWidth() != textBox.scrollWidth) {
        ++rowsOfText;
        // wordBuffer = newWords;
        // wordBuffer = words;
        // wordBuffer.push([]);
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
      
        <Index each={floatingTextContent()}>
          {(firstArray, x) => (
            <div id="floatingTextWrapper">
              <Index each={firstArray}>
                {(word, y) => (
                  <span class="floatingTextWord">{y} {word}</span>
                )}
              </Index>
            </div>
          )}
        </Index>

      {/* https://docs.solidjs.com/concepts/control-flow/dynamic */}
      
      {/* <div id="floatingTextWrapper">
        <For each={floatingTextContent()[floatingTextContent().length-1]}>
          {(word) => (
            <span class="floatingTextWord">{word}</span>
          )}
        </For>
      </div> */}
    </main>
    </>
  )
}

export default App;
