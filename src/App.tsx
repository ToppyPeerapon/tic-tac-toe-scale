import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import TicTaeToe from "./pages/TicTaeToe"

function App() {
  const [size, setSize] = useState(4)

  const handleChangeSizeGame = (sizeGame: number | undefined) => {
    if (sizeGame) setSize(sizeGame)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home onSubmit={handleChangeSizeGame} />} />
        <Route path="game" element={<TicTaeToe sizeGame={size} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
