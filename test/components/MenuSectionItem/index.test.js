import React from 'react'

import { render, screen, fireEvent, waitFor } from '../../test-utils'
import MenuSectionItem from '@components/MenuSectionItem/index'

describe('MenuSectionItem', () => {
  it('should render props correctly and show children on click', async () => {
    const props = {
      name: 'dessert',
      price: 10,
      imageUrl: 'https://flipdish.imgix.net/2T7TarPTQehVDxIYmoO84wDrOg.jpg',
      description: 'description',
      children: 'child',
    }
    render(<MenuSectionItem {...props} />)

    const title = screen.getByText(props.name)
    expect(title)
    expect(screen.getByText(`${props.price} €`))
    expect(screen.getByText(props.description))
    screen.getByAltText(`Menu section item ${props.name} image`)

    fireEvent.click(title)
    await waitFor(() => {
      expect(screen.getByText(props.children)).toBeVisible()
    })
  })
})
