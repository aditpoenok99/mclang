// MCLANG Configuration File

module.exports = {
  // Entry point - the main MCLANG file
  entry: './src/App.mc',

  // Output configuration
  output: {
    dir: './dist',           // Output directory
    filename: '[name].js',   // Output file naming pattern
    hashFunction: 'xxhash64',
  },

  // Target environment
  target: 'browser',  // or 'node', 'electron'

  // Build mode
  mode: 'development',  // or 'production'

  // Source maps for debugging
  sourceMaps: true,

  // Minification
  minify: false,

  // Module resolution
  resolve: {
    // Path aliases
    alias: {
      '@components': './src/components',
      '@pages': './src/pages',
      '@utils': './src/utils',
      '@styles': './src/styles',
    },
    // Extensions to look for
    extensions: ['.mc', '.js', '.json'],
  },

  // Plugins to use
  plugins: [
    // Example plugin configuration
    // new MyPlugin({ option: 'value' })
  ],

  // Development server configuration
  devServer: {
    port: 3000,
    host: 'localhost',
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },

  // Babel/transpiler options
  babel: {
    presets: [
      ['@babel/preset-env', {
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      }],
    ],
  },

  // CSS/Styling options
  css: {
    scoped: true,          // Automatically scope component styles
    modules: false,        // Use CSS modules
    preprocessor: 'sass',  // or 'less', 'stylus'
    sourceMap: true,
  },

  // Performance optimization
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
    },
  },

  // Define global variables
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production',
    __VERSION__: '1.0.0',
  },

  // Ignore patterns
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.git/',
    '.env',
  ],

  // Logging
  logging: {
    level: 'info',  // 'error', 'warn', 'info', 'debug'
    colors: true,
  },
};
