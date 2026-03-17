function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

export function astar(grid, start, end) {
    const rows = grid.length
    const cols = grid[0].length

    const open = [{ ...start, g: 0, f: heuristic(start, end) }]
    const visited = []

    const gScore = Array.from({ length: rows }, () =>
        Array(cols).fill(Infinity)
    )
    const prev = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
    )

    gScore[start.row][start.col] = 0

    while (open.length > 0) {
        open.sort((a, b) => a.f - b.f)
        const current = open.shift()

        if (!current) break

        const { row, col, g } = current

        if (grid[row][col] === 1) continue

        visited.push({ row, col })

        if (row === end.row && col === end.col) break

        const neighbors = [
            { row: row + 1, col },
            { row: row - 1, col },
            { row, col: col + 1 },
            { row, col: col - 1 },
        ]

        for (let n of neighbors) {
            if (
                n.row >= 0 &&
                n.col >= 0 &&
                n.row < rows &&
                n.col < cols &&
                grid[n.row][n.col] !== 1
            ) {
                const weight = grid[n.row][n.col] === 5 ? 5 : 1
                const tentativeG = g + weight

                if (tentativeG < gScore[n.row][n.col]) {
                    gScore[n.row][n.col] = tentativeG
                    prev[n.row][n.col] = { row, col }

                    const f = tentativeG + heuristic(n, end)
                    open.push({ ...n, g: tentativeG, f })
                }
            }
        }

    }

    // восстановление пути
    const path = []
    let cur = end

    while (cur) {
        path.unshift(cur)
        cur = prev[cur.row][cur.col]
    }

    return { visited, path }
}