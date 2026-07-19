import { useEffect, useState } from 'react';

interface Quote {
  quote: string;
  author: string;
}

export default function Quote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
      headers: {
        'X-Api-Key': process.env.REACT_APP_QUOTES_API_KEY as string
      }
    })
      .then(res => res.json())
      .then(data => setQuote(data[0]))
      .catch(() => setQuote(null));
  }, []);

    if (!quote) {
    return (
        <div className="quote-error">
        Getting the quote failed.
        </div>
    );
    
    }


  return (
    <section className="quote">
      <p>{quote.quote}</p>
      <small>— {quote.author}</small>
    </section>
  );
}
