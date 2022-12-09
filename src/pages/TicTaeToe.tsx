import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Square, { Game, Player } from "../components/Square"
import { conditionGame, countScore, createGame } from "../utils/conditionGame"
import EndGameModal from "../components/EndGameModal"
import { useNavigate } from "react-router"

const Container = styled.div`
  margin: 32px 64px 16px 64px;
`

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
`

const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 32px;
`

const PlayerTypo = styled.span`
  font: 50px "Raleway", sans-serif;
  font-weight: 400;
`

const ScoreTypo = styled.span`
  font-size: 50px;
`

interface Props {
  sizeGame: number
}

const TicTaeToe = ({ sizeGame }: Props) => {
  const [player, setPlayer] = useState<Player>("o")
  const [score, setScore] = useState(0)
  const [newGame, setNewGame] = useState<Game[][]>([[]])
  const [isOpenEndGameModal, setIsOpenEndGameModal] = useState(false)
  const [winner, setWinner] = useState<Player | undefined>(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    const arraySquare = createGame(sizeGame)

    setNewGame(arraySquare)
  }, [sizeGame])

  const togglePlayer = () => {
    if (player === "o") setPlayer("x")
    else setPlayer("o")
  }

  const checkGame = (game: Game[][]) => {
    togglePlayer()
    const checkWinOrDraw = conditionGame(game)
    if (checkWinOrDraw === "Draw") {
      setWinner(undefined)
      setIsOpenEndGameModal(true)
      return
    }
    if (checkWinOrDraw === undefined) return
    const checkScore = countScore(game)
    setScore(checkScore)
    setWinner(checkWinOrDraw)
    setIsOpenEndGameModal(true)
  }

  return (
    <div>
      <Container>
        <Square
          newGame={newGame}
          player={player}
          numberOfSquare={sizeGame <= 3 ? 3 : sizeGame}
          onClick={checkGame}
        />
      </Container>
      <ScoreContainer>
        <Score>
          <PlayerTypo>Player</PlayerTypo>
          <ScoreTypo>{player}</ScoreTypo>
        </Score>
      </ScoreContainer>
      <EndGameModal
        player={winner}
        isOpen={isOpenEndGameModal}
        score={score}
        onContinue={() => {
          navigate("/")
        }}
      />
    </div>
  )
}

export default TicTaeToe
