import React from 'react'
import {SvgIcon} from './SvgIcon'

export const AddIcon: SvgIcon = ({
  width = 20,
  height = 20,
  strokeColor = 'text-black',
  strokeWidth = 20,
  fillColor = 'none',
  classes = '',
}) => (
  <svg
    width={width}
    height={height}
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`stroke-current ${strokeColor} ${classes}`}
  >
    <title>Add</title>
    <path
        d="M256 112v288M400 256H112"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
  </svg>
)
