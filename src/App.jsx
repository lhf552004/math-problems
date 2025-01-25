import React, { useState } from "react";
import "./App.css";
import DownloadPDF from "./components/DownloadPDF";
import DownloadPDF2 from "./components/DownloadPDF2";
import DownloadSubPDF from "./components/DownloadSubPDF";

function App() {
  const [bound, setBound] = useState(10);

  const handleInputChange = (e) => {
    setBound(Number(e.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Generate Math Problems</h2>
        <label>
          Maximum Number:
          <input
            type="number"
            value={bound}
            onChange={handleInputChange}
            min="1"
          />
        </label>
        <DownloadPDF bound={bound} />
        <DownloadSubPDF bound={bound} />
        <DownloadPDF2 bound={bound} />
      </header>
    </div>
  );
}

export default App;
