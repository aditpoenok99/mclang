# MOCASUS LANG (MCLANG)

<div align="center">

![MCLANG Logo](https://img.shields.io/badge/MCLANG-Mocasus%20Lang-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square)

**A Modern Programming Language for Web Frontend Development**

[Documentation](#dokumentasi) • [Quick Start](#quick-start) • [Examples](#contoh-penggunaan) • [API Reference](#api-reference)

</div>

---

## 📖 Tentang MCLANG

**MCLANG (Mocasus Lang)** adalah bahasa pemrograman modern yang dirancang khusus untuk pengembangan frontend web. Bahasa ini mentranspile ke JavaScript, HTML, dan CSS, memberikan pengalaman pengembangan yang lebih intuitif dan ekspresif.

### ✨ Fitur Utama

- **Sintaks Modern & Intuitif**: Menggabungkan yang terbaik dari Python, JavaScript, dan bahasa deklaratif
- **Component-Based Development**: Buat component reusable dengan mudah
- **Type-Safe**: Type inference otomatis untuk keamanan kode
- **Template Literals**: Support untuk template string dengan interpolasi
- **Scoped Styling**: CSS terintegrasi dengan scope otomatis
- **Reactive State Management**: Built-in reactive system
- **Async/Await Support**: Penanganan operasi asynchronous yang elegan
- **Small Bundle Size**: Output transpile yang minimal dan efisien
- **Excellent Developer Experience**: Error messages yang jelas dan helpful

---

## 🚀 Quick Start

### Instalasi

```bash
npm install -g mclang
```

Or clone from repository:

```bash
git clone https://github.com/aditpoenok99/mclang.git
cd mclang
npm install
npm run build
npm link
```

### Program Pertama Anda

Buat file `hello.mc`:

```mclang
element HelloWorld {
  <div class="greeting">
    <h1>Hello, MCLANG!</h1>
    <p>Welcome to the future of web development</p>
  </div>
  
  style {
    .greeting {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
    }
    
    h1 {
      margin: 0;
      font-size: 2.5rem;
    }
    
    p {
      margin: 1rem 0 0 0;
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }
}
```

Transpile ke JavaScript:

```bash
mclang compile hello.mc --output hello.js
```

---

## 📚 Dokumentasi Lengkap

### 1. Variabel dan Tipe Data

```mclang
const nama = "MCLANG"
const versi = 1.0
const isAmazing = true
const items = [1, 2, 3, 4, 5]
const user = { name: "John", age: 30, email: "john@example.com" }

var counter = 0
var status = "active"

const pesan = `Hello, {nama}! Versi: {versi}`
```

**Fitur Tipe Data:**
- String, Number, Boolean, Array, Object
- Template strings dengan interpolasi menggunakan `{}`
- Type inference otomatis
- Immutable constants dan mutable variables

### 2. Operasi Dasar

```mclang
// Arithmetic Operations
const sum = 10 + 5      // 15
const product = 10 * 5  // 50
const quotient = 10 / 2 // 5
const remainder = 10 % 3 // 1

// Logical Operations
const isTrue = true && false  // false
const isLogic = true || false // true
const notValue = !true        // false

// Comparison
const isEqual = 5 == 5        // true
const isStrictEqual = 5 === "5" // false
const isGreater = 10 > 5      // true
```

### 3. Functions (Fungsi)

```mclang
// Function declaration
function greet(name) {
  const message = `Hello, {name}!`
  return message
}

// Function dengan default parameter
function add(a, b, c = 0) {
  return a + b + c
}

// Arrow function
const multiply = (x, y) => x * y

// Async function
async function fetchUser(id) {
  const response = await fetch(`/api/users/{id}`)
  const data = await response.json()
  return data
}

// Function dengan rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0)
}

// Spread operator dalam function call
const arr = [1, 2, 3]
const result = sum(...arr)  // 6
```

### 4. Control Flow

```mclang
// If/Else
if (age >= 18) {
  return "Adult"
} else if (age >= 13) {
  return "Teenager"
} else {
  return "Child"
}

// Ternary operator
const status = age >= 18 ? "Adult" : "Minor"

// For loop
for (var i = 0; i < 10; i++) {
  console.log(i)
}

// While loop
var count = 0
while (count < 5) {
  console.log(count)
  count++
}

// Switch statement
switch (dayNumber) {
  case 1:
    return "Monday"
  case 2:
    return "Tuesday"
  default:
    return "Unknown"
}
```

### 5. Objects dan Arrays

```mclang
// Object literal
const person = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  greet: function() {
    return `Hello, I'm {this.name}`
  }
}

// Destructuring objects
const { name, age, email } = person

// Destructuring arrays
const [first, second, ...rest] = [1, 2, 3, 4, 5]

// Spread operator
const newPerson = { ...person, age: 31 }
const combinedArray = [1, 2, ...[3, 4, 5]]

// Array methods
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)        // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0) // [2, 4]
const sum = numbers.reduce((a, b) => a + b, 0) // 15
const item = numbers.find(n => n > 3)          // 4
const index = numbers.indexOf(3)               // 2
```

### 6. Element Definition (Components)

```mclang
element Button {
  const [isActive, setActive] = useState(false)
  
  <button 
    class="btn"
    onclick={() => setActive(!isActive)}
  >
    Click Me
  </button>
  
  style {
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }
  }
}
```

### 7. Props dan Children

```mclang
element Card(props) {
  const { title, subtitle, children } = props
  
  <div class="card">
    <div class="card-header">
      <h2>{title}</h2>
      {subtitle ? <p class="subtitle">{subtitle}</p> : null}
    </div>
    <div class="card-body">
      {children}
    </div>
  </div>
  
  style {
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
  }
}

// Usage
<Card title="Welcome" subtitle="To MCLANG">
  <p>This is a card component</p>
</Card>
```

### 8. State Management dengan Hooks

#### useState

```mclang
element Counter {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  
  <div class="counter">
    <p>Count: {count}</p>
    <input value={name} onchange={(e) => setName(e.target.value)} />
    <button onclick={() => setCount(count + 1)}>Increment</button>
    <button onclick={() => setCount(count - 1)}>Decrement</button>
    <button onclick={() => setCount(0)}>Reset</button>
  </div>
}
```

#### useEffect

```mclang
element UserFetcher(props) {
  const { userId } = props
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/{userId}`)
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])  // Dependency array
  
  <div class="user-fetcher">
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p class="error">Error: {error}</p>
    ) : user ? (
      <div class="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ) : null}
  </div>
}
```

### 9. Conditional Rendering

```mclang
element UserProfile(props) {
  const { user, isLoggedIn } = props
  
  <div class="profile">
    {isLoggedIn ? (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    ) : (
      <div class="not-logged-in">
        <p>Please log in to see profile</p>
      </div>
    )}
  </div>
}
```

### 10. Loops dalam Element

```mclang
element TodoList(props) {
  const { todos } = props
  
  <div class="todo-list">
    <h2>My Todos</h2>
    {todos.map(todo => (
      <div key={todo.id} class={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <span>{todo.title}</span>
        <span class="date">{todo.dueDate}</span>
      </div>
    ))}
  </div>
  
  style {
    .todo-item {
      padding: 1rem;
      border-bottom: 1px solid #ddd;
    }
    
    .todo-item.completed {
      opacity: 0.5;
      text-decoration: line-through;
    }
  }
}
```

### 11. Styling dengan CSS Scoping

```mclang
element StyledComponent {
  <div class="container">
    <h1>Styled Component</h1>
    <p class="description">This has scoped styles</p>
    <button class="primary-btn">Click Me</button>
  </div>
  
  style {
    // Semua selector otomatis di-scope ke component ini
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      color: #333;
      border-bottom: 3px solid #007bff;
      padding-bottom: 1rem;
    }
    
    .primary-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .primary-btn:hover {
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
    }
  }
}
```

### 12. Advanced Features

#### Classes

```mclang
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
    this.createdAt = new Date()
  }
  
  getDisplayName() {
    return `{this.name} ({this.email})`
  }
}

const user = new User("John Doe", "john@example.com")
console.log(user.getDisplayName())
```

#### Modules

```mclang
// utils.mc
export function add(a, b) {
  return a + b
}

export const PI = 3.14159

// main.mc
import { add, PI } from "./utils.mc"

const result = add(10, 5)
```

---

## 💡 Contoh Lengkap: Counter App

```mclang
element CounterApp {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([])
  
  function handleIncrement() {
    const newCount = count + 1
    setCount(newCount)
    setHistory([...history, newCount])
  }
  
  function handleReset() {
    setCount(0)
    setHistory([])
  }
  
  <div class="app">
    <div class="counter-card">
      <h1>Counter Application</h1>
      <div class="display">
        <span class="number">{count}</span>
      </div>
      <div class="controls">
        <button class="btn btn-increment" onclick={handleIncrement}>
          Increment
        </button>
        <button class="btn btn-reset" onclick={handleReset}>
          Reset
        </button>
      </div>
      
      {history.length > 0 ? (
        <div class="history">
          <h3>History</h3>
          <ul>
            {history.map((num, idx) => (
              <li key={idx}>{num}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  </div>
  
  style {
    .app {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .counter-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 500px;
    }
    
    .display {
      text-align: center;
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    
    .number {
      font-size: 3rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .btn {
      flex: 1;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-increment {
      background: #4CAF50;
      color: white;
    }
    
    .btn-increment:hover {
      background: #45a049;
      transform: translateY(-2px);
    }
  }
}
```

---

## 🛠️ CLI Commands

```bash
# Initialize project
mclang init my-project

# Compile single file
mclang compile app.mc --output dist/app.js

# Watch mode
mclang watch src/

# Build project
mclang build

# Development server
mclang dev

# Format code
mclang format src/

# Lint code
mclang lint src/

# Run tests
mclang test
```

---

## ⚙️ Configuration

**mclang.config.js**

```javascript
module.exports = {
  entry: './src/App.mc',
  output: {
    dir: './dist',
    filename: '[name].js',
  },
  target: 'browser',
  mode: 'development',
  sourceMaps: true,
  minify: false,
  devServer: {
    port: 3000,
    hot: true,
  },
};
```

---

## 📦 Project Structure

```
my-project/
├── src/
│   ├── components/
│   │   ├── Header.mc
│   │   ├── Footer.mc
│   │   └── Button.mc
│   ├── pages/
│   │   └── Home.mc
│   ├── utils/
│   │   └── helpers.mc
│   └── App.mc
├── dist/
├── public/
├── mclang.config.js
├── package.json
└── README.md
```

---

## 🤝 Contributing

Kontribusi sangat diterima!

```bash
git clone https://github.com/aditpoenok99/mclang.git
cd mclang
npm install
npm run build
npm test
```

---

## 📝 License

MIT License - lihat [LICENSE](LICENSE)

---

## 📞 Support

- 📖 [Documentation](https://github.com/aditpoenok99/mclang)
- 💬 [Discussions](https://github.com/aditpoenok99/mclang/discussions)
- 🐛 [Issues](https://github.com/aditpoenok99/mclang/issues)

---

<div align="center">

Made with ❤️ by Mocasus Community

[⬆ Back to top](#mocasus-lang-mclang)

</div>
