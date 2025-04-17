import React from 'react';
import usePokemonData from '../../hooks/usePokemonData';
import './DisplayRow.css';

function Row(props) {
  const { pokemonData, loading } = usePokemonData(props.card.name);

  return (
    <tr 
      onClick={() => props.onEditCard(props.index)}
      style={{ cursor: 'pointer' }}
      className="pokemon-row"
      role="button"
      tabIndex={0}
      aria-label={`Edit ${props.card.name} card`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          props.onEditCard(props.index);
        }
      }}
    >
      <td>{props.index}</td>
      <td>
        <div className="pokemon-name-cell">
          {loading ? (
            <span>Loading...</span>
          ) : pokemonData && pokemonData.sprites && pokemonData.sprites.front_default ? (
            <img 
              src={pokemonData.sprites.front_default} 
              alt={`${props.card.name} sprite`} 
              className="pokemon-sprite"
            />
          ) : null}
          {props.card.name}
        </div>
      </td>
      <td>{props.card.type}</td>
      <td>{props.card.number}</td>
      <td>{props.card.set}</td>
      <td>{props.card.edition}</td>
      <td>{props.card.shadowless ? "Yes" : "No"}</td>
      <td>{props.card.salesChannel}</td>
      <td>${props.card.priceSold}</td>
      <td>${props.card.shippingCharged}</td>
      <td>${props.card.shippingCost}</td>
      <td>${props.card.cardCost}</td>
      <td>${props.card.total}</td>
    </tr>
  );
}

export default Row;
