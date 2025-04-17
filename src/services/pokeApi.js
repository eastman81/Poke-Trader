// PokeAPI service for fetching Pokemon data

/**
 * Fetches Pokemon data from the PokeAPI
 * @param {string} pokemonName - The name of the Pokemon to fetch
 * @returns {Promise<Object>} - The Pokemon data
 */
export const fetchPokemonData = async (pokemonName) => {
  try {
    // Get the last word in the name (e.g., "Dark Alakazam" -> "Alakazam")
    const nameParts = pokemonName.trim().split(/\s+/);
    const searchName = nameParts[nameParts.length - 1].toLowerCase();
    
    // Make the API request
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon data: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
}; 