import { For, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal<string[]>();
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);

  let checkScrollWidth = (event) => {
    let textBox:any = event.target;
    
    if(textBox.value.length == 1) {
      setTextBoxScrollWidth(textBox.scrollWidth);
    }

    if(textBoxScrollWidth() != textBox.scrollWidth) {
      // Wait untill the word is finished
      if(textBox.value[textBox.value.length-1] == " ") {
        const words = textBox.value.split(' ');
        setFloatingTextContent(words); 
        // The animation will be for each row of words
        anime({
          targets: ["#floatingTextWrapperElem", ".floatingTextWord"],
          duration: 5000,
          translateY: -270,
          opacity: 0,
          rotate: anime.stagger([-100, 100]), 
          easing: 'easeInOutQuad',
          loop: false,
        });
        
        textBox.value = "";
      }
    }
  }

  return (
    <>
    <header>
      <label for="textbox">Pour your heart out to the stars.</label>
      <button>Read more</button>
    </header>
    <main>
      <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth} />
      
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
