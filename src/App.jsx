import "./App.css";
import DownloadPDF from "./components/DownloadPDF";
import { useState } from "react";

function App() {
  const [bound, setBound] = useState(10);

  const handleInputChange = (e) => {
    setBound(Number(e.target.value));
  };

  return (
    <div className="App">
      <h2>Generate Math Problems</h2>
      <div className="App-header">
        <label>
          Maximum Number:
          <input
            type="number"
            value={bound}
            onChange={handleInputChange}
            min="1"
          />
        </label>
      </div>
      <div className="button-container">
        <DownloadPDF bound={bound}></DownloadPDF>
      </div>
    </div>
  );
}

export default App;
