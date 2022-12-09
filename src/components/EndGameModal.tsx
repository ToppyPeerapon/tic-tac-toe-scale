import { Button, Modal } from "@mui/material"
import React from "react"
import styled from "styled-components"
import { Player } from "./Square"

const StyledModal = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  position: absolute;
  width: 400px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
`

const Header = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding: 8px 0;
`

interface Props {
  isOpen: boolean
  player: Player | undefined
  score: number
  onContinue: () => void
}

const EndGameModal = ({ isOpen, player, score, onContinue }: Props) => {
  const checkWinOrDraw = () => {
    if (!player) return "Draw"
    return `Player ${player} win with score ${score}`
  }

  return (
    <Modal open={isOpen}>
      <StyledModal>
        <Header>{checkWinOrDraw()}</Header>
        <ButtonContainer>
          <Button variant="contained" color="error" onClick={onContinue}>
            Continue
          </Button>
        </ButtonContainer>
      </StyledModal>
    </Modal>
  )
}

export default EndGameModal
