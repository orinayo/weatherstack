import OfflineIcon from 'components/icons/OfflineIcon'
import React, {FC} from 'react'
import {Detector} from 'react-detect-offline'

export const OfflineNotification: FC = () => {
  return (
    <Detector
      render={({online}) => {
        return (
          <div
            className={`fixed inset-x-0 top-0 z-40 flex items-end justify-end p-3 pointer-events-none ${
              online ? 'hidden' : 'block'
            }`}
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto transform ease-out duration-1000 transition opacity-100">
              <div className="rounded-lg shadow-xs overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <OfflineIcon
                        width={30}
                        height={30}
                        strokeWidth={15}
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-1">
                      <p className="text-sm leading-5 font-medium text-gray-900">
                        You are currently offline. Some functionality will be limited
                        until you&apos;re online.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}
