import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import { API } from '../services/api.js'

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function currentYear() {
  const now = new Date()
  return new Date(now.getTime() - 3 * 60 * 60 * 1000).getUTCFullYear()
}

function barPct(val, max) {
  if (!max || max === 0) return 0
  return Math.min(100, Math.round((val / max) * 100))
}

const EMPTY_MSG = 'Aún no hay datos suficientes para revelar este patrón.'

/* ── Shared sub-components ───────────────────────────────────────────────── */
function EmptyState() {
  return <p className="iv-empty">{EMPTY_MSG}</p>
}

function LoadingState() {
  return <p className="iv-cargando">Cargando…</p>
}

/* ── Block 1: Resumen numérico ──────────────────────────────────────────── */
function BloqueResumen() {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    API.getStatsOverview()
      .then(setData)
      .catch(console.error)
      .finally(() => setCargando(false))
  }, [])

  return (
    <section className="iv-bloque">
      <h2 className="iv-titulo-seccion">TU COLECCIÓN EN NÚMEROS</h2>
      {cargando ? (
        <LoadingState />
      ) : !data ? (
        <EmptyState />
      ) : (
        <div className="iv-stats-grid">
          <div className="iv-stat-card">
            <span className="iv-stat-numero">{data.total_books_read.toLocaleString()}</span>
            <span className="iv-stat-label">LIBROS LEÍDOS</span>
          </div>
          <div className="iv-stat-card">
            <span className="iv-stat-numero">{data.total_pages.toLocaleString()}</span>
            <span className="iv-stat-label">PÁGINAS TOTALES</span>
          </div>
          <div className="iv-stat-card">
            <span className="iv-stat-numero">{data.unique_authors.toLocaleString()}</span>
            <span className="iv-stat-label">AUTORES ÚNICOS</span>
          </div>
          <div className="iv-stat-card">
            <span className="iv-stat-numero">{data.unique_genres.toLocaleString()}</span>
            <span className="iv-stat-label">GÉNEROS DISTINTOS</span>
          </div>
        </div>
      )}
    </section>
  )
}

/* ── Blocks 2–4: Horizontal bar charts ──────────────────────────────────── */
function BloqueBarrasHorizontales({ titulo, fetchFn, labelKey, countKey }) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(console.error)
      .finally(() => setCargando(false))
  }, [])

  const maxCount = data && data.length > 0 ? Math.max(...data.map(d => d[countKey])) : 1

  return (
    <section className="iv-bloque">
      <h2 className="iv-titulo-seccion">{titulo}</h2>
      {cargando ? (
        <LoadingState />
      ) : !data || data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="iv-barras-h">
          {data.map((item, i) => (
            <div key={i} className="iv-barra-h-fila">
              <span className="iv-barra-h-label">{item[labelKey]}</span>
              <div className="iv-barra-h-track">
                <div
                  className="iv-barra-h-fill"
                  style={{ width: `${barPct(item[countKey], maxCount)}%` }}
                />
              </div>
              <span className="iv-barra-h-count">{item[countKey]}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ── Block 5a: Mi Desafío Lector ─────────────────────────────────────────── */
function BloqueDesafio({ year }) {
  const [progress, setProgress] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [guardando, setGuardando] = useState(false)

  function cargar() {
    setCargando(true)
    API.getGoalProgress(year)
      .then(setProgress)
      .catch(console.error)
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargar()
    setEditando(false)
  }, [year])

  async function handleGuardar() {
    const books = parseInt(inputVal, 10)
    if (!books || books < 1) return
    setGuardando(true)
    try {
      await API.upsertGoal(year, books)
      await cargar()
      setEditando(false)
    } catch (e) {
      console.error(e)
    } finally {
      setGuardando(false)
    }
  }

  function abrirEditor(initialVal) {
    setInputVal(initialVal !== undefined ? String(initialVal) : '')
    setEditando(true)
  }

  const hasGoal = progress && progress.target_books > 0

  return (
    <section className="iv-bloque">
      {/* ── Title row ── */}
      <div className="iv-bloque-header iv-desafio-header">
        <h2 className="iv-titulo-seccion">MI DESAFÍO LECTOR</h2>
        {!cargando && (
          <button
            className="iv-desafio-edit-btn"
            onClick={() => abrirEditor(hasGoal ? progress.target_books : '')}
          >
            {hasGoal ? 'EDITAR META' : 'ESTABLECER META'}
          </button>
        )}
      </div>

      {/* ── Inline edit form ── */}
      {editando && (
        <div className="iv-desafio-form">
          <input
            id="iv-goal-input"
            type="number"
            min="1"
            max="999"
            className="iv-desafio-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            autoFocus
          />
          <label htmlFor="iv-goal-input" className="iv-desafio-form-label">
            libros en {year}
          </label>
          <button
            className="btn btn-primario btn-sm iv-desafio-guardar"
            onClick={handleGuardar}
            disabled={guardando}
          >
            GUARDAR
          </button>
          <button
            className="iv-desafio-cancelar"
            onClick={() => setEditando(false)}
          >
            CANCELAR
          </button>
        </div>
      )}

      {/* ── Content ── */}
      {cargando ? (
        <LoadingState />
      ) : !hasGoal ? (
        <p className="iv-empty iv-desafio-empty">
          No has establecido una meta para {year}.
        </p>
      ) : (
        <div className="iv-desafio-contenido">
          {/* LEFT: numbers */}
          <div className="iv-desafio-numeros">
            <span className="iv-desafio-big">{progress.books_read}</span>
            <span className="iv-desafio-sublabel">LIBROS LEÍDOS</span>

            <div className="iv-desafio-sep"></div>

            <div className="iv-desafio-mini-row">
              <div className="iv-desafio-mini">
                <span className="iv-desafio-mini-num">{progress.books_remaining}</span>
                <span className="iv-desafio-mini-label">FALTAN</span>
              </div>
              <div className="iv-desafio-mini">
                <span className="iv-desafio-mini-num">{progress.percentage}%</span>
                <span className="iv-desafio-mini-label">COMPLETADO</span>
              </div>
            </div>

            {progress.on_track === true && (
              <span className="iv-desafio-track iv-desafio-track--ok">◆ EN CAMINO</span>
            )}
            {progress.on_track === false && (
              <span className="iv-desafio-track iv-desafio-track--slow">◇ RITMO LENTO</span>
            )}
          </div>

          {/* RIGHT: progress bar */}
          <div className="iv-desafio-barra-col">
            <span className="iv-desafio-barra-pct">{progress.percentage}%</span>
            <div className="iv-desafio-barra-track">
              <div
                className="iv-desafio-barra-fill"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="iv-desafio-meta-label">
              META: {progress.target_books} LIBROS EN {year}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

/* ── Block 5b: Ritmo lector (now receives year + setter from parent) ─────── */
function BloqueRitmo({ year, setYear, availableYears }) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    API.getStatsRhythm(year)
      .then(setData)
      .catch(console.error)
      .finally(() => setCargando(false))
  }, [year])

  const maxCount = data && data.length > 0 ? Math.max(...data.map(d => d.count), 1) : 1
  const yearOpts = Array.from(new Set([...availableYears, currentYear()])).sort((a, b) => b - a)

  return (
    <section className="iv-bloque">
      <div className="iv-bloque-header">
        <h2 className="iv-titulo-seccion">RITMO LECTOR</h2>
        <div className="iv-selector-anio">
          <select
            id="iv-ritmo-year"
            className="iv-select"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
          >
            {yearOpts.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {cargando ? (
        <LoadingState />
      ) : !data || data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="iv-ritmo-contenedor">
          {data.map((mes) => (
            <div key={mes.month} className="iv-ritmo-col">
              <span className="iv-ritmo-count">{mes.count > 0 ? mes.count : ''}</span>
              <div className="iv-ritmo-track">
                <div
                  className="iv-ritmo-bar"
                  style={{
                    height: `${barPct(mes.count, maxCount)}%`,
                    opacity: mes.count === 0 ? 0.1 : 1,
                  }}
                />
              </div>
              <span className="iv-ritmo-mes">{mes.month_name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ── Block 6: Evolución de ratings (SVG line chart) ─────────────────────── */
function BloqueRatings() {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    API.getStatsRatingsEvolution()
      .then(setData)
      .catch(console.error)
      .finally(() => setCargando(false))
  }, [])

  const W = 720
  const H = 200
  const PAD = { top: 30, right: 32, bottom: 32, left: 32 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const renderChart = () => {
    if (!data || data.length === 0) return <EmptyState />

    if (data.length === 1) {
      const d = data[0]
      return (
        <div className="iv-ratings-single">
          <span className="iv-ratings-single-val">{d.average_rating}</span>
          <span className="iv-ratings-single-label">{d.year}</span>
          <p className="iv-empty iv-ratings-nota">
            Más años de lectura revelarán tu evolución.
          </p>
        </div>
      )
    }

    const minYear = data[0].year
    const maxYear = data[data.length - 1].year
    const yearRange = maxYear - minYear || 1

    const xOf = (y) => PAD.left + ((y - minYear) / yearRange) * chartW
    const yOf = (rating) => PAD.top + chartH - (rating / 5) * chartH

    const points = data.map(d => `${xOf(d.year)},${yOf(d.average_rating)}`).join(' ')

    return (
      <div className="iv-ratings-wrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="iv-ratings-svg"
          aria-label="Evolución de ratings"
        >
          {[1, 2, 3, 4, 5].map(v => (
            <line
              key={v}
              x1={PAD.left} x2={W - PAD.right}
              y1={yOf(v)}   y2={yOf(v)}
              stroke="#3a2e0e" strokeWidth="0.5"
            />
          ))}
          <polyline points={points} fill="none" stroke="#c9a84c" strokeWidth="1.5" />
          {data.map(d => (
            <g key={d.year}>
              <circle cx={xOf(d.year)} cy={yOf(d.average_rating)} r="4" fill="#c9a84c" />
              <text
                x={xOf(d.year)} y={yOf(d.average_rating) - 10}
                textAnchor="middle" fill="#c9a84c" fontSize="11"
                fontFamily="'Cinzel', serif"
              >{d.average_rating}</text>
              <text
                x={xOf(d.year)} y={H - 4}
                textAnchor="middle" fill="#9a8040" fontSize="10"
                fontFamily="'Cinzel', serif"
              >{d.year}</text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <section className="iv-bloque">
      <h2 className="iv-titulo-seccion">EVOLUCIÓN DE RATINGS</h2>
      {cargando ? <LoadingState /> : renderChart()}
    </section>
  )
}

/* ── Main Page ───────────────────────────────────────────────────────────── */
export default function InteligenciaVisual() {
  // Shared year state — lifted so BloqueDesafio and BloqueRitmo stay in sync
  const [sharedYear, setSharedYear] = useState(currentYear())
  const [availableYears, setAvailableYears] = useState([currentYear()])

  useEffect(() => {
    API.getStatsRatingsEvolution()
      .then(data => {
        if (data && data.length > 0) {
          const years = data.map(d => d.year)
          setAvailableYears(prev => Array.from(new Set([...prev, ...years])))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main className="pagina">
        <div className="iv-pagina animar-entrada">

          {/* Page header */}
          <div className="iv-encabezado">
            <h1 className="iv-titulo-pagina">INTELIGENCIA VISUAL</h1>
            <p className="iv-subtitulo-pagina">
              El archivo de tus patrones lectores.
            </p>
          </div>

          {/* Block 1 */}
          <BloqueResumen />

          {/* Block 2 */}
          <BloqueBarrasHorizontales
            titulo="POR GÉNEROS"
            fetchFn={API.getStatsByGenre}
            labelKey="genre"
            countKey="count"
          />

          {/* Block 3 */}
          <BloqueBarrasHorizontales
            titulo="POR AUTORES"
            fetchFn={API.getStatsByAuthor}
            labelKey="author"
            countKey="count"
          />

          {/* Block 4 */}
          <BloqueBarrasHorizontales
            titulo="POR EDITORIAL"
            fetchFn={API.getStatsByPublisher}
            labelKey="publisher"
            countKey="count"
          />

          {/* Block 5a — Mi Desafío Lector (shares year with Ritmo) */}
          <BloqueDesafio year={sharedYear} />

          {/* Block 5b — Ritmo Lector (owns the year selector) */}
          <BloqueRitmo
            year={sharedYear}
            setYear={setSharedYear}
            availableYears={availableYears}
          />

          {/* Block 6 */}
          <BloqueRatings />

        </div>
      </main>
    </>
  )
}
