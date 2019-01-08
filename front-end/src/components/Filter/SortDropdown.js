import React, { useState } from 'react'
import Up from 'typicons.font/src/svg/arrow-sorted-up.svg'
import Down from 'typicons.font/src/svg/arrow-sorted-down.svg'

const SortDropdown = ({ options, update, id }) => {
  const [open, toggle] = useState(false)
  return (
    <div
      onClick={() => toggle(!open)}
      className='sort-dropdown'
    >
      {
        open
          ? (
            <div>
              <div className='sort-header'>
                <Up />
              </div>
              <div className='sort-menu'>
                {options.map(({ value, label }) =>
                  <div
                    onClick={() => update(value)}
                    key={`${id}-${value}`}
                    className='sort-menu__option'
                  >{label}</div>
                )}
              </div>
            </div>
          )
          : (
            <div className='sort-header'>
              <Down />
            </div>
          )
      }

    </div>
  )
}

export default SortDropdown
