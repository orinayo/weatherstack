import React from 'react'
import {SvgIcon} from './SvgIcon'

export const RemoveIcon: SvgIcon = ({
  width = 20,
  height = 20,
  strokeColor = 'text-white',
  strokeWidth = 20,
  fillColor = 'red',
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
    <title>Close</title>
    <path
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M320 320L192 192M192 320l128-128"
    />
  </svg>
)
