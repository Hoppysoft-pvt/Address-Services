import "./App.css";
import Address from "./lib";
function App() {
  const handleOnChange = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <Address onChange={handleOnChange} />
    </div>
  );
}

export default App;
