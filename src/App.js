
import { useState } from 'react';
import './App.scss';
import Hero from './components/Hero';

function App() {
  const [count, setCount] = useState(0);
     return (
      <div className="app">
        <h1>Hooks</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count +1)}>Increase</button>


      <Hero name="Lan Anh chaizo"/>
      </div>
     )
      }

export default App;
