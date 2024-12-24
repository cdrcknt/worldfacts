import React, { useState, useEffect } from 'react';
import { Country } from './types/country';
import { getAllCountries, searchCountries } from './services/api';
import { CountryCard } from './components/CountryCard';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [displayedCountry, setDisplayedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    try {
      const data = await getAllCountries();
      setCountries(data);
      setDisplayedCountry(getRandomCountry(data));
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load countries');
      setLoading(false);
    }
  }

  function getRandomCountry(countryList: Country[]) {
    return countryList[Math.floor(Math.random() * countryList.length)];
  }

  function shuffleCountry() {
    setDisplayedCountry(getRandomCountry(countries));
  }

  async function handleSearch(query: string) {
    if (!query.trim()) {
      setDisplayedCountry(getRandomCountry(countries));
      return;
    }

    try {
      const results = await searchCountries(query);
      if (results.length > 0) {
        setDisplayedCountry(results[0]);
      } else {
        toast.error('No countries found');
      }
    } catch (error) {
      toast.error('Failed to search countries');
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Header onSearch={handleSearch} onShuffle={shuffleCountry} />
          {displayedCountry && (
            <div className="max-w-2xl mx-auto">
              <CountryCard country={displayedCountry} />
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}