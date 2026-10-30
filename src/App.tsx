
import { useEffect, useState } from 'react'
import './App.css'

interface DogApiResponse {
  message: string
  status: string
}

function App() {
  const [dogImage, setDogImage] = useState('')

  const fetchDogImage = async () => {
    try {
      const response = await fetch(
        'https://dog.ceo/api/breeds/image/random'
      )

      const data: DogApiResponse = await response.json()

      setDogImage(data.message)
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }

  useEffect(() => {
    fetchDogImage()
  }, [])

  return (
    <div className="container">
      <h1>🐾 Pawfect Dogs</h1>
      <p>Discover different dog breeds!</p>

      <div className="dog-card">
        <h2>Random Dog Generator</h2>

        <div className="dog-image">
          {dogImage ? (
            <img src={dogImage} alt="Random dog" />
          ) : (
            <p>Dog image will appear here</p>
          )}
        </div>

        <button onClick={fetchDogImage}>Fetch Data Again</button>
      </div>
    </div>
  )
}

export default App
