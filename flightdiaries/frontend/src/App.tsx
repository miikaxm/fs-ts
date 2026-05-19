import { useState, useEffect } from "react";
import type { Diary } from "./types";
import diaryService from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    diaryService.getAll().then(response => {
      setDiaries(response)
    })
  }, [])

  return (
    <div>
      {diaries.map(diary =>
        <p key={diary.id}>Date: {diary.date} <br /> Weather: {diary.weather} <br /> Visibility: {diary.visibility} <br /> Comment: {diary.comment}</p>
      )}
    </div>
  )
}

export default App