import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ControlledComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control placeholder="First name" type="text" value={inputValue} onChange={handleChange} />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Row>
      <p>Input Value: {inputValue}</p>
    </Form>
  )
};
