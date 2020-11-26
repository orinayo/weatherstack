import React from 'react'
import {SvgIcon} from './SvgIcon'

export const ListIcon: SvgIcon = ({
  width = 16,
  height = 16,
  strokeColor = 'currentColr',
  strokeWidth = 20,
  fillColor = 'none',
  classes = 'inline-block align-text-bottom mr-1',
}) => (
  <svg
    width={width}
    height={height}
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`stroke-current ${strokeColor} ${classes}`}
  >
    <title>List</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M160 144h288M160 256h288M160 368h288"
    />
    <circle
      cx="80"
      cy="144"
      r="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="80"
      cy="256"
      r="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="80"
      cy="368"
      r="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
)
