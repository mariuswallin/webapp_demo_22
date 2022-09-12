import { useState } from "react";

export default function Actions() {
  const [inputValue, setInputValue] = useState("");

  const handleClick = (event: any) => {
    console.log(event);
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    setInputValue(value);
  };

  const handleSelectChange = (event: any) => {
    console.log(event.target.value);
  };

  const handleSumbit = (event: any) => {
    event.preventDefault();
    console.log(event.target.elements);
    console.log(inputValue);
  };

  return (
    <section>
      <h1>Her øver vi på events {inputValue}</h1>
      <form onSubmit={handleSumbit}>
        <label htmlFor="textbox">
          <input
            id="textbox"
            type="text"
            placeholder="Legg til tekst"
            onChange={handleInputChange}
            value={inputValue}
          />
        </label>
        <select onChange={handleSelectChange}>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
        <button onClick={handleClick}>Send svar</button>
      </form>
    </section>
  );
}
