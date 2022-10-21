import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface SpearksProps {
  name: string,
  isAdmin: boolean
}

interface StageProps {
  id: string,
  speakers: SpearksProps[]
}

function Stage(): JSX.Element {
  const { stage_id: stageId } = useParams();
  const [stage, setStage] = useState<StageProps>({
    id: '',
    speakers: []
  })

  useEffect(() => {
    fetch(`http://localhost:3001/stage/${stageId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(
        (result) => {
          setStage(result)
        }
      )
  }, [])

  return (
    <div>
      <h1>Stage {stage.id}</h1>
      <ul>
        {stage.speakers.map(speaker => 
          <li key={speaker.name}>{speaker.name}</li>
        )}
      </ul>
    </div>
  )
}

export default Stage
