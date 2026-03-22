# MCLANG Documentation

## Table of Contents

1. [Language Basics](#language-basics)
2. [Components and Elements](#components-and-elements)
3. [State Management](#state-management)
4. [Advanced Features](#advanced-features)
5. [API Reference](#api-reference)

## Language Basics

### Variables

```mclang
// Constants (immutable)
const name = "John"
const age = 30
const isActive = true

// Variables (mutable)
var counter = 0
var status = "active"
```

### Data Types

- **String**: Text values - `"hello"`, `'world'`
- **Number**: Integers and floats - `42`, `3.14`
- **Boolean**: `true` or `false`
- **Array**: `[1, 2, 3]`
- **Object**: `{name: "John", age: 30}`
- **Null/Undefined**: `null`, `undefined`

### Operators

```mclang
// Arithmetic
const sum = 10 + 5
const diff = 10 - 5
const product = 10 * 5
const quotient = 10 / 5
const remainder = 10 % 3

// Logical
const and = true && false
const or = true || false
const not = !true

// Comparison
5 == 5         // true
5 === "5"      // false
5 != 3         // true
5 !== "5"      // true
5 > 3          // true
5 >= 5         // true
```

## Components and Elements

### Creating Components

```mclang
element MyComponent {
  <div class="container">
    <h1>Hello World</h1>
  </div>
  
  style {
    .container {
      padding: 2rem;
      background: white;
    }
  }
}
```

### Props

```mclang
element Greeting(props) {
  const { name, age } = props
  
  <div>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
  </div>
}

// Usage
<Greeting name="John" age={30} />
```

### Children

```mclang
element Card(props) {
  const { title, children } = props
  
  <div class="card">
    <h2>{title}</h2>
    <div class="content">
      {children}
    </div>
  </div>
}

// Usage
<Card title="My Card">
  <p>This is card content</p>
</Card>
```

## State Management

### useState Hook

```mclang
element Counter {
  const [count, setCount] = useState(0)
  
  function increment() {
    setCount(count + 1)
  }
  
  <div>
    <p>Count: {count}</p>
    <button onclick={increment}>Increment</button>
  </div>
}
```

### useEffect Hook

```mclang
element DataFetcher {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(async () => {
    const response = await fetch('/api/data')
    const result = await response.json()
    setData(result)
    setLoading(false)
  }, [])  // Run once on mount
  
  <div>
    {loading ? <p>Loading...</p> : <p>{data}</p>}
  </div>
}
```

## Advanced Features

### Classes

```mclang
class Animal {
  constructor(name) {
    this.name = name
  }
  
  speak() {
    return `${this.name} makes a sound`
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`
  }
}

const dog = new Dog("Buddy")
console.log(dog.speak())  // "Buddy barks"
```

### Async/Await

```mclang
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`)
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
  }
}
```

### Modules

```mclang
// math.mc
export function add(a, b) {
  return a + b
}

export const PI = 3.14159

// main.mc
import { add, PI } from "./math.mc"

const result = add(5, 10)
```

## API Reference

### Built-in Functions

#### console

- `console.log(...args)`
- `console.error(...args)`
- `console.warn(...args)`
- `console.info(...args)`

#### Array Methods

- `map(fn)` - Transform elements
- `filter(fn)` - Filter elements
- `reduce(fn, init)` - Reduce to single value
- `find(fn)` - Find first matching
- `some(fn)` - Check if any match
- `every(fn)` - Check if all match
- `includes(item)` - Check if contains
- `slice(start, end)` - Get sub-array
- `splice(start, count)` - Modify array

#### Object Methods

- `Object.keys(obj)` - Get keys
- `Object.values(obj)` - Get values
- `Object.entries(obj)` - Get key-value pairs
- `Object.assign(target, source)` - Merge objects

#### String Methods

- `charAt(index)` - Get character
- `slice(start, end)` - Get substring
- `toUpperCase()` - Convert to uppercase
- `toLowerCase()` - Convert to lowercase
- `split(separator)` - Split into array
- `trim()` - Remove whitespace
- `replace(search, replace)` - Replace first match

### React-like Hooks

- `useState(initial)` - State management
- `useEffect(fn, deps)` - Side effects
- `useContext(context)` - Context API
- `useReducer(reducer, initial)` - Complex state
- `useCallback(fn, deps)` - Memoize callback
- `useMemo(fn, deps)` - Memoize value

See [README.md](README.md) for more comprehensive examples and usage guides.
