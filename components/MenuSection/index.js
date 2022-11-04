import React from 'react'
import PropTypes from 'prop-types'

import styles from './MenuSection.module.scss'

function MenuSection({ menuSection, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{menuSection.Name}</h2>
      {menuSection.description && <p>{menuSection.description}</p>}
      <div className={styles.childrenContainer}>{children}</div>
    </section>
  )
}

MenuSection.propTypes = {
  menuSection: PropTypes.object,
  children: PropTypes.node,
}

export default MenuSection
