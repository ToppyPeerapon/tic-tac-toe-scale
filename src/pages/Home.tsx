import {
  Box,
  Button,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router"

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const H1 = styled(Typography)`
  text-align: center;
  margin-bottom: 32px;
`

const StyledButton = styled(Button)({
  color: "black",
  backgroundColor: "white",
  margin: "32px",
  border: "1px white solid",

  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
})

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      color: "white",
    },
  },

  "& .MuiFormHelperText-root": {
    color: "white",
  },
})

interface Props {
  onSubmit: (size: number | undefined) => void
}

const Home = ({ onSubmit }: Props) => {
  const [size, setSize] = useState<number | undefined>(undefined)
  const [isOpenToolTip, setIsOpenToolTip] = useState(false)

  const navigate = useNavigate()

  return (
    <Container>
      <H1 variant="h1">Tic Tae Toe</H1>
      <InputContainer>
        <Typography variant="body1">Custom your size of game : </Typography>
        <Tooltip
          arrow
          placement="right"
          open={isOpenToolTip}
          title="It less than 3. Press enter 3 or more than 3"
        >
          <StyledTextField
            value={size}
            variant="outlined"
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              const stringSize = e.target.value
              const numberSize = Number(stringSize)
              if (isNaN(numberSize)) return
              if (numberSize < 3) setIsOpenToolTip(true)
              else setIsOpenToolTip(false)
              setSize(numberSize)
            }}
          />
        </Tooltip>
      </InputContainer>
      <StyledButton
        onClick={() => {
          if (!size || size < 3) return
          onSubmit(size)
          navigate("/game")
        }}
        variant="contained"
      >
        Play
      </StyledButton>
    </Container>
  )
}

export default Home
