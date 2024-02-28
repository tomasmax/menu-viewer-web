import React, { useEffect, useState, useCallback } from 'react'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import axios from 'axios'
import MenuSection from '../components/MenuSection'
import MenuSectionItem from '../components/MenuSectionItem'
import MenuItemOptionSet from '../components/MenuItemOptionSet'

import MenuContext from '../context/context'

export default function Home({
  menuData = {
    MenuSections: [],
  },
}) {
  const [menuPrice, setMenuPrice] = useState(0)
  const [isSticky, setIsSticky] = useState(false)

  const addItemPrice = useCallback((price) => {
    setMenuPrice((prevPrice) => prevPrice + price)
  }, [])

  const removeItemPrice = useCallback((price) => {
    setMenuPrice((prevPrice) => {
      const difference = prevPrice - price
      return difference < 0 ? 0 : difference
    })
  }, [])

  useEffect(() => {
    const menuPriceElement = document.getElementById('menuPrice')
    const topbarOffset = menuPriceElement.offsetTop
    const checkIfSticky = () => setIsSticky(window.scrollY > topbarOffset)
    window.addEventListener('scroll', checkIfSticky)
    return () => window.removeEventListener('scroll', checkIfSticky)
  }, [])

  const resetMenuPrice = () => setMenuPrice(0)

  return (
    <MenuContext.Provider value={{ menuPrice, addItemPrice, removeItemPrice }}>
      <div className={styles.container}>
        <Head>
          <title>Flipdish Menu</title>
          <meta name="description" content="flipdish menu" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://www.flipdish.com/">Flipdish Menu!</a>
          </h1>

          <p className={styles.description}>
            Get started by choosing your Menu
          </p>
          <div
            id="menuPrice"
            className={
              isSticky
                ? `${styles.menuPriceContainer} ${styles.sticky}`
                : styles.menuPriceContainer
            }
          >
            {' '}
            <p className={styles.description}>Menu total price: {menuPrice}</p>
            <button className={styles.button} onClick={resetMenuPrice}>
              Remove selected menu items
            </button>
          </div>
        </main>

        {menuData.MenuSections.map((menuSection) => {
          const { MenuSectionId, MenuItems } = menuSection
          return (
            <MenuSection key={MenuSectionId} menuSection={menuSection}>
              {MenuItems.map((menuSectionItem, index) => {
                const {
                  MenuItemId,
                  Name,
                  Price,
                  ImageUrl,
                  Description,
                  MenuItemOptionSets,
                } = menuSectionItem
                return (
                  <MenuSectionItem
                    key={`${MenuItemId}-${index}`}
                    name={Name}
                    price={Price}
                    imageUrl={ImageUrl}
                    description={Description}
                  >
                    <div className={styles.optionSets}>
                      {MenuItemOptionSets.map((menuItemOptionSet, index) => {
                        const {
                          IsMasterOptionSet,
                          MenuItemOptionSetItems,
                          MenuItemOptionSetId,
                        } = menuItemOptionSet
                        return (
                          <MenuItemOptionSet
                            key={`${MenuItemOptionSetId}-${index}`}
                            isMasterOptionSet={IsMasterOptionSet}
                            menuOptionSetItems={MenuItemOptionSetItems}
                            index={index}
                          />
                        )
                      })}
                    </div>
                  </MenuSectionItem>
                )
              })}
            </MenuSection>
          )
        })}

        <footer className={styles.footer}>Developed by tomasmax</footer>
      </div>
    </MenuContext.Provider>
  )
}

export async function getStaticProps() {
  const MENU_API_URL =
    'https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json'

  try {
    const response = await axios.get(MENU_API_URL)
    return { props: { menuData: response.data } }
  } catch (error) {
    console.error('Error fetching menu data', error)
  }
}
