
import { useEffect, useState } from 'react'
import './App.css'

interface DogApiResponse {
  message: string | string[]
  status: string
}

function App() {
  const [dogImage, setDogImage] = useState('')
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState('all')

  const fetchDogImage = async () => {
    try {
      const url =
        selectedBreed === 'all'
          ? 'https://dog.ceo/api/breeds/image/random'
          : `https://dog.ceo/api/breed/${selectedBreed}/images/random`

      const response = await fetch(url)
      const data: DogApiResponse = await response.json()

      if (typeof data.message === 'string') {
        setDogImage(data.message)
      }
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }

  const fetchBreeds = async () => {
    try {
      const response = await fetch(
        'https://dog.ceo/api/breeds/list/all'
      )

      const data: DogApiResponse = await response.json()

      if (typeof data.message === 'object') {
        setBreeds(Object.keys(data.message))
      }
    } catch (error) {
      console.error('Error fetching breeds:', error)
    }
  }

  useEffect(() => {
    fetchBreeds()
  }, [])

  useEffect(() => {
    fetchDogImage()
  }, [selectedBreed])

  return (
    <div className="container">
      <h1>🐾 Pawfect Dogs</h1>
      <p>Discover different dog breeds!</p>

      <div className="dog-card">
        <h2>Random Dog Generator</h2>

        <label htmlFor="breed">Choose a dog breed:</label>

        <select
          id="breed"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="all">All Breeds</option>

          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </option>
          ))}
        </select>

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
