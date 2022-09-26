import ColorPicker from "./ColorPicker";

export default function Row({
  row,
  handleCellClick,
  handleRowSubmit,
  isCurrentRow,
  handleSelectedColor,
}) {
  return (
    <>
      <form onSubmit={handleRowSubmit}>
        <div className="row-inner-wrapper">
          <div className="row">
            <p>{row.number}</p>
            <div className="cells">
              {row.cells.map((cell) => (
                <div key={cell.cellname} className="cell">
                  <button
                    className="cellButton"
                    type="button"
                    onClick={handleCellClick}
                    style={{
                      backgroundColor: cell.background ?? "transparent",
                    }}
                  ></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button>Send</button>
      </form>
      <ColorPicker
        colors={[]}
        selectedColor={null}
        handleSelectedColor={handleSelectedColor}
      />
    </>
  );
}
