import { For, batch, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal<string[]>();
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);
  let rowsOfText = 0;

  let checkScrollWidth = (event) => {
    let textBox:any = event.target;
    // console.log(event);

    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }
    
    let words:string[] = [];
    textBox.value.split(' ').forEach((word, i) => {
      words.push(word);
    });
    console.log("words",words);

    setFloatingTextContent(words);
    
    if(textBox.value[textBox.value.length-1] == " ") {
      const wordElems = document.querySelectorAll(".floatingTextWord");
      const lastWordElem = wordElems[wordElems.length-1];

      anime({
        // targets: ".floatingTextWord",
        targets: wordElems,
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
        textBox.value = "";
        ++rowsOfText;
        console.log(rowsOfText);
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
      {/* <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth} /> */}
      
      <div id="floatingTextWrapper">
        <For each={floatingTextContent()}>
          {(word) => (
            <span class="floatingTextWord">{word}</span>
            )}
        </For>
      </div>
    </main>
    </>
  )
}

export default App
