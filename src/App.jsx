import { useState } from "react"
import Grid from "./components/Grid"
import { dijkstra } from "./pathfinding/dijkstra"
import { astar } from "./pathfinding/astar"
import { generateTraffic } from "./pathfinding/weights"

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 30 }, () => 0)
    )
  )
  const [visited, setVisited] = useState([])
  const [path, setPath] = useState([])

  function toggleWall(row, col) {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? 1 : cell
      )
    )
    setGrid(newGrid)
  }

  function runDijkstra() {
    const start = { row: 0, col: 0 }
    const end = { row: 10, col: 20 }

    const { visited, path } = dijkstra(grid, start, end)

    let i = 0

    const interval = setInterval(() => {
      setVisited(visited.slice(0, i))
      i++

      if (i >= visited.length) {
        clearInterval(interval)
        setPath(path)
      }

    }, 20)
  }

  function runAstar() {
    const start = { row: 0, col: 0 }
    const end = { row: 10, col: 20 }

    const { visited, path } = astar(grid, start, end)

    let i = 0

    const interval = setInterval(() => {
      setVisited(visited.slice(0, i))
      i++

      if (i >= visited.length) {
        clearInterval(interval)
        setPath(path)
      }

    }, 20)
  }

  function addTraffic() {
    const newGrid = generateTraffic(grid)
    setGrid(newGrid)
    setVisited([])
    setPath([])
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Smart Route Planner
      </h1>
      <button onClick={runDijkstra}>
        Run Dijkstra
      </button>
      <button onClick={runAstar}>
        Run A*
      </button>
      <button onClick={addTraffic}>
        Add Traffic
      </button>
      <div className="controls">
        <button onClick={runDijkstra}>Dijkstra</button>
        <button onClick={runAstar}>A*</button>
        <button onClick={addTraffic}>Traffic</button>
      </div>
      <div className="legend">
        <div><span className="box wall"></span> Wall</div>
        <div><span className="box visited"></span> Visited</div>
        <div><span className="box path"></span> Path</div>
        <div><span className="box traffic"></span> Traffic</div>
      </div>
      <h1 className="title">Smart Route Planner</h1>

      <Grid grid={grid} toggleWall={toggleWall} visited={visited} path={path} />

    </div>

  )
}

export default App