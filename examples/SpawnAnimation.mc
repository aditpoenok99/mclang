# 🎨 SPAWN Animation Examples

## Complete Example: Animated Gallery

```mclang
import { SpawnPresets, spawnStagger } from './spawn.mc'

element AnimatedGallery {
  const [images, setImages] = useState([
    { id: 1, title: 'Mountain', src: '/img1.jpg' },
    { id: 2, title: 'Ocean', src: '/img2.jpg' },
    { id: 3, title: 'Forest', src: '/img3.jpg' },
    { id: 4, title: 'Sky', src: '/img4.jpg' }
  ])
  const galleryRef = useRef()
  
  useEffect(() => {
    const items = galleryRef.current?.querySelectorAll('.gallery-item')
    if (items) {
      spawnStagger(Array.from(items), {
        duration: 600,
        easing: 'ease-out',
        stagger: 150,
        from: {
          opacity: 0,
          scale: 0.8,
          rotate: -10
        },
        to: {
          opacity: 1,
          scale: 1,
          rotate: 0
        }
      })
    }
  }, [images])
  
  <div class="gallery-container">
    <h1>🎨 Beautiful Gallery</h1>
    <div ref={galleryRef} class="gallery">
      {images.map(img => (
        <div key={img.id} class="gallery-item">
          <img src={img.src} alt={img.title} />
          <h3>{img.title}</h3>
        </div>
      ))}
    </div>
  </div>
  
  style {
    .gallery-container {
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #fff5f7 0%, #fffafc 100%);
      min-height: 100vh;
    }
    
    h1 {
      color: #ff69b4;
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .gallery-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(255, 105, 180, 0.15);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .gallery-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(255, 105, 180, 0.25);
    }
    
    .gallery-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .gallery-item h3 {
      padding: 1rem;
      color: #d946ef;
      margin: 0;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }
      
      .gallery {
        grid-template-columns: 1fr;
      }
    }
  }
}
```

---

## Interactive Button with SPAWN

```mclang
element AnimatedButton {
  const [isLoading, setIsLoading] = useState(false)
  const buttonRef = useRef()
  const loaderRef = useRef()
  
  async function handleClick() {
    setIsLoading(true)
    
    // Animate button
    spawn(buttonRef.current, {
      duration: 300,
      from: { scale: 1 },
      to: { scale: 0.95 }
    })
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Animate loader
    spawn(loaderRef.current, SpawnPresets.fadeIn(400))
    
    setIsLoading(false)
  }
  
  <div class="button-demo">
    <button 
      ref={buttonRef}
      class="submit-btn"
      onclick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? '⏳ Processing...' : '✨ Click Me'}
    </button>
    
    {isLoading && (
      <div ref={loaderRef} class="success-message">
        ✅ Done!
      </div>
    )}
  </div>
  
  style {
    .button-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem;
      background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%);
      border-radius: 12px;
    }
    
    .submit-btn {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #ff69b4 0%, #d946ef 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 105, 180, 0.3);
    }
    
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .success-message {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #ff85c1 0%, #d946ef 100%);
      color: white;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
    }
  }
}
```

---

## Card Flip with SPAWN

```mclang
element FlipCard {
  const [isFlipped, setIsFlipped] = useState(false)
  const frontRef = useRef()
  const backRef = useRef()
  
  function handleFlip() {
    setIsFlipped(!isFlipped)
    
    if (isFlipped) {
      spawn(backRef.current, SpawnPresets.rotateIn(600))
      spawn(frontRef.current, { duration: 0, from: { opacity: 0 }, to: { opacity: 0 } })
    } else {
      spawn(frontRef.current, SpawnPresets.rotateIn(600))
      spawn(backRef.current, { duration: 0, from: { opacity: 0 }, to: { opacity: 0 } })
    }
  }
  
  <div class="card-container" onclick={handleFlip}>
    {!isFlipped ? (
      <div ref={frontRef} class="card card-front">
        <h2>🎀 MCLANG</h2>
        <p>Modern Programming Language</p>
        <button>Click to flip →</button>
      </div>
    ) : (
      <div ref={backRef} class="card card-back">
        <h2>✨ Features</h2>
        <ul>
          <li>SPAWN Animations</li>
          <li>Component-Based</li>
          <li>Scoped Styling</li>
          <li>React-like Hooks</li>
        </ul>
      </div>
    )}
  </div>
  
  style {
    .card-container {
      perspective: 1000px;
      width: 100%;
      max-width: 400px;
      height: 300px;
      cursor: pointer;
    }
    
    .card {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: 0 8px 30px rgba(255, 105, 180, 0.2);
      transition: all 0.3s ease;
    }
    
    .card-front {
      background: linear-gradient(135deg, #ff85c1 0%, #d946ef 100%);
      color: white;
    }
    
    .card-back {
      background: linear-gradient(135deg, #ffc0d0 0%, #ff85c1 100%);
      color: white;
    }
    
    .card h2 {
      margin: 0 0 1rem;
      font-size: 2rem;
    }
    
    .card button {
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    
    .card button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    .card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .card li {
      padding: 0.5rem;
      font-size: 1.1rem;
    }
    
    @media (max-width: 600px) {
      .card-container {
        height: 250px;
      }
      
      .card h2 {
        font-size: 1.5rem;
      }
    }
  }
}
```

---

## Hero Section with Multiple Animations

```mclang
element HeroSection {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const buttonsRef = useRef()
  
  useEffect(() => {
    // Animate title
    spawn(titleRef.current, {
      duration: 800,
      delay: 200,
      easing: 'ease-out',
      from: { translateY: 30, opacity: 0 },
      to: { translateY: 0, opacity: 1 }
    })
    
    // Animate subtitle
    spawn(subtitleRef.current, {
      duration: 800,
      delay: 400,
      easing: 'ease-out',
      from: { translateY: 30, opacity: 0 },
      to: { translateY: 0, opacity: 1 }
    })
    
    // Animate buttons
    spawn(buttonsRef.current, {
      duration: 800,
      delay: 600,
      easing: 'ease-out',
      from: { translateY: 30, opacity: 0 },
      to: { translateY: 0, opacity: 1 }
    })
  }, [])
  
  <section class="hero">
    <div class="hero-content">
      <h1 ref={titleRef} class="title">🌸 Welcome to MCLANG</h1>
      <p ref={subtitleRef} class="subtitle">
        Modern Programming Language untuk Web Frontend Development
      </p>
      <div ref={buttonsRef} class="buttons">
        <button class="btn-primary">Get Started</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
  </section>
  
  style {
    .hero {
      background: linear-gradient(135deg, #ff69b4 0%, #d946ef 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 2rem;
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .title {
      font-size: 3rem;
      margin: 0 0 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .subtitle {
      font-size: 1.3rem;
      margin: 0 0 2rem;
      opacity: 0.9;
    }
    
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn-primary, .btn-secondary {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: white;
      color: #d946ef;
    }
    
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
      .title {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1rem;
      }
      
      .buttons {
        flex-direction: column;
      }
    }
  }
}
```

---

Untuk contoh lengkap lainnya, kunjungi:
- `examples/CounterApp.mc`
- `examples/TodoApp.mc`
- `docs/SPAWN.md`
