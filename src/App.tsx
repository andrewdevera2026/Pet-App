
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchDogImage = async () => {
    setLoading(true)
    setError('')

    try {
      const url =
        selectedBreed === 'all'
          ? 'https://dog.ceo/api/breeds/image/random'
          : `https://dog.ceo/api/breed/${selectedBreed}/images/random`

      const response = await fetch(url)
      const data: DogApiResponse = await response.json()

      if (!response.ok || data.status !== 'success' || typeof data.message !== 'string') {
        throw new Error('Unable to fetch dog image.')
      }

      setDogImage(data.message)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
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
    } catch {
      console.error('Unable to fetch dog breeds.')
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <img src={dogImage} alt="Random dog" />
          )}
        </div>

        <button onClick={fetchDogImage} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data Again'}
        </button>
      </div>
    </div>
  )
}

export default App
