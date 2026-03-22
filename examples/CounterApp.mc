# Counter App Example

```mclang
element CounterApp {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([])
  
  function increment() {
    const newCount = count + step
    setCount(newCount)
    setHistory([...history, newCount])
  }
  
  function decrement() {
    const newCount = count - step
    setCount(newCount)
    setHistory([...history, newCount])
  }
  
  function reset() {
    setCount(0)
    setHistory([])
  }
  
  <div class="app">
    <div class="card">
      <h1>Counter App</h1>
      
      <div class="display">
        <span class="number">{count}</span>
      </div>
      
      <div class="control-group">
        <label>Step: </label>
        <input 
          type="number" 
          value={step} 
          onchange={(e) => setStep(parseInt(e.target.value))}
          min="1"
        />
      </div>
      
      <div class="controls">
        <button class="btn btn-primary" onclick={increment}>
          + {step}
        </button>
        <button class="btn btn-primary" onclick={decrement}>
          - {step}
        </button>
        <button class="btn btn-secondary" onclick={reset}>
          Reset
        </button>
      </div>
      
      {history.length > 0 && (
        <div class="history">
          <h3>History</h3>
          <div class="history-items">
            {history.map((num, idx) => (
              <span key={idx} class="history-item">{num}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  
  style {
    .app {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
    }
    
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 100%;
    }
    
    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 2rem 0;
    }
    
    .display {
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    
    .number {
      font-size: 4rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .control-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .control-group label {
      font-weight: 500;
      color: #333;
    }
    
    .control-group input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .btn {
      padding: 1rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: #667eea;
      color: white;
    }
    
    .btn-primary:hover {
      background: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
    
    .btn-secondary {
      background: #f44336;
      color: white;
      grid-column: 1 / -1;
    }
    
    .btn-secondary:hover {
      background: #da190b;
      transform: translateY(-2px);
    }
    
    .history {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #eee;
    }
    
    .history h3 {
      color: #333;
      margin: 0 0 1rem 0;
    }
    
    .history-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .history-item {
      padding: 0.5rem 1rem;
      background: #f5f5f5;
      border-radius: 4px;
      color: #667eea;
      font-weight: 600;
    }
    
    @media (max-width: 600px) {
      .card {
        padding: 1.5rem;
      }
      
      .number {
        font-size: 3rem;
      }
      
      .controls {
        grid-template-columns: 1fr;
      }
    }
  }
}
```
