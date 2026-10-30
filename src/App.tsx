
import './App.css'

function App() {
  return (
    <div className="container">
      <h1>🦴 Dog Gallery</h1>
      <p>Discover different dog breeds!</p>

      <div className="dog-card">
        <h2>Random Dog Generator</h2>

        <div className="dog-image">
          <p>Dog image will appear here</p>
        </div>

        <p>Image URL will appear here</p>

        <button>Fetch Data Again</button>
      </div>
    </div>
  )
}

export default App
