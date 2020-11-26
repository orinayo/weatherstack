import {OfflineIcon} from 'components/icons/OfflineIcon'
import React, {FC} from 'react'
import classnames from 'classnames'
import {Detector} from 'react-detect-offline'
import styles from './OfflineNotification.module.css'

export const OfflineNotification: FC = () => {
  return (
    <Detector
      render={({online}) => {
        return (
          <div
            className={classnames(`${styles.row}`, {
              hidden: online,
              flex: !online,
            })}
          >
            <div className={styles.column}>
              <div className={styles.item}>
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <OfflineIcon width={30} height={30} strokeWidth={15} />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-1">
                      <p
                        role="alert"
                        className="text-sm leading-snug font-medium text-gray-600"
                      >
                        You are currently offline. Some functionality will be
                        limited until you&apos;re online.
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
