# Getting Started with MCLANG

## Installation

### Via npm (Global)
```bash
npm install -g mclang
```

### From Source
```bash
git clone https://github.com/aditpoenok99/mclang.git
cd mclang
npm install
npm run build
npm link
```

## Your First MCLANG Program

### Step 1: Create a file `hello.mc`

```mclang
element HelloWorld {
  <div class="greeting">
    <h1>Hello, MCLANG!</h1>
    <p>Welcome to modern web development</p>
  </div>
  
  style {
    .greeting {
      padding: 2rem;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    h1 {
      font-size: 2.5rem;
      margin: 0;
    }
    
    p {
      font-size: 1.2rem;
      margin: 1rem 0 0 0;
    }
  }
}
```

### Step 2: Compile to JavaScript

```bash
mclang compile hello.mc --output hello.js
```

### Step 3: Use in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCLANG Example</title>
</head>
<body>
  <div id="app"></div>
  <script src="hello.js"></script>
</body>
</html>
```

## Next Steps

1. **Read the [SYNTAX.md](SYNTAX.md)** for language features
2. **Explore the [examples/](examples/)** directory
3. **Check out the [README.md](README.md)** for comprehensive documentation
4. **Join the community** and contribute!

## CLI Commands Quick Reference

```bash
# Compile a file
mclang compile app.mc

# Compile with output file
mclang compile app.mc --output dist/app.js

# Watch directory for changes
mclang watch src/

# Initialize new project
mclang init my-project

# Build entire project
mclang build

# Start dev server
mclang dev

# Format code
mclang format src/

# Lint code
mclang lint src/

# Run tests
mclang test
```

## Project Structure

For a new MCLANG project, organize your files like this:

```
my-mclang-app/
├── src/
│   ├── components/
│   │   ├── Header.mc
│   │   ├── Footer.mc
│   │   └── Button.mc
│   ├── pages/
│   │   ├── Home.mc
│   │   └── About.mc
│   ├── utils/
│   │   └── helpers.mc
│   └── App.mc
├── dist/
├── public/
│   └── index.html
├── mclang.config.js
├── package.json
└── README.md
```

## Configuration

Create `mclang.config.js` in your project root:

```javascript
module.exports = {
  entry: './src/App.mc',
  output: {
    dir: './dist',
    filename: '[name].js',
  },
  target: 'browser',
  mode: 'development', // or 'production'
  sourceMaps: true,
  minify: false,
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
};
```

## Troubleshooting

### Error: mclang not found

If you installed locally, run:
```bash
npm link
```

Or use npx:
```bash
npx mclang compile app.mc
```

### Compilation Errors

Make sure your file has the `.mc` extension and follows MCLANG syntax.

Run `mclang --version` to verify installation.

## Getting Help

- 📖 Read the documentation in [README.md](README.md)
- 🐛 Report issues on [GitHub Issues](https://github.com/aditpoenok99/mclang/issues)
- 💬 Start a discussion on [GitHub Discussions](https://github.com/aditpoenok99/mclang/discussions)

Happy coding! 🎉
