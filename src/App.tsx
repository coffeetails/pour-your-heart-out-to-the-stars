import { For, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal<string[]>();
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);

  let checkScrollWidth = (event) => {
    let textBox:any = event.target;
    // console.log(event);
    
    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }

      // Wait untill the word is finished
      const words = textBox.value.split(' ');
      words.forEach(word => {
        return word;
      });
      setFloatingTextContent(words); 
      
      if(textBox.value[textBox.value.length-1] == " ") {
        const wordElems = document.getElementsByClassName("floatingTextWord");
        const lastWordElem = wordElems[wordElems.length-1];
        
        anime({
          // targets: ["#floatingTextWrapperElem", ".floatingTextWord"],
          targets: ".floatingTextWord",
          // targets: wordElems[wordElems.length],
          duration: 5000,
          translateY: -270,
          opacity: 0,
          rotate:  function() {
            return anime.random(-100, 100);
          },
          easing: 'easeInOutQuad',
          loop: false,
        });
        
        if(textBoxScrollWidth() != textBox.scrollWidth) {
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
