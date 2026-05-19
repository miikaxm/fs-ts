import { useState, useEffect } from "react";
import type { Diary, NewDiary } from "./types";
import diaryService from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiary: NewDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
  
    diaryService.create(newDiary).then(r => {
      setDiaries(diaries.concat(r))
    })

    setNewComment('')
    setNewVisibility('')
    setNewWeather('')
    setNewDate('')
  }
  
  useEffect(() => {
    diaryService.getAll().then(response => {
      setDiaries(response)
    })
  }, [])

  return (
    <div>
      <h1>Add new diary</h1>
      <form onSubmit={diaryCreation}>
        {/* Date select */}
        <label htmlFor="date">Date:</label><br />
        <input type="text" id="date" name="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br />

        {/* Weather input */}
        <label htmlFor="weather">Weather:</label><br />
        <input type="text" id="weather" name="weather" value={newWeather} onChange={(event) => setNewWeather(event.target.value)} /><br />

        {/* Visiblity input */}
        <label htmlFor="visibility">Visibility:</label><br />
        <input type="text" id="visibility" name="visibility" value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}/><br />

        {/* Comment field */}
        <label htmlFor="comment">Comment:</label><br />
        <textarea name="comment" id="comment" rows={4} cols={40} value={newComment} onChange={(event) => setNewComment(event.target.value)}></textarea><br />

        {/* Input button */}
        <input type="submit" />
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