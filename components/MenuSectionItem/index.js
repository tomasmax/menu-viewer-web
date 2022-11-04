import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import MenuContext from '../../context/context'
import styles from './MenuSectionItem.module.scss'
import Image from 'next/image'

function MenuSectionItem({ name, price, imageUrl, description, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const context = useContext(MenuContext)
  const { addItemPrice, removeItemPrice } = context

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      addItemPrice(price)
    } else {
      removeItemPrice(price)
    }
  }

  return (
    <article
      className={isOpen ? `${styles.item} ${styles.itemSelected}` : styles.item}
      onClick={handleClick}
    >
      <h3 className={styles.title}>{name}</h3>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.price}>
        {price ? `${price} €` : 'Click to see options'}
      </p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Menu section item ${name} image`}
          width={250}
          height={200}
          layout="fixed"
        />
      )}
      <div style={isOpen ? { display: 'block' } : { display: 'none' }}>
        {children}
      </div>
    </article>
  )
}

MenuSectionItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default MenuSectionItem
