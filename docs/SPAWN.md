# SPAWN Animation - Unique Feature

## What is SPAWN?

**SPAWN** adalah fitur unik MCLANG yang membuat animasi kompleks menjadi sangat mudah dengan sintaks yang sederhana. Berbeda dengan bahasa pemrograman lain, MCLANG menyediakan sistem animasi yang powerful namun intuitif.

### Keunggulan SPAWN

✨ **Smooth & Performant** - Menggunakan requestAnimationFrame
⚡ **Easy Syntax** - Deklaratif dan mudah dipahami  
🎯 **Staggered Animations** - Otomatis handle delay antar elemen
🔄 **Easing Functions** - Built-in easing presets
🎨 **Composable** - Combine animations dengan mudah

---

## Basic Usage

### Simple Fade In

```mclang
element FadeInBox {
  const box = useRef()
  
  useEffect(() => {
    spawn(box, {
      duration: 600,
      easing: 'ease-out',
      from: { opacity: 0 },
      to: { opacity: 1 }
    })
  }, [])
  
  <div ref={box} class="box">
    Fading in...
  </div>
  
  style {
    .box {
      padding: 2rem;
      background: linear-gradient(135deg, #ffd1dc 0%, #ff69b4 100%);
    }
  }
}
```

---

## Preset Animations

SPAWN menyediakan preset animasi yang sudah siap pakai:

### fadeIn

```mclang
element FadeInDemo {
  const item = useRef()
  
  useEffect(() => {
    spawn(item, SpawnPresets.fadeIn(600))
  }, [])
  
  <div ref={item}>Item fades in</div>
}
```

### slideInLeft / slideInRight / slideInUp / slideInDown

```mclang
element SlideInDemo {
  const item = useRef()
  
  useEffect(() => {
    spawn(item, SpawnPresets.slideInLeft(600))
  }, [])
  
  <div ref={item}>Slides in from left</div>
}
```

### scaleIn

```mclang
element ScaleInDemo {
  const item = useRef()
  
  useEffect(() => {
    spawn(item, SpawnPresets.scaleIn(600))
  }, [])
  
  <div ref={item}>Scales up smoothly</div>
}
```

### bounceIn

```mclang
element BounceInDemo {
  const item = useRef()
  
  useEffect(() => {
    spawn(item, SpawnPresets.bounceIn(800))
  }, [])
  
  <div ref={item}>Bounces in with spring easing</div>
}
```

### rotateIn

```mclang
element RotateInDemo {
  const item = useRef()
  
  useEffect(() => {
    spawn(item, SpawnPresets.rotateIn(600))
  }, [])
  
  <div ref={item}>Rotates in</div>
}
```

---

## Advanced: Staggered Animations

### Animasi List dengan Stagger

```mclang
element StaggeredList {
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  const containerRef = useRef()
  
  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.item')
    if (elements) {
      spawnStagger(Array.from(elements), {
        duration: 500,
        easing: 'ease-out',
        stagger: 100,  // 100ms delay between items
        from: { opacity: 0, translateY: 20 },
        to: { opacity: 1, translateY: 0 }
      })
    }
  }, [items])
  
  <div ref={containerRef} class="list">
    {items.map(item => (
      <div key={item} class="item">
        Item {item}
      </div>
    ))}
  </div>
  
  style {
    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .item {
      padding: 1rem;
      background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%);
      border-radius: 8px;
      color: #d946ef;
    }
  }
}
```

---

## Custom Configuration

### Full Configuration Options

```mclang
const config = {
  // Animation duration in milliseconds
  duration: 600,
  
  // Initial delay before animation starts
  delay: 0,
  
  // Delay between items (for stagger)
  stagger: 0,
  
  // Easing function
  // Options: 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'spring'
  easing: 'ease-out',
  
  // Starting state
  from: {
    opacity: 0,
    translateX: -50,
    scale: 0.8
  },
  
  // Ending state
  to: {
    opacity: 1,
    translateX: 0,
    scale: 1
  },
  
  // Repeat animation
  repeat: false,
  repeatCount: Infinity,
  reverseOnRepeat: false,
  
  // Callbacks
  onStart: () => console.log('Animation started'),
  onComplete: () => console.log('Animation complete')
}
```

---

## Easing Types

| Easing | Description | Best For |
|--------|-------------|----------|
| `ease-in` | Slow start, fast end | Dismissals |
| `ease-out` | Fast start, slow end | Entrances |
| `ease-in-out` | Slow start & end | Smooth transitions |
| `linear` | Constant speed | Loading bars |
| `spring` | Bouncy effect | Playful animations |

---

## Complex Example: Card Reveal

```mclang
element CardReveal {
  const cardRef = useRef()
  const [isRevealed, setIsRevealed] = useState(false)
  
  function handleClick() {
    setIsRevealed(!isRevealed)
    const config = isRevealed 
      ? SpawnPresets.slideInUp(400)
      : SpawnPresets.slideInDown(400)
    
    spawn(cardRef.current, config)
  }
  
  <div class="container">
    <button onclick={handleClick}>
      {isRevealed ? 'Hide' : 'Reveal'} Card
    </button>
    
    <div ref={cardRef} class="card">
      <div class="card-content">
        <h2>Beautiful Card</h2>
        <p>This card animates smoothly</p>
      </div>
    </div>
  </div>
  
  style {
    .container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.2s;
    }
    
    button:hover {
      transform: scale(1.05);
    }
    
    .card {
      width: 100%;
      max-width: 400px;
      background: linear-gradient(135deg, #ffe4e9 0%, #fff5f7 100%);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(255, 105, 180, 0.2);
    }
    
    .card-content {
      text-align: center;
      color: #d946ef;
    }
    
    h2 {
      margin: 0 0 0.5rem 0;
    }
    
    p {
      margin: 0;
      opacity: 0.8;
    }
  }
}
```

---

## Performance Tips

✅ **Use requestAnimationFrame** - SPAWN automatically optimized
✅ **Combine with will-change** - For GPU acceleration
✅ **Use opacity & transform** - Fastest properties to animate
❌ **Avoid animating** - width, height, left, right (slower)

---

## API Reference

### spawn(element, config)
Animate a single element

### spawnStagger(elements, config)
Animate multiple elements with stagger

### SpawnPresets
Pre-configured animations

### SpawnAnimation Class
Manual control with start(), stop(), reset()

---

Untuk contoh lengkap, lihat `examples/SpawnAnimation.mc`
