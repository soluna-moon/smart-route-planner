import "./grid.css"

function Grid({ grid, toggleWall, visited, path }) {
    return (
        <div className="grid">
            {grid.map((row, r) =>
                row.map((cell, c) => {

                    const isVisited = visited.some(
                        (v) => v.row === r && v.col === c
                    )
                    const isPath = path.some(
                        (p) => p.row === r && p.col === c
                    )
                    const isTraffic = cell === 5

                    return (
                        <div
                            key={`${r}-${c}`}
                            className={`cell
      ${cell === 1 ? "wall" : ""}
      ${isTraffic ? "traffic" : ""}
      ${isVisited ? "visited" : ""}
      ${isPath ? "path" : ""}`}
                            onClick={() => toggleWall(r, c)}
                        ></div>
                    )

                })
            )}
        </div >
    )
}

function toggleWall(row, col) {
    const newGrid = grid.map((r, i) =>
        r.map((cell, j) =>
            i === row && j === col ? (cell === 1 ? 0 : 1) : cell
        )
    )
    setGrid(newGrid)
}

export default Grid