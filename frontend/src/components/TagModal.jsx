import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../services/api.js'

export default function TagModal({ etiquetaActiva, onClose }) {
  const navigate = useNavigate()
  const [librosAsociados, setLibrosAsociados] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!etiquetaActiva) return

    async function buscarLibros() {
      setCargando(true)
      try {
        const data = await API.getLibros()
        const filtrados = data.filter((libro) => {
          if (!libro.etiquetas) return false
          const listado = libro.etiquetas.split(',').map(e => e.trim().toLowerCase())
          return listado.includes(etiquetaActiva.toLowerCase())
        })
        setLibrosAsociados(filtrados)
      } catch (err) {
        console.error('Error al cargar libros por etiqueta', err)
      } finally {
        setCargando(false)
      }
    }
    
    buscarLibros()
  }, [etiquetaActiva])

  if (!etiquetaActiva) return null

  return (
    <div className="tag-modal-overlay" onClick={onClose}>
      <div className="tag-modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="tag-modal-cabecera">
          <h3 className="tag-modal-titulo">
            <span className="tag-modal-ornamento">◈</span>
            Etiqueta: <span style={{ color: 'var(--oro-primario)' }}>{etiquetaActiva}</span>
          </h3>
          <button className="tag-modal-cerrar" onClick={onClose}>✕</button>
        </div>

        {cargando ? (
          <div className="estado-vacio" style={{ padding: 'var(--espacio-lg)' }}>
            <span className="estado-vacio__ornamento">◈</span>
            <span style={{color: 'var(--oro-silenciado)'}}>Cargando el archivo...</span>
          </div>
        ) : librosAsociados.length > 0 ? (
          <div className="tag-modal-cuadricula">
            {librosAsociados.map(libro => (
              <div 
                key={libro.id} 
                className="tag-modal-libro"
                onClick={() => {
                  onClose()
                  navigate(`/libro/${libro.id}`)
                }}
              >
                <div className="tag-modal-portada">
                  {libro.portada_filename ? (
                    <img src={`/portadas/${libro.portada_filename}`} alt={libro.titulo} />
                  ) : (
                    <span className="tarjeta-libro__sin-portada-ornamento" style={{fontSize: '1.2rem'}}>◆</span>
                  )}
                </div>
                <div className="tag-modal-info">
                  <h4 className="tag-modal-libro-titulo">{libro.titulo}</h4>
                  <p className="tag-modal-libro-autor">{libro.autor}</p>
                  <span className="etiqueta-chip etiqueta-chip--activa" style={{fontSize: '0.65rem', padding: '0.1rem 0.3rem', marginTop: 'auto', display: 'inline-block', width: 'fit-content'}}>
                    {etiquetaActiva}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="estado-vacio" style={{ padding: 'var(--espacio-lg)' }}>
            <span className="estado-vacio__ornamento">◈</span>
            No se encontraron más libros con esta etiqueta.
          </div>
        )}
      </div>
    </div>
  )
}
