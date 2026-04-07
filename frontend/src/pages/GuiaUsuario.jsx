import Header from '../components/Header.jsx'

export default function GuiaUsuario() {
  return (
    <>
      <Header />
      <main className="pagina guia-usuario">
        <div className="reportes-page animar-entrada">
          <div className="timers-page__header">
            <h1 className="timers-page__titulo">Guía de Usuario</h1>
            <p className="timers-page__subtitulo">Tu archivo personal de lectura</p>
          </div>

          <section className="guia-cuerpo">
            <div className="seccion-bloque">
              <h2 className="seccion-titulo">1. ¿Qué es Bookish?</h2>
              <p><strong>Bookish</strong> es tu archivo personal de lectura: un espacio donde podés registrar todos los libros que leíste, estás leyendo o querés leer, medir cuánto tiempo dedicás a la lectura y guardar notas y citas de los libros que más te marcaron.</p>
              <p>No hace falta saber nada de tecnología para usarla. La aplicación está pensada para lectoras y lectores que quieren llevar un registro ordenado y personal de su vida lectora, sin complicaciones.</p>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">2. Navegación general</h2>
              <p>La aplicación tiene un <strong>menú de navegación</strong> fijo en la parte superior de la pantalla, con acceso a las secciones principales:</p>
              <ul>
                <li><strong>BIBLIOTECA</strong> — tu colección de libros.</li>
                <li><strong>SESIONES</strong> — el panel de lectura activa e historial.</li>
                <li><strong>REGISTROS</strong> — los reportes de tiempo de lectura.</li>
              </ul>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">3. La Biblioteca</h2>
              <p>Es el corazón de Bookish. Desde aquí podés ver todos tus libros organizados, filtrarlos por estado y acceder al detalle de cada uno.</p>
              <div style={{ margin: '1rem 0', border: '1px solid var(--oro-oscuro)', padding: '1rem', background: 'var(--sup-alta)' }}>
                <h3 style={{ color: 'var(--oro-primario)', marginBottom: '0.5rem', fontSize: '0.75rem' }}>◆ Tip</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Los libros se muestran en un carrusel deslizable. Navegá entre ellos con las flechas que aparecen a los costados.</p>
              </div>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">4. Agregar un libro</h2>
              <ol style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Accedé al formulario desde el menú superior.</li>
                <li>Completá los campos (título y autor son obligatorios).</li>
                <li>Tocá <strong>Guardar libro</strong>.</li>
              </ol>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">5. El temporizador</h2>
              <p>Solo aparece en libros en estado "Leyendo". Permite medir tu tiempo de lectura activo.</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>◆ <strong>INICIAR</strong>: Comienza el conteo.</li>
                <li>◆ <strong>PAUSAR</strong>: Registra hasta ese momento.</li>
                <li>◆ <strong>DETENER</strong>: Finaliza y guarda la sesión (podés agregar una nota).</li>
              </ul>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">6. Tus Datos y Privacidad</h2>
              <p>Bookish es <strong>100% local</strong>. Esto significa que toda tu información (libros, notas, portadas y tiempos de lectura) se guarda exclusivamente en <strong>tu computadora</strong>, no en internet ni en servidores externos.</p>
              <div style={{ margin: '1rem 0', padding: '1rem', background: 'var(--sup-media)', borderRadius: '4px', borderLeft: '4px solid var(--oro-primario)' }}>
                <p style={{ margin: 0, color: 'var(--blanco)' }}><strong>Seguridad:</strong> Podés cerrar el programa o apagar tu PC con total tranquilidad; tus datos están protegidos en tu disco duro y no se perderán.</p>
              </div>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo">Preguntas Frecuentes (FAQ)</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--oro-primario)', fontSize: '0.8rem' }}>¿Dónde se guarda mi información físicamente?</h4>
                  <p>En Windows, tus libros y portadas se guardan en la carpeta <code>%LocalAppData%\Bookish</code> de tu usuario. Si borrás el programa y lo volvés a descargar, tus libros seguirán ahí porque la base de datos es independiente del ejecutable.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--oro-primario)', fontSize: '0.8rem' }}>¿El temporizador sigue corriendo si cierro la app?</h4>
                  <p>Sí. La sesión queda guardada. El tiempo transcurrido se contabiliza correctamente cuando volvés a abrirla.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--oro-primario)', fontSize: '0.8rem' }}>¿Cómo agrego una portada?</h4>
                  <p>En el detalle del libro, elegí <strong>Ver + datos</strong> {'->'} <strong>Editar</strong> y buscá la sección de portada al final.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        .guia-cuerpo {
          margin-top: var(--espacio-xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        .guia-cuerpo ul, .guia-cuerpo ol {
          margin-bottom: 1.5rem;
        }
        .guia-cuerpo p {
          color: var(--texto-tenue);
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  )
}
