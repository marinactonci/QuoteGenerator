import { useEffect, useState } from 'react';

interface Quote {
  text: string;
  author: string;
}

function App() {
  const [quotes, setQuotes] = useState<any>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setQuotes(data);
          getNewQuote();
        }
      });
  }, []);

  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const randomQuote = (index: number) => {
    return quotes[index];
  }

  const getNewQuote = () => {
    if (quotes !== null) {
      const rndNumber = randomInt(0, quotes.length);
      const rndQuote = randomQuote(rndNumber);
      setQuote({
        text: rndQuote.text,
        author: rndQuote.author.split(", ")[0]
      });
    }
  }

  return (
    <div className='h-screen w-full bg-red-500 grid place-items-center'>
      <div className='bg-white rounded-lg flex flex-col gap-3 p-12 min-w-xl max-w-2xl'>
        {quote && (
          <>
            <div className='flex gap-3'>
              <i className="fa-solid fa-quote-left text-red-500"></i>
              <p>{quote.text}</p>
            </div>
            <div className='flex justify-end w-full'>
              <span>- {quote.author}</span>
            </div>
          </>
        )}
        <div className='flex justify-between items-center gap-6'>
          <div className='flex items-center gap-3'>
            <button className='bg-red-500 rounded-sm py-2 px-4 text-white hover:bg-red-400 transition-colors'><i className="fa-brands fa-x-twitter"></i></button>
            <button className='bg-red-500 rounded-sm py-2 px-4 text-white hover:bg-red-400 transition-colors'><i className="fa-brands fa-tumblr"></i></button>
          </div>
          <button className='bg-red-500 rounded-sm py-2 px-4 text-white hover:bg-red-400 transition-colors' onClick={getNewQuote}>New quote</button>
        </div>
      </div>
    </div>
  )
}

export default App;