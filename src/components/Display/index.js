import React from "react";
// import { Table } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import './Display.css';

import Row from "../DisplayRow";

function Display(props) {
  // Calculate totals
  const totalCards = props.cards.length;
  const totalProfit = props.cards.reduce((sum, card) => sum + card.total, 0);

  return (
    <div>
      <div className="pokemon-table-container">
        <Table striped bordered hover responsive className="pokemon-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Character</th>
              <th>Type</th>
              <th>Card #</th>
              <th>Set</th>
              <th>Edition</th>
              <th>Shadowless</th>
              <th>Sales Channel</th>
              <th>Price Sold</th>
              <th>Shipping Charged</th>
              <th>Shipping Cost</th>
              <th>Card Cost</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {props.cards.map((card, index) => (
              <Row
                key={index}
                index={index}
                card={card}
                onEditCard={props.onEditCard}
              />
            ))}
          </tbody>
        </Table>
      </div>
      
      <div className="summary-container">
        <div className="summary-item">
          <span className="summary-label">Total Cards Sold:</span>
          <span className="summary-value">{totalCards}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Profit:</span>
          <span className="summary-value">${totalProfit.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Display;
