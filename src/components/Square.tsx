import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined"
import ClearIcon from "@mui/icons-material/Clear"

export type Player = "o" | "x"
export type Game = Player | null | undefined

const GridLayout = styled.div<{ numberOfSquare: number }>`
  display: grid;
  margin: auto;
  min-height: 70vh;
  width: 70vw;
  grid-template-rows: ${(props) =>
    `repeat(${props.numberOfSquare}, calc(100% / ${props.numberOfSquare}))`};

  .row {
    border-bottom: 2px solid white;
  }

  .row:nth-last-child(1) {
    border-bottom: 0;
  }
`

const StyledRow = styled.div<{ numberOfSquare: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.numberOfSquare}, calc(100% / ${props.numberOfSquare}))`};
  .column {
    border-right: 2px solid white;
  }

  .column:nth-last-child(1) {
    border-right: 0;
  }
`

const Box = styled.div<{ isCannotPress: boolean }>`
  position: relative;
  padding: 4px;
  background-color: ${(props) => props.isCannotPress && "#FA9B9B"};
  cursor: pointer;
`

interface Props {
  newGame: Game[][]
  player: Player
  numberOfSquare: number
  onClick: (game: Game[][]) => void
}

const Square = ({ newGame, player, numberOfSquare, onClick }: Props) => {
  const [tic, setTic] = useState<Game[][]>(newGame)

  useEffect(() => {
    setTic(newGame)
  }, [newGame])

  const handleClickBox = (row: number, column: number) => {
    let gameTemp = [...tic]
    gameTemp[row][column] = player
    setTic(gameTemp)
    onClick(gameTemp)
  }

  return (
    <GridLayout numberOfSquare={numberOfSquare}>
      {tic.map((row, rowIndex) => {
        return (
          <StyledRow numberOfSquare={numberOfSquare} className="row">
            {row.map((column, columnIndex) => {
              return (
                <Box
                  isCannotPress={column === null}
                  className="column"
                  key={`${rowIndex}${columnIndex}`}
                  onClick={() => {
                    if (!column && column !== null)
                      handleClickBox(rowIndex, columnIndex)
                  }}
                >
                  {column === "o" && (
                    <CircleOutlinedIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                  {column === "x" && (
                    <ClearIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </Box>
              )
            })}
          </StyledRow>
        )
      })}
    </GridLayout>
  )
}

export default Square
