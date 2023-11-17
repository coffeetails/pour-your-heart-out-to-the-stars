import { For, createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal<string[]>([""]);
  const [textBoxScrollWidth, setTextBoxScrollWidth] = createSignal<number>(0);

  let checkScrollWidth = (event) => {
    let textBoxValue:any = event.target.value;
    let currentScrollWidth:number = event.target.scrollWidth;
    if(textBoxValue.length == 1) {
      setTextBoxScrollWidth(currentScrollWidth);
    }
    if(textBoxScrollWidth() != currentScrollWidth) {
      // Wait untill the word is finished
      if(textBoxValue[textBoxValue.length-1] == " ") {
        const words = textBoxValue.split(' ');
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
        
        event.target.value = "";
      }
    }
  }

  return (
    <>
    <header>
      <p>Pour your heart out to the stars</p>
      <button>Read more</button>
    </header>
    <main>
      <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth} autofocus />
      
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
