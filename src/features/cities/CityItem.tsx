import {RemoveIcon} from 'components/icons/RemoveIcon'
import {HeartIcon} from 'components/icons/HeartIcon'
import React, {FC} from 'react'
import styles from './CityItem.module.css'

type Props = {
  weatherDesc: string
  cityName: string
  onDelete: () => void
  addFavorite: () => void
  removeFavorite: () => void
  isFavorite: boolean
}

const weatherDescColors = {
  sunny: 'bg-yellow-100 text-black',
  sleet: 'bg-blue-500 text-white',
  rain: 'bg-blue-400 text-white',
  drizzle: 'bg-blue-300 text-white',
  mist: 'bg-blue-200 text-black',
  clear: 'bg-white text-black',
  thunder: 'bg-gray-600 text-white',
  fog: 'bg-gray-500 text-white',
  overcast: 'bg-gray-400 text-white',
  cloudy: 'bg-gray-300 text-white',
  snow: 'bg-gray-200 text-black',
  blizzard: 'bg-gray-100 text-black',
}

export const CityItem: FC<Props> = ({
  weatherDesc,
  cityName,
  onDelete,
  isFavorite,
  addFavorite,
  removeFavorite,
}) => {
  const getWeatherDesc = (() => {
    const weatherDescriptions = Object.keys(weatherDescColors)
    for (let i = 0; i < weatherDescriptions.length; i++) {
      if (weatherDescriptions[i].includes(weatherDesc.toLowerCase()))
        return weatherDescriptions[i]
    }
    return 'clear'
  })()
  return (
    <li className={styles.container}>
      <div className={styles.contentRow}>
        <div className="flex-1 truncate mr-3">
          <div className={styles.textColumn}>
            <h3 className="text-gray-600 text-sm leading-snug font-medium flex-shrink-0">
              {cityName}
            </h3>
            <span
              className={`${styles.weatherDesc} truncate ${weatherDescColors[getWeatherDesc]}`}
            >
              Clear
            </span>
          </div>
          <p className="mt-1 text-gray-500 text-sm leading-snug truncate">
            Country
          </p>
        </div>
        <div className="flex">
          <h3 className="text-gray-600 text-3xl mr-2 leading-snug font-medium truncate">
            14&#8451;
          </h3>
          <img
            className={styles.image}
            src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.actionBtns}>
        <div className="-mt-px flex">
          <div className={styles.favorite}>
            <button
              type="button"
              onClick={isFavorite ? removeFavorite : addFavorite}
              className={styles.button}
            >
              <HeartIcon
                strokeColor={isFavorite ? 'text-white' : 'text-red'}
                fillColor={isFavorite ? '#f02849' : 'white'}
              />
              <span className="ml-3">{isFavorite ? 'Unlike' : 'Like'}</span>
            </button>
          </div>
          <div className={styles.remove}>
            <button type="button" onClick={onDelete} className={styles.button}>
              <RemoveIcon />
              <span className="ml-3">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

//   <li>
//       <div class="border-t border-gray-200">
//         <div class="-mt-px flex">
//           <div class="w-0 flex-1 flex border-r border-gray-200">
//             <a href="#" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
//               <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
//                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
//               </svg>
//               <span class="ml-3">Email</span>
//             </a>
//           </div>
//           <div class="-ml-px w-0 flex-1 flex">
//             <a href="#" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
//               <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
//               </svg>
//               <span class="ml-3">Call</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </li>
