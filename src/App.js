import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Display from "./components/Display";
import FullForm from "./components/Form";
import CollectionForm from "./components/CollectionForm";

import './App.css';

function App() {
  const [cards, setCards] = useState([
    {
      name: "Charizard",
      type: "Pokémon",
      number: 4,
      
      set: "Base Set",
      edition: "Unlimited",
      shadowless: true,

      salesChannel: "eBay",
      priceSold: 250.99,
      shippingCharged: 5,
      shippingCost: 10,
      cardCost: 0,
      total: 255.99
    },
    {
      name: "Charmeleon",
      type: "Pokémon",
      number: 50,
      
      set: "Base Set",
      edition: "Unlimited",
      shadowless: true,

      salesChannel: "eBay",
      priceSold: 25.99,
      shippingCharged: 5,
      shippingCost: 10,
      cardCost: 0,
      total: 30.99
    },
    {
      name: "Charmander",
      type: "Pokémon",
      number: 51,
      
      set: "Base Set",
      edition: "Unlimited",
      shadowless: true,

      salesChannel: "eBay",
      priceSold: 2.99,
      shippingCharged: 5,
      shippingCost: 10,
      cardCost: 0,
      total: 7.99
    },
    {
      name: "Dark Alakazam",
      type: "Pokémon",
      number: 18,
      set: "Team Rocket",
      edition: "Unlimited",
      shadowless: false,
      salesChannel: "eBay",
      priceSold: 10.99,
      shippingCharged: 5,
      shippingCost: 4.75,
      cardCost: 0,
      total: 15.99
    }
  ]);

  const [collection, setCollection] = useState([
    {
      name: "Pikachu",
      type: "Pokémon",
      number: 58,
      set: "Base Set",
      edition: "Unlimited",
      shadowless: false,
      condition: "Near Mint",
      estimatedValue: 15.99
    },
    {
      name: "Blastoise",
      type: "Pokémon",
      number: 2,
      set: "Base Set",
      edition: "Unlimited",
      shadowless: false,
      condition: "Excellent",
      estimatedValue: 120.00
    },
    {
      name: "Venusaur",
      type: "Pokémon",
      number: 15,
      set: "Base Set",
      edition: "Unlimited",
      shadowless: false,
      condition: "Good",
      estimatedValue: 85.00
    }
  ]);

  const [wantToSell, setWantToSell] = useState([
    {
      name: "Mewtwo",
      type: "Pokémon",
      number: 10,
      set: "Base Set",
      edition: "Unlimited",
      shadowless: false,
      condition: "Near Mint",
      estimatedValue: 45.00
    }
  ]);

  const [editingCard, setEditingCard] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [prefillData, setPrefillData] = useState(null);
  const [activeView, setActiveView] = useState("landing"); // "landing", "sell", "collection"

  const addCard = (name, type, number, set, edition, shadowless, salesChannel, priceSold, shippingCharged, shippingCost, cardCost, total) => {
    // If we're editing a card, update it instead of adding a new one
    if (editingIndex !== -1) {
      const updatedCards = [...cards];
      updatedCards[editingIndex] = { 
        name, type, number, set, edition, shadowless, 
        salesChannel, priceSold, shippingCharged, shippingCost, cardCost, total 
      };
      setCards(updatedCards);
      
      // Reset editing state
      setEditingCard(null);
      setEditingIndex(-1);
    } else {
      // Add a new card
      const newCards = [...cards, { name, type, number, set, edition, shadowless, salesChannel, priceSold, shippingCharged, shippingCost, cardCost, total }];
      setCards(newCards);
    }
    
    // Clear prefill data after adding/updating a card
    setPrefillData(null);
    setActiveView("landing");
  };

  const addToCollection = (name, set, edition, shadowless, condition, estimatedValue) => {
    const newCard = {
      name,
      type: "Pokémon",
      number: "",
      set,
      edition,
      shadowless,
      condition,
      estimatedValue
    };
    
    setCollection([...collection, newCard]);
    setActiveView("landing");
  };

  const editCard = (index) => {
    setEditingCard(cards[index]);
    setEditingIndex(index);
    setActiveView("sell");
  };

  const cancelEditing = () => {
    setEditingCard(null);
    setEditingIndex(-1);
    setActiveView("landing");
  };

  const deleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    
    // If we're deleting the card we're currently editing, reset the editing state
    if (index === editingIndex) {
      setEditingCard(null);
      setEditingIndex(-1);
    }
    setActiveView("landing");
  };

  const moveToWantToSell = (index) => {
    const cardToMove = collection[index];
    const updatedCollection = [...collection];
    updatedCollection.splice(index, 1);
    setCollection(updatedCollection);
    setWantToSell([...wantToSell, cardToMove]);
  };

  const moveToCollection = (index) => {
    const cardToMove = wantToSell[index];
    const updatedWantToSell = [...wantToSell];
    updatedWantToSell.splice(index, 1);
    setWantToSell(updatedWantToSell);
    setCollection([...collection, cardToMove]);
  };

  const sellCard = (index) => {
    const cardToSell = wantToSell[index];
    const updatedWantToSell = [...wantToSell];
    updatedWantToSell.splice(index, 1);
    setWantToSell(updatedWantToSell);
    
    setPrefillData({
      name: cardToSell.name,
      set: cardToSell.set,
      edition: cardToSell.edition,
      shadowless: cardToSell.shadowless
    });
    setActiveView("sell");
  };

  const clearForm = () => {
    setEditingCard(null);
    setEditingIndex(-1);
    setPrefillData(null);
  };

  const renderLandingPage = () => {
    return (
      <Container className="text-center my-5 p-0">
        <h2 className="mb-4">What would you like to do?</h2>
        <Row className="justify-content-center">
          <Col md={6} className="">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Add a Card to Sell</Card.Title>
                <Card.Text className="flex-grow-1">
                  Record a card that you've already sold, including details about the sale.
                </Card.Text>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="mt-auto"
                  onClick={() => setActiveView("sell")}
                >
                  Add a Sold Card
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Add a Card to Collection</Card.Title>
                <Card.Text className="flex-grow-1">
                  Add a new card to your current collection with details about its condition and value.
                </Card.Text>
                <Button 
                  variant="success" 
                  size="lg" 
                  className="mt-auto"
                  onClick={() => setActiveView("collection")}
                >
                  Add to Collection
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderSellForm = () => {
    return (
      <div className="card p-3 m-3" style={{ border: '2px solid black' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Add a Sold Card</h3>
          <Button variant="outline-secondary" onClick={() => setActiveView("landing")}>
            Back to Options
          </Button>
        </div>
        <FullForm
          addCard={addCard}
          editingCard={editingCard}
          editingIndex={editingIndex}
          cancelEditing={cancelEditing}
          deleteCard={deleteCard}
          prefillData={prefillData}
          clearForm={clearForm}
        />
      </div>
    );
  };

  const renderCollectionForm = () => {
    return (
      <div className="card p-3 m-3" style={{ border: '2px solid black' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Add a Card to Collection</h3>
          <Button variant="outline-secondary" onClick={() => setActiveView("landing")}>
            Back to Options
          </Button>
        </div>
        <CollectionForm addToCollection={addToCollection} />
      </div>
    );
  };

  return (
    <div className="App">
      <div className="App-content">
        <h1 className="text-center my-3">Pokémon Card Tracker</h1>

        <Row className="mx-0">
          <Col md={6} className="px-0">
            <Card className="p-3 my-3 mx-3" style={{ border: '2px solid black' }}>
              <h3>Current Collection</h3>
              <div className="collection-list">
                {collection.map((card, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Title className="text-center">{card.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Text className="flex-grow-1">
                          {card.set} - {card.edition} Edition
                          <br />
                          Condition: {card.condition}
                          <br />
                          Estimated Value: ${card.estimatedValue.toFixed(2)}
                        </Card.Text>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => moveToWantToSell(index)}
                        >
                          Move to Want to Sell
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card>
          </Col>

          <Col md={6} className="px-0">
            <Card className="p-3 my-3 mx-3" style={{ border: '2px solid black' }}>
              <h3>Want to Sell</h3>
              <div className="collection-list">
                {wantToSell.map((card, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Title className="text-center">{card.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Text className="flex-grow-1">
                          {card.set} - {card.edition} Edition
                          <br />
                          Condition: {card.condition}
                          <br />
                          Estimated Value: ${card.estimatedValue.toFixed(2)}
                        </Card.Text>
                        <div className="d-flex flex-column">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => moveToCollection(index)}
                            className="mb-2"
                          >
                            Move to Collection
                          </Button>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => sellCard(index)}
                          >
                            Sell
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {activeView === "landing" && renderLandingPage()}
        {activeView === "sell" && renderSellForm()}
        {activeView === "collection" && renderCollectionForm()}

        <Row className="mx-0">
          <Col className="px-0">
            <Card className="p-3 mx-3 my-3" style={{ border: '2px solid black' }}>
              <h3 className="mb-3">Cards Sold</h3>
              <Display
                cards={cards}
                onEditCard={editCard}
              />
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  );
}

export default App;
