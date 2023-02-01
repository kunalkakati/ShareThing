import { CircularProgress } from '@mui/material'
import React from 'react'

const design = {
  'position': 'absolute',
  'top': 0,
  'left': 0,
  'right': 0,
  'bottom': 0,
  'width': '100vw',
  'height': '100vh',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'background': 'rgba(225, 222, 223, 0.48)',
  'zIndex': 10
}

function Progress({state}) {
  return (
    <div style={state ? design : {'display': 'none'}}>
        <CircularProgress />
    </div>
  )
}

export default Progress