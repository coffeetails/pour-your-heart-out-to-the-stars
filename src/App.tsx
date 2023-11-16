import { createSignal } from 'solid-js'
import './App.css'
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal<string>("");
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
        setFloatingTextContent(textBoxValue);
        let floatingTextElem = document.getElementById("floatingText");
        // TODO: create new elements for each word, then remove them
        // The animation will be for each row of words
        anime({
          targets: floatingTextElem,
          keyframes: [
            {
              duration: 500,
              opacity: 1,
              translateY: -10
            },
            {
              duration: 5000,
              translateY: -270,
              opacity: 0,
              // rotate: anime.stagger([-360, 360]), // rotation will be distributed from -360deg to 360deg evenly between all elements
            },
            {
              duration: 100,
              translateY: 0
            }
          ],
          easing: 'easeInOutQuad',
          loop: false,
        });
        
        event.target.value = "";
      }
    }
  }

  return (
    <main>
      {/* <label for="textbox">Pour your heart out to the stars</label> */}
      {/* TODO: Change the span to a div */}
      <span id="floatingText">{floatingTextContent()}</span>
      <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth} />
    </main>
  )
}

export default App
