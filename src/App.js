import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const[status, setStatus] = useState(0);

  useEffect(() => {
    fetch('/status').then(res => res.json()).then(data => {
      setStatus(data.status);
    }, []);
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          smartfeed.ai: {status}
        </p>
      </header>
    </div>
  );
}

export default App;
