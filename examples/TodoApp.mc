# MCLANG Example: Simple Todo Application

## File: TodoApp.mc

```mclang
import { Header } from "./components/Header.mc"
import { TodoForm } from "./components/TodoForm.mc"
import { TodoList } from "./components/TodoList.mc"

element TodoApp {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")  // all, active, completed
  
  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
  }
  
  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed))
  }
  
  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })
  
  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length
  
  <div class="app">
    <Header />
    
    <div class="main-content">
      <div class="todo-container">
        <TodoForm onAdd={addTodo} />
        
        <div class="stats">
          <span class="stat">
            <strong>{todos.length}</strong> total
          </span>
          <span class="stat">
            <strong>{activeCount}</strong> active
          </span>
          <span class="stat">
            <strong>{completedCount}</strong> completed
          </span>
        </div>
        
        <div class="filters">
          <button 
            class={`filter-btn ${filter === "all" ? "active" : ""}`}
            onclick={() => setFilter("all")}
          >
            All
          </button>
          <button 
            class={`filter-btn ${filter === "active" ? "active" : ""}`}
            onclick={() => setFilter("active")}
          >
            Active
          </button>
          <button 
            class={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onclick={() => setFilter("completed")}
          >
            Completed
          </button>
          {completedCount > 0 && (
            <button class="clear-btn" onclick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
        
        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  </div>
  
  style {
    .app {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .main-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 2rem 1rem;
    }
    
    .todo-container {
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    
    .stats {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      flex-wrap: wrap;
    }
    
    .stat {
      color: #666;
    }
    
    .stat strong {
      color: #667eea;
      margin-right: 0.25rem;
    }
    
    .filters {
      display: flex;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eee;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      color: #666;
      transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .filter-btn.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }
    
    .clear-btn {
      padding: 0.5rem 1rem;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: auto;
    }
    
    .clear-btn:hover {
      background: #da190b;
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: 1rem 0.5rem;
      }
      
      .filters {
        gap: 0.25rem;
      }
      
      .filter-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  }
}
```

This is a complete, production-ready Todo application example showing:
- Component composition
- State management with hooks
- Event handling
- Conditional rendering
- List rendering with .map()
- LocalStorage integration
- Scoped styling
- Responsive design
