import React from 'react'
import { SvgIcon } from './SvgIcon';

const OfflineIcon: SvgIcon = ({
  width = 20,
  height = 20,
  strokeColor = '#ffc200',
  strokeWidth = 1.2,
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
    <path
      d="M93.72 183.25C49.49 198.05 16 233.1 16 288c0 66 54 112 120 112h184.37M467.82 377.74C485.24 363.3 496 341.61 496 312c0-59.82-53-85.76-96-88-8.89-89.54-71-144-144-144-26.16 0-48.79 6.93-67.6 18.14"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M448 448L64 64"
    />
  </svg>
)

export default OfflineIcon