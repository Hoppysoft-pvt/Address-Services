import { useState } from "react";
import "./App.css";
import Address from "./lib";
function App() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleOnChange = (data) => {
    setSelectedAddress(data);
  };

  return (
    <div className="App">
      <Address onChange={handleOnChange} />
    </div>
  );
}

export default App;
