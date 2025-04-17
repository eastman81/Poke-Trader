import { useState } from "react";

export default function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("baseSet");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="baseSet">Base Set</option>
          <option value="fossil">Fossil</option>
          <option value="jungle">Jungle</option>
        </select>
      </label>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}
