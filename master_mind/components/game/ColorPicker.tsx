import { Color } from 'types'

type ColorPickerProps = {
  colors: Color[]
  selectedColor: Color | null
  handleSelectedColor: (color: Color) => void
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
            style={{
              backgroundColor: color,
              opacity: selectedColor ? (selectedColor === color ? 1 : 0.2) : 1,
            }}
            disabled={Boolean(selectedColor) && selectedColor !== color}
            onClick={() => handleSelectedColor(color)}
          ></button>
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
