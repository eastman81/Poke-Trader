import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonData } from '../services/pokeApi';

/**
 * Custom hook for fetching Pokemon data
 * @param {string} pokemonName - The name of the Pokemon to fetch
 * @returns {Object} - Pokemon data, loading state, and error state
 */
const usePokemonData = (pokemonName) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the fetch function to prevent unnecessary re-renders
  const getPokemonData = useCallback(async () => {
    if (!pokemonName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchPokemonData(pokemonName);
      if (data) {
        setPokemonData(data);
      }
    } catch (err) {
      console.error('Error fetching Pokemon data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  // Fetch data when the component mounts or when the Pokemon name changes
  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  return { pokemonData, loading, error };
};

export default usePokemonData;
