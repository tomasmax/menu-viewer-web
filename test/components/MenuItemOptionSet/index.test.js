import { render, screen } from '../../test-utils'
import MenuItemOptionSet from '@components/MenuItemOptionSet/index'

const props = {
  isMasterOptionSet: false,
  index: 1,
  menuOptionSetItems: [
    {
      MenuItemOptionSetItemId: 13502386,
      Name: 'Small',
      Price: 0,
      TaxRateId: null,
      TaxRate: null,
      TaxValue: 0,
      IsAvailable: true,
      DisplayOrder: 0,
      IsDeleted: false,
      Tags: [],
      NextMenuItemOptionSetId: null,
      PublicId: 'fb2050e5-fb9e-40d5-ac99-b8b7071bb264',
      ImageName: null,
      ImageUrl: null,
      CellAspectRatio: 0,
      CellLayoutType: 0,
      OptionSetItemMetadata: [],
    },
    {
      MenuItemOptionSetItemId: 13502387,
      Name: 'Large',
      Price: 2,
      TaxRateId: null,
      TaxRate: null,
      TaxValue: 0,
      IsAvailable: true,
      DisplayOrder: 1,
      IsDeleted: false,
      Tags: [],
      NextMenuItemOptionSetId: null,
      PublicId: '8b6ff4e4-2f30-4df3-b308-2c3444edf7a5',
      ImageName: null,
      ImageUrl: null,
      CellAspectRatio: 0,
      CellLayoutType: 0,
      OptionSetItemMetadata: [],
    },
  ],
}

describe('MenuItemOptionSet', () => {
  it('should render options as checkboxes', () => {
    render(<MenuItemOptionSet {...props} />)

    expect(screen.getAllByRole('checkbox').length).toBe(
      props.menuOptionSetItems.length,
    )
  })

  it('should render options as radio buttons', () => {
    render(<MenuItemOptionSet {...props} isMasterOptionSet={true} />)

    expect(screen.getAllByRole('radio').length).toBe(
      props.menuOptionSetItems.length,
    )
  })
})
