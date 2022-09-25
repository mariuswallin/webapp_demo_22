const rowData = {
  number: 1,
  cells: [
    { cellname: "cell-1", background: "red" },
    { cellname: "cell-2", background: "blue" },
    { cellname: "cell-3", background: "yellow" },
    { cellname: "cell-4", background: "green" },
  ],
};

// TODO: Ta i mot handleCellClick
// TODO: Ta i mot handleRowSubmit
// TODO: Ta i mot isCurrentRow
// TODO: Utvide til å være et form (se RowForm)
// TODO: Bruke isCurrentRow til å avgjøre hva som skal være mulig å gjøre
export default function Row() {
  return (
    <div className="row-inner-wrapper">
      <div className="row">
        <p>{rowData.number}</p>
        <div className="cells">
          {rowData.cells.map((cell) => (
            <div key={cell.cellname} className="cells">
              <button
                className="cellButton"
                type="button"
                style={{ backgroundColor: cell.background ?? "transparent" }}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
