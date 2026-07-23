import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Quote.css';

interface QuoteData {
  quote: string;
  author: string;
}

// Map moods to quote categories
const moodToCategory: { [key: string]: string } = {
  'calm': 'peace',
  'peaceful': 'peace',
  'energetic': 'success',
  'uplifted': 'happiness',
  'ethereal': 'inspirational',
  'abundance': 'success',
};

export default function Quote() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentMood = useSelector((state: RootState) => state.mood?.currentMood || '');

  const fetchQuote = (category: string, apiKey: string) => {
    setIsLoading(true);
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setQuote(data[0]);
        } else {
          setQuote(null);
        }
      })
      .catch(err => {
        console.error('Quote fetch error:', err);
        setQuote(null);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // Determine category based on mood
    const category = moodToCategory[currentMood] || 'inspirational';
    const apiKey = process.env.REACT_APP_QUOTES_API_KEY;

    if (!apiKey) {
      console.warn('REACT_APP_QUOTES_API_KEY is not set');
      setQuote(null);
      return;
    }

    fetchQuote(category, apiKey);
  }, [currentMood]);

  const handleRefresh = () => {
    const category = moodToCategory[currentMood] || 'inspirational';
    const apiKey = process.env.REACT_APP_QUOTES_API_KEY;

    if (apiKey) {
      fetchQuote(category, apiKey);
    }
  };

  if (!quote && !isLoading) {
    return (
      <div className="quote-error">
        Getting the quote failed. Check if REACT_APP_QUOTES_API_KEY is set.
      </div>
    );
  }

  return (
    <section className="quote">
      {isLoading ? (
        <p className="quote-loading">Loading...</p>
      ) : (
        <>
          <p>{quote?.quote}</p>
          <small>— {quote?.author}</small>
        </>
      )}
      <button 
        onClick={handleRefresh} 
        disabled={isLoading}
        className="quote-refresh-btn"
        aria-label="Get a new quote"
        title="Get a new quote"
      >
        {isLoading ? '⟳ Loading...' : '⟳ New Quote'}
      </button>
    </section>
  );
}
