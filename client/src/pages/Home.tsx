import { Link } from 'react-router-dom'
import { SetStateAction, useState } from 'react'

interface StageProps {
  id: string,
  speakers: string[]
}

function Home(): JSX.Element {
  const [userName, setUserName] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [stage, setStage] = useState<StageProps | null>(null)

  const handleUserName = (event: { target: { value: SetStateAction<string> } }) => {
    setUserName(event.target.value);
  }

  const handleCreateStage = () => {
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, isAdmin: true }),
    }

    fetch('http://localhost:3001/stage', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setStage(result)
          setIsLoading(false)
        },
        (error) => {
          setError(error)
          setIsLoading(false)
        }
      )
  }

  return (
    <div>
      <h2>Step 1: Create user</h2>

      <input
        type="text"
        placeholder="Type your name"
        value={userName}
        onChange={handleUserName}
      />

      <button
        type="button"
        disabled={!userName || !!stage}
        onClick={handleCreateStage}
      >
        Create
      </button>

      <hr />

      <h2>Step 2: Create stage</h2>

      <p>{error ? 'Error' : ''}</p>

      <small>{isLoading ? 'Loading' : ''}</small>

      <Link
        className={!(userName && stage) ? 'disabled' : ''}
        style={{ pointerEvents: !(userName && stage) ? 'none' : 'auto' }}
        to={(userName && stage) ? `/${stage.id}` : '#'}
      >
        Create Stage
      </Link>
    </div>
  )
}

export default Home
