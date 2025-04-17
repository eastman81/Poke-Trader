import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CollectionForm(props) {
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [edition, setEdition] = useState("");
  const [shadowless, setShadowless] = useState();
  const [condition, setCondition] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [validated, setValidated] = useState(false);

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
      // Convert string value to number for estimated value
      const estimatedValueNum = parseFloat(estimatedValue);

      props.addToCollection(
        name,
        set,
        edition,
        shadowless,
        condition,
        estimatedValueNum
      );

      // Reset form
      setName("");
      setSet("");
      setEdition("");
      setShadowless(undefined);
      setCondition("");
      setEstimatedValue("");
      setValidated(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Card Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSet">
          <Form.Label>Release Set</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Name"
            required
            value={set}
            onChange={e => setSet(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEdition">
          <Form.Label>Edition</Form.Label>
          <Form.Select
            required
            value={edition}
            onChange={e => setEdition(e.target.value)}
          >
            <option>Choose...</option>
            <option value="first">1st Edition</option>
            <option value="unlimited">Unlimited</option>
            <option value="missprint">Missprint</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridShadowless">
          <Form.Label>Shadowless</Form.Label>
          <Form.Select
            required
            value={shadowless}
            onChange={e => setShadowless(e.target.value)}
          >
            <option>Choose...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCondition">
          <Form.Label>Condition</Form.Label>
          <Form.Select
            required
            value={condition}
            onChange={e => setCondition(e.target.value)}
          >
            <option>Choose...</option>
            <option value="Mint">Mint</option>
            <option value="Near Mint">Near Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Lightly Played">Lightly Played</option>
            <option value="Played">Played</option>
            <option value="Poor">Poor</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEstimatedValue">
          <Form.Label>Estimated Value</Form.Label>
          <Form.Control
            type="text"
            placeholder="Estimated Value"
            required
            value={estimatedValue}
            onChange={e => handleNumericChange(e.target.value, setEstimatedValue)}
          />
        </Form.Group>
      </Row>

      <div className="d-flex gap-2">
        <Button variant="outline-secondary" type="button" onClick={() => {
          setName("");
          setSet("");
          setEdition("");
          setShadowless(undefined);
          setCondition("");
          setEstimatedValue("");
          setValidated(false);
        }}>
          Clear Form
        </Button>

        <Button variant="success" type="submit">
          Add to Collection
        </Button>
      </div>
    </Form>
  );
}

export default CollectionForm;
