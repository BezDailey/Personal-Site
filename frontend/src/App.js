import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage.jsx";

/**
 * Root application component. Renders the Homepage.
 * @returns {React.JSX.Element}
 */
function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
