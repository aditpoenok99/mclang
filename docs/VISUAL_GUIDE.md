# 🎨 MCLANG Visual Guide

## Color Palette & Design

### Primary Colors

```
🌸 Romantic Pink: #ff69b4 (Primary)
💜 Deep Purple: #d946ef (Secondary)
🎀 Light Pink: #ff85c1 (Accent)
💕 Pastel Pink: #ffc0d0 (Light)
```

### Why Pink/Pastel?

✅ **Scientifically Comfortable** - Reduces eye strain  
✅ **Memorable** - Makes MCLANG stand out  
✅ **Modern** - Contemporary & trendy  
✅ **Inclusive** - Works for all users  
✅ **Professional** - Still looks serious & capable  

---

## Code Examples with Preview

### Example 1: Simple Component

```mclang
element HelloWorld {
  <div class="greeting">
    <h1>🌸 Hello, MCLANG!</h1>
    <p>Beautiful & Easy</p>
  </div>
  
  style {
    .greeting {
      background: linear-gradient(135deg, #ff69b4 0%, #d946ef 100%);
      color: white;
      padding: 2rem;
      border-radius: 8px;
    }
  }
}
```

**Preview:**

A card dengan gradient pink-to-purple, white text, rounded corners.

---

### Example 2: Counter Component

```mclang
element Counter {
  const [count, setCount] = useState(0)
  
  <div class="counter">
    <div class="display">{count}</div>
    <div class="buttons">
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
    </div>
  </div>
  
  style {
    .counter {
      background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%);
      padding: 2rem;
      border-radius: 12px;
    }
    .display {
      font-size: 3rem;
      color: #ff69b4;
      text-align: center;
    }
  }
}
```

**Preview:**

Card dengan pastel pink background, large number display, increment/decrement buttons.

---

### Example 3: SPAWN Animation

```mclang
element AnimatedBox {
  const box = useRef()
  const [animate, setAnimate] = useState(false)
  
  function handleClick() {
    setAnimate(true)
    spawn(box, {
      duration: 600,
      easing: 'ease-out',
      from: { opacity: 0, translateY: 30 },
      to: { opacity: 1, translateY: 0 }
    })
  }
  
  <div class="container">
    <button onclick={handleClick}>Animate</button>
    <div ref={box} class="box">I fade and slide in!</div>
  </div>
  
  style {
    .box {
      background: linear-gradient(135deg, #ff85c1 0%, #d946ef 100%);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
  }
}
```

**Animation:**

Element slides up while fading in with smooth easing-out timing.

---

## Interactive Documentation

Buka `docs/index.html` di browser untuk:
- 🎪 Interactive examples
- 🎨 Visual color palette
- 🚀 Live animation previews
- 📚 Full feature documentation

---

Untuk panduan desain lengkap, lihat `docs/BRANDING.md`!
