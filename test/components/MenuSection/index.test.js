import React from 'react'

import { render, screen } from '../../test-utils'
import MenuSection from '@components/MenuSection/index'

describe('MenuSection', () => {
  it('should render the heading title', () => {
    const props = {
      menuSection: {
        Name: 'Desserts',
      },
    }
    render(<MenuSection {...props} />)

    expect(screen.getByText(props.menuSection.Name))
  })
})
