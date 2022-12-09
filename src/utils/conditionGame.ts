import { Game } from "../components/Square"

const checkHorizontal = (game: Game[][]): Game => {
  const gameLength = game.length
  for (let row = 0; row < gameLength; row++) {
    let prePlayer: Game = undefined
    for (let column = 0; column < gameLength; column++) {
      if (game[row][column] === undefined) {
        break
      }
      if (prePlayer !== game[row][column] && prePlayer !== undefined) {
        break
      }
      prePlayer = game[row][column]
      if (column === gameLength - 1) {
        return prePlayer
      }
    }
  }
  return undefined
}

const checkVertical = (game: Game[][]): Game => {
  const gameLength = game.length
  for (let column = 0; column < gameLength; column++) {
    let prePlayer: Game = undefined
    for (let row = 0; row < gameLength; row++) {
      if (game[row][column] === undefined) {
        break
      }
      if (prePlayer !== game[row][column] && prePlayer !== undefined) {
        break
      }
      prePlayer = game[row][column]
      if (row === gameLength - 1) {
        return prePlayer
      }
    }
  }
}

const checkDiagonal = (game: Game[][]): Game => {
  const gameLength = game.length
  let prePlayer: Game = undefined
  for (let i = 0; i < gameLength; i++) {
    if (game[i][i] === undefined) break
    if (prePlayer !== game[i][i] && prePlayer !== undefined) break
    prePlayer = game[i][i]
    if (i === gameLength - 1) {
      return prePlayer
    }
  }

  prePlayer = undefined
  let row = 0
  let column = gameLength - 1
  while (row < gameLength) {
    if (game[row][column] === undefined) break
    if (prePlayer !== game[row][column] && prePlayer !== undefined) break
    prePlayer = game[row][column]
    row++
    column--
  }
  if (row === gameLength) return prePlayer
  return undefined
}

const checkDraw = (game: Game[][]): boolean => {
  const gameLength = game.length
  for (let i = 0; i < gameLength; i++) {
    for (let j = 0; j < gameLength; j++) {
      if (game[i][j] === undefined) return false
    }
  }
  return true
}

export const conditionGame = (game: Game[][]) => {
  const horizontal = checkHorizontal(game)
  const vertical = checkVertical(game)
  const diagonal = checkDiagonal(game)
  const isDraw = checkDraw(game)
  if (horizontal) return horizontal
  if (vertical) return vertical
  if (diagonal) return diagonal
  if (isDraw) return "Draw"
}

export const countScore = (game: Game[][]): number => {
  let score = 0
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      if (game[i][j] === undefined) score++
    }
  }
  return score
}

export const createGame = (numberOfSquare: number) => {
  let tempNumberSquare = numberOfSquare
  if (numberOfSquare <= 3) {
    tempNumberSquare = 3
  }
  let arraySquare: (undefined | null)[][] = Array.from(
    Array(tempNumberSquare),
    () => Array(tempNumberSquare).fill(undefined)
  )
  const rowIndexForClosedBox = Math.floor(Math.random() * tempNumberSquare)
  const columnIndexForClosedBox = Math.floor(Math.random() * tempNumberSquare)
  arraySquare[rowIndexForClosedBox][columnIndexForClosedBox] = null

  return arraySquare
}
