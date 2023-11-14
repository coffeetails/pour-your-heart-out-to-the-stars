import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [floatingTextContent, setFloatingTextContent] = createSignal("");

  let textBoxScrollWidth = 0;

  let checkScrollWidth = (event) => {
    const textBox = event.target;
    if(textBox.value.length == 1) {
      textBoxScrollWidth = textBox.scrollWidth;
    }
    if(textBoxScrollWidth != textBox.scrollWidth) {
      // Wait untill the word is finished
      if(textBox.value[textBox.value.length-1] == " ") {
        setFloatingTextContent(textBox.value);
        textBox.value = "";
      }
    }
  }

  let debug = () => {
    console.log("textBox", textBox);
    console.log("scrollLeft", textBox.scrollLeft);
    console.log("scrollWidth", textBox.scrollWidth);
    console.log("scrollLeftMax", textBox.scrollLeftMax);
  }
  return (
    <main>
      {/* <label for="textbox">Pour your heart out to the stars</label> */}
      <span id="floatingText">{floatingTextContent()}</span>
      <input type="text" id="textbox" name="textbox" oninput={checkScrollWidth} />
      {/* <button onClick={debug}>debug</button> */}
    </main>
  )
}

export default App

// scrollHeight: 32
// scrollLeft: 111
// scrollLeftMax: 111
// scrollTop: 0
// scrollTopMax: 0
// scrollWidth: 328