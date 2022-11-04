// test-utils.js
import { render } from '@testing-library/react'
import MenuContext from '../context/context'

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => (
  <MenuContext.Provider
    value={{
      menuPrice: null,
      addItemPrice: () => {},
      removeItemPrice: () => {},
    }}
  >
    {children}
  </MenuContext.Provider>
)

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
