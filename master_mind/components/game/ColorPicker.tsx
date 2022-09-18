import { Color } from 'types'

type ColorPickerProps = {
  colors: Color[]
  selectedColor: Color | null
  handleSelectedColor: (color: Color) => void
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const ColorPicker = ({
  colors,
  selectedColor,
  handleSelectedColor,
}: ColorPickerProps) => {
  return (
    <ul className="colorPicker">
      {colors.map((color) => (
        <li key={color} data-testid="color">
          <button
            data-testid={`${
              selectedColor && selectedColor === color ? selectedColor : ''
            }`}
            style={{ backgroundColor: color }}
            className={`${classNames(
              selectedColor && selectedColor === color
                ? 'row-form-button-selected'
                : '',
              'row-form-button'
            )}`}
            disabled={Boolean(selectedColor) && selectedColor !== color}
            onClick={() => handleSelectedColor(color)}
          ></button>
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
