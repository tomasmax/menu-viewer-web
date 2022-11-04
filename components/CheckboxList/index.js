import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import MenuContext from '../../context/context'

function uncheckAll(options = []) {
  return options.map((option) => ({
    ...option,
    checked: false,
  }))
}

function toggleOption(options, id, checked) {
  return options.map((option) =>
    option.MenuItemOptionSetItemId === id ? { ...option, checked } : option,
  )
}

function CheckboxList({ options = [], index }) {
  const [checkedList, setCheckedList] = useState(uncheckAll(options))
  const context = useContext(MenuContext)
  const { addItemPrice, removeItemPrice, menuPrice } = context

  useEffect(() => {
    menuPrice === 0 && setCheckedList(uncheckAll(options))
  }, [menuPrice, options])

  const handleDropAll = (e) => {
    e.preventDefault()
    let count = 0
    setCheckedList(
      checkedList.map((option) => {
        const { Price: price, checked } = option
        if (checked) {
          count = count + price
          return { ...option, checked: false }
        }
        return option
      }),
    )
    removeItemPrice(count)
  }

  const changeList = (id, checked, price) => {
    if (checked) {
      addItemPrice(price)
    } else {
      removeItemPrice(price)
    }
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked))
  }

  return (
    <fieldset>
      <legend>{`${index + 1}. Select multiple options:`}</legend>
      {checkedList.map(
        ({
          MenuItemOptionSetItemId: id,
          Name: name,
          Price: price,
          checked,
        }) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => changeList(id, e.target.checked, price)}
            />{' '}
            {name} - {price} €
          </label>
        ),
      )}
      <button onClick={(e) => handleDropAll(e)}>Remove all options</button>
    </fieldset>
  )
}

CheckboxList.propTypes = {
  options: PropTypes.array,
  index: PropTypes.number,
}

export default CheckboxList
