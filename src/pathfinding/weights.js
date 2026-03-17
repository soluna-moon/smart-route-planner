export function generateTraffic(grid) {
    return grid.map(row =>
        row.map(cell => {
            if (cell === 1) return 1 // стена

            const rand = Math.random()

            if (rand < 0.2) return 5 // traffic (дорогая клетка)

            return 0 // обычная
        })

    )
}