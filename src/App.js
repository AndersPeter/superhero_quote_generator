import { useState } from "react";
import "./App.scss";
import COLORS_ARRAY from "../src/colorArray.js";
import { CgTwitter } from 'react-icons/cg';

function App() {
  const [quote, setQuote] = useState(
    `It’s not who I am underneath, but what I do that defines me.` 
  );
  const [author, setAuthor] = useState("Batman");
  const [, setRandomNumber] = useState(0);
  const [ , setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuotes = async ( ) => {
    const response = await fetch("https://superhero-quotes.herokuapp.com/random");
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON);
    setQuote(parsedJSON.Stuff.data.quote);
    setAuthor(parsedJSON.Stuff.data.author);
    let randomInteger = Math.floor(COLORS_ARRAY.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger]);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <p style={{fontWeight: "bold"}}> Superhero quote generator</p>
          <p id="text">{quote}</p>
          <p id="author">-{author}</p>
          <div className="button">
            <a
              style={{ backgroundColor: accentColor }}
              target="_top"
              id="tweet-quote"
              href={encodeURI(
                `http://www.twitter.com/intent/tweet?text="${quote}" -${author}`
              )}
            >
              <CgTwitter />
            </a>
          <button
            style={{ backgroundColor: accentColor }}
            id="new-quote"
            onClick={() => fetchQuotes()}
            >
            New quote
          </button>
            </div>
        </div>
      <p>Copyright 2022. Anders Peter Sørensen</p>
      </header>
    </div>
  );
}

export default App;
