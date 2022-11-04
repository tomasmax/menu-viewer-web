import React, { useState, useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import MenuContext from '../../context/context'

function RadioList({ options = [], index }) {
  const context = useContext(MenuContext)
  const { addItemPrice, removeItemPrice, menuPrice } = context
  const previousPrice = useRef(0)

  const [selectedId, setSelectedId] = useState()

  useEffect(() => {
    if (menuPrice === 0) {
      setSelectedId(null)
      previousPrice.current = 0
    }
  }, [menuPrice])

  const handleRadioButtonChange = (e, id, price) => {
    setSelectedId(id)
    if (previousPrice.current) {
      addItemPrice(price - previousPrice.current)
    } else {
      addItemPrice(price)
    }
    previousPrice.current = price
  }

  const handleDropAll = (e) => {
    e.preventDefault()

    if (selectedId) {
      const selectedOption = options.filter(
        ({ MenuItemOptionSetItemId: id }) => id === selectedId,
      )
      setSelectedId(null)
      removeItemPrice(selectedOption[0].Price)
      previousPrice.current = 0
    }
  }

  return (
    <fieldset>
      <legend>{`${index + 1}. Select an option:`}</legend>
      {options.map(
        ({ MenuItemOptionSetItemId: id, Name: name, Price: price }) => (
          <label key={id}>
            <input
              type="radio"
              name="options"
              value={id}
              checked={selectedId === id}
              onChange={(e) => handleRadioButtonChange(e, id, price)}
            />{' '}
            {name} - {price} €
          </label>
        ),
      )}
      <button onClick={(e) => handleDropAll(e)}>Remove option</button>
    </fieldset>
  )
}

RadioList.propTypes = {
  options: PropTypes.array,
  index: PropTypes.number,
}

export default RadioList
