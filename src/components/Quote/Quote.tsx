import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
  'abundance': 'success',
};

// Fallback categories to cycle through
const categories = ['inspirational', 'life', 'truth', 'success', 'faith', 'love', 'courage', 'happiness'];

export default function Quote() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const currentMood = useSelector((state: RootState) => state.mood?.currentMood || '');
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    // Determine category based on mood, or cycle through categories
    const category = moodToCategory[currentMood] || categories[categoryIndex % categories.length];
    const apiKey = process.env.REACT_APP_QUOTES_API_KEY;

    if (!apiKey) {
      console.warn('REACT_APP_QUOTES_API_KEY is not set');
      setQuote(null);
      return;
    }

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
      });

    // Cycle category on reload
    setCategoryIndex(prev => prev + 1);
  }, [currentMood, categoryIndex]);

  if (!quote) {
    return (
      <div className="quote-error">
        Getting the quote failed. Check if REACT_APP_QUOTES_API_KEY is set.
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
