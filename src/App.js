import './index.css';
import React from 'react';
import axios from 'axios'
import { FaFacebook, FaTwitter, FaSync, FaQuoteLeft, FaGithub } from "react-icons/fa"

const API = "https://api.quotable.io/random";
class App extends React.Component
{
 
  state = {
    quotes: [],
    index: 0
  };

  componentDidMount() {
    this.fetchQuote();
  }


   fetchQuote = () => {
    axios.get(API)
      .then((res) => {        
          this.setState(
          {
            quotes: res.data
          },
        this.getRandomIndex
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
  }
};

  render ()
  {
   
    const { quotes, index } = this.state;
    const quote = quotes;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`;

    const facebookURL =
      "https://www.facebook.com/sharer/sharer.php?u=https://try-not-to-laugh-challenge.netlify.app/";

    return (
     
      <body className="flex flex-col min-h-screen">
        
        <header className="flex flex-col items-center justify-center p-8">
          <img 
            className="shadow-lg rounded-full inline-block w-40 h-40 m-8" 
            src={`https://picsum.photos/600?grayscale&random=${index}`} alt="logo" 
          />
          <h1 
            className="font-bold capitalize text-gray-500 dark:text-gray-400 text-center text-lg pt-4"
          >
            Random Motivational Quotes
          </h1>
        </header>

        <main class="flex justify-center">  
          <div className="w-full md:w-2/3 px-4 bg-gray-100 dark:bg-slate-800 mx-4 rounded-xl shadow-2xl text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-4 p-4 md:p-8">
            {quote && (
              <div className="text-2xl">
                <p id="text">
                    <FaQuoteLeft />&nbsp; { quote.content }
                </p>
                <cite id="author" className="float-right">
                  -{quote.author}
                </cite>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8">
              <a
                id="tweet-quote"
                className="flex items-center justify-center border-2 rounded-full hover:bg-gray-900 py-1 px-6 group"
                target="_blank"
                rel="noreferrer"
                href={tweetURL}
              >
                <FaTwitter className='group-hover:animate-pulse'/>&nbsp; Tweet
              </a>

              <a
                id="fb-quote"
                className="flex items-center justify-center border-2 rounded-full hover:bg-gray-900 py-1 px-6 group"
                target="_blank"
                rel="noreferrer"
                href={facebookURL}
              >
              <FaFacebook 
                className='group-hover:animate-pulse'
              />
                  &nbsp; Share
              </a>

              <button
                className="flex items-center justify-center bg-gray-800 border-2 rounded-full py-1 px-6 group hover:bg-gray-900"
                onClick={this.fetchQuote}
                id="new-quote"
              >
              <FaSync 
                className='group-hover:animate-spin'
              />
                &nbsp; Get Quote
              </button>
            </div>
          </div>
            
        </main>

        <footer className="text-gray-500 dark:text-gray-400">
          <div className="text-center text-md p-8 flex justify-center item-center">
            Made with TailwindCSS by Stephen.   
            <a target="_blank" rel="noreferrer" href='https://github.com/Osalumense'> <FaGithub className='text-3xl ml-2 hover:animate-pulse'/></a>
          </div>
        </footer>

      </body>
    );
  }
}

export default App;