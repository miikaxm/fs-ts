import { useState, useEffect } from "react";
import type { Diary, NewDiary } from "./types";
import diaryService from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  // Error message
  const [error, setError] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (newComment === '') {
      setNewComment('No comments given')
    }

    const newDiary: NewDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
  
    diaryService
      .create(newDiary)
      .then(r => {
        setDiaries(diaries.concat(r))
        setError('')

        setNewComment('')
        setNewVisibility('')
        setNewWeather('')
        setNewDate('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        const field = error.response.data.error[0].path[0]
        let userInput = ''

        if (field === 'weather') userInput = newWeather
        if (field === 'visibility') userInput = newVisibility
        if (field === 'date') userInput = newDate

        setError(`Incorrect ${field}: ${userInput}`)
      })
  }
  
  useEffect(() => {
    diaryService.getAll().then(response => {
      setDiaries(response)
    })
  }, [])

  return (
    <div>
      <h1>Add new diary</h1>
      <p id="error" style={{ color: 'red' }}>{error}</p>
      <form onSubmit={diaryCreation}>

        {/* Date select */}
        <label htmlFor="date"><b>Date:</b></label><br />
        <input type="date" id="date" name="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br />

        {/* Weather input */}
        <h4>Weather:</h4>
        <label htmlFor="sunny">Sunny:</label>
        <input type="radio" id="sunny" name="weather" value={'sunny'} onChange={(event) => setNewWeather(event.target.value)} /><br />
        
        <label htmlFor="rainy">Rainy: </label>
        <input type="radio" id="rainy" name="weather" value={'rainy'} onChange={(event) => setNewWeather(event.target.value)} /><br />

        <label htmlFor="cloudy">Cloudy:</label>
        <input type="radio" id="cloudy" name="weather" value={'cloudy'} onChange={(event) => setNewWeather(event.target.value)} /><br />

        <label htmlFor="stormy">Stormy</label>
        <input type="radio" id="stormy" name="weather" value={'stormy'} onChange={(event) => setNewWeather(event.target.value)} /><br />

        <label htmlFor="windy">Windy:</label>
        <input type="radio" id="windy" name="weather" value={'windy'} onChange={(event) => setNewWeather(event.target.value)} /><br /><br />

        {/* Visiblity input */}
        <h4>Visiblity:</h4>

        <label htmlFor="great">Great:</label>
        <input type="radio" id="great" name="visibility" value={'great'} onChange={(event) => setNewVisibility(event.target.value)}/><br />

        <label htmlFor="good">Good:</label>
        <input type="radio" id="good" name="visibility" value={'good'} onChange={(event) => setNewVisibility(event.target.value)}/><br />

        <label htmlFor="ok">Ok:</label>
        <input type="radio" id="ok" name="visibility" value={'ok'} onChange={(event) => setNewVisibility(event.target.value)}/><br />

        <label htmlFor="poor">Poor:</label>
        <input type="radio" id="poor" name="visibility" value={'poor'} onChange={(event) => setNewVisibility(event.target.value)}/><br /><br />

        {/* Comment field */}
        <label htmlFor="comment"><b>Comment:</b></label><br />
        <textarea name="comment" id="comment" rows={4} cols={40} value={newComment} onChange={(event) => setNewComment(event.target.value)}></textarea><br />

        {/* Submit button */}
        <input type="submit"/>
      </form>
      <div>
        <h1>Recent Diaries</h1>
        {diaries.map(diary =>
          <p key={diary.id}>Date: {diary.date} <br /> Weather: {diary.weather} <br /> Visibility: {diary.visibility} <br /> Comment: {diary.comment}</p>
        )}
      </div>
    </div>
  )
}

export default App