import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function GridComplexExample(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [set, setSet] = useState("");
  const [edition, setEdition] = useState("");
  const [shadowless, setShadowless] = useState();
  const [salesChannel, setSalesChannel] = useState("");
  const [priceSold, setPriceSold] = useState("");
  const [shippingCharged, setShippingCharged] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [cardCost, setCardCost] = useState("");

  const [validated, setValidated] = useState(false);

  // Effect to populate form when editingCard changes
  useEffect(() => {
    if (props.editingCard) {
      setName(props.editingCard.name);
      setType(props.editingCard.type);
      setNumber(props.editingCard.number);
      setSet(props.editingCard.set);

      // Make sure the edition value matches the option values in the Form.Select
      let editionValue = props.editingCard.edition;

      // Convert to lowercase for comparison
      const lowerEdition = editionValue.toLowerCase();

      // Map to the correct option value
      if (lowerEdition.includes("1st") || lowerEdition.includes("first")) {
        editionValue = "first";
      } else if (lowerEdition.includes("unlimited")) {
        editionValue = "unlimited";
      } else if (lowerEdition.includes("miss") || lowerEdition.includes("misprint")) {
        editionValue = "missprint";
      }

      setEdition(editionValue);

      setShadowless(props.editingCard.shadowless);
      setSalesChannel(props.editingCard.salesChannel);
      setPriceSold(props.editingCard.priceSold.toString());
      setShippingCharged(props.editingCard.shippingCharged ? props.editingCard.shippingCharged.toString() : "");
      setShippingCost(props.editingCard.shippingCost ? props.editingCard.shippingCost.toString() : "");
      setCardCost(props.editingCard.cardCost.toString());
    }
  }, [props.editingCard]);

  // Effect to handle prefill data
  useEffect(() => {
    if (props.prefillData) {
      setName(props.prefillData.name || "");
      setSet(props.prefillData.set || "");
      
      // Handle edition value
      let editionValue = props.prefillData.edition || "";
      
      // Convert to lowercase for comparison
      const lowerEdition = editionValue.toLowerCase();
      
      // Map to the correct option value
      if (lowerEdition.includes("1st") || lowerEdition.includes("first")) {
        editionValue = "first";
      } else if (lowerEdition.includes("unlimited")) {
        editionValue = "unlimited";
      } else if (lowerEdition.includes("miss") || lowerEdition.includes("misprint")) {
        editionValue = "missprint";
      }
      
      setEdition(editionValue);
      setShadowless(props.prefillData.shadowless);
    }
  }, [props.prefillData]);

  // Function to reset form fields to their initial state
  const resetForm = () => {
    setName("");
    setType("");
    setNumber("");
    setSet("");
    setEdition("");
    setShadowless(undefined);
    setSalesChannel("");
    setPriceSold("");
    setShippingCharged("");
    setShippingCost("");
    setCardCost("");
    setValidated(false);
  };

  // Simple handler to validate numeric input with at most one decimal point and 2 decimal places
  const handleNumericChange = (value, setter) => {
    if (value === '') {
      setter(value);
      return;
    }

    // Check if the value is a valid number format with at most one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      // If it has a decimal point
      if (value.includes('.')) {
        const parts = value.split('.');

        // If there's more than one decimal point, only keep the first one
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }

        // If there are more than 2 decimal places, trim to 2
        if (parts[1] && parts[1].length > 2) {
          value = parts[0] + '.' + parts[1].substring(0, 2);
        }
      }

      setter(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Convert string values to numbers for calculation
      const priceSoldNum = parseFloat(priceSold);
      const shippingChargedNum = shippingCharged ? parseFloat(shippingCharged) : 0;
      const shippingCostNum = shippingCost ? parseFloat(shippingCost) : 0;
      const cardCostNum = parseFloat(cardCost);

      const total = Number(((priceSoldNum + shippingChargedNum) - (cardCostNum + shippingCostNum)).toFixed(2));
      props.addCard(name, type, number, set, edition, shadowless, salesChannel, priceSoldNum, shippingChargedNum, shippingCostNum, cardCostNum, total);
      resetForm();
    }
  };

  const handleClearForm = () => {
    resetForm();
    if (props.clearForm) {
      props.clearForm();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} id="form">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Card Name" required feedbacktype="invalid" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridType">
          <Form.Label>Type</Form.Label>
          <Form.Select required feedbacktype="invalid" value={type} onChange={e => setType(e.target.value)}>
            <option>Choose...</option>
            <option value="Pokémon">Pokémon</option>
            <option value="Trainer">Trainer</option>
            <option value="Item">Item</option>
            <option value="Energy">Energy</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" placeholder="Card Number" required feedbacktype="invalid" value={number} onChange={e => setNumber(e.target.value)} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridSet">
          {/* validation here is tricky has there are 98 card sets. Could use a checker to make sure it is an existing one in future */}
          <Form.Label>Release Set</Form.Label>
          <Form.Control type="text" placeholder="Set Name" required feedbacktype="invalid" value={set} onChange={e => setSet(e.target.value)} />
        </Form.Group>

        {/* these are auto validating to valid because of the top choose option */}
        <Form.Group as={Col} controlId="formGridEdition">
          <Form.Label>Edition</Form.Label>
          <Form.Select required feedbacktype="invalid" value={edition} onChange={e => setEdition(e.target.value)}>
            {/* validation here to make sure they don't submit with choose... */}
            <option>Choose...</option>
            <option value={"first"}>1st Edition</option>
            <option value={"unlimited"}>Unlimited</option>
            <option value={"missprint"}>Missprint</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridShadowless">
          <Form.Label>Shadowless</Form.Label>
          <Form.Select required feedbacktype="invalid" value={shadowless} onChange={e => setShadowless(e.target.value)}>
            {/* validation here to make sure they don't submit with choose... */}
            <option>Choose...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      {/* validation for all price entries needed for international users, as they use "," in place of ".", and that doesn't work with parseFloat */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridSalesChannel">
          <Form.Label>Sales Channel</Form.Label>
          <Form.Control placeholder="ebay/Pay Pal/In Person..." required feedbacktype="invalid" value={salesChannel} onChange={e => setSalesChannel(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPriceSold">
          <Form.Label>Price Sold</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Price"
              required
              feedbacktype="invalid"
              value={priceSold}
              onChange={e => handleNumericChange(e.target.value, setPriceSold)}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridShippingCharged">
          <Form.Label>Shipping Charged</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Amount"
              value={shippingCharged}
              onChange={e => handleNumericChange(e.target.value, setShippingCharged)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridShippingCost">
          <Form.Label>Shipping Cost</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Cost"
              value={shippingCost}
              onChange={e => handleNumericChange(e.target.value, setShippingCost)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCardCost">
          <Form.Label>Card Cost</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Price You Purchased Card For"
              required
              feedbacktype="invalid"
              value={cardCost}
              onChange={e => handleNumericChange(e.target.value, setCardCost)}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          onClick={handleClearForm}
        >
          Clear Form
        </Button>

        <Button variant="primary" type="submit">
          {props.editingCard ? "Update" : "Submit"}
        </Button>

        {props.editingCard && (
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              props.cancelEditing();
            }}
          >
            Cancel
          </Button>
        )}

        {props.editingCard && (
          <Button
            variant="danger"
            className="ms-auto"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this card?")) {
                props.deleteCard(props.editingIndex);
                resetForm();
              }
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </Form>
  );
}

export default GridComplexExample;
