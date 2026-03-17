export function dijkstra(grid, start, end) {
    const rows = grid.length
    const cols = grid[0].length

    const visited = []
    const distances = Array.from({ length: rows }, () =>
        Array(cols).fill(Infinity)
    )
    const prev = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
    )

    distances[start.row][start.col] = 0

    const queue = [{ ...start, dist: 0 }]

    while (queue.length > 0) {
        queue.sort((a, b) => a.dist - b.dist)
        const current = queue.shift()

        if (!current) break

        const { row, col, dist } = current

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
                const newDist = dist + weight

                if (newDist < distances[n.row][n.col]) {
                    distances[n.row][n.col] = newDist
                    prev[n.row][n.col] = { row, col }

                    queue.push({ ...n, dist: newDist })
                }
            }
        }

    }

    // 🔥 восстановление пути
    const path = []
    let cur = end

    while (cur) {
        path.unshift(cur)
        cur = prev[cur.row][cur.col]
    }

    return { visited, path }
}