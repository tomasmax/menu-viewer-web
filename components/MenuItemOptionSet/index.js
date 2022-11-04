import PropTypes from 'prop-types'

import CheckboxList from '../CheckboxList'
import RadioList from '../RadioList'
import React from 'react'
import styles from './MenuItemOptionSet.module.scss'

function handleContainerClick(e) {
  e.stopPropagation()
}
function MenuItemOptionSet({ isMasterOptionSet, menuOptionSetItems, index }) {
  return (
    <form className={styles.options} onClick={(e) => handleContainerClick(e)}>
      {isMasterOptionSet ? (
        <RadioList options={menuOptionSetItems} index={index} />
      ) : (
        <CheckboxList options={menuOptionSetItems} index={index} />
      )}
    </form>
  )
}

MenuItemOptionSet.propTypes = {
  isMasterOptionSet: PropTypes.bool,
  menuOptionSetItems: PropTypes.array,
  index: PropTypes.number,
}

export default MenuItemOptionSet
