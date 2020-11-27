import {FC} from 'react'

import React from 'react'

export const ToastMsg: FC<{undoDelete: () => void; message: string}> = ({
  undoDelete,
  message,
}) => (
  <div className="text-sm flex items-center justify-around">
    <p>{message}</p>
    <button className="align-center btn" onClick={undoDelete}>
      Undo
    </button>
  </div>
)
