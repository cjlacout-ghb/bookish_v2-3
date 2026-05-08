import Header from '../components/Header.jsx'

export default function GuiaUsuario() {
  return (
    <>
      <Header />
      <main className="pagina guia-usuario">
        <div className="reportes-page animar-entrada">
          <div className="timers-page__header">
            <h1 className="timers-page__titulo">GUÍA DE USUARIO</h1>
            <p className="timers-page__subtitulo">Tu archivo personal de lectura.</p>
          </div>

          <section className="guia-cuerpo">
            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>1. ¿Qué es Bookish?</h2>
              <p><strong>Bookish</strong> es tu archivo personal de lectura: un espacio donde podés registrar todos los libros que leíste, estás leyendo o querés leer, medir cuánto tiempo dedicás a la lectura y guardar notas y citas de los libros que más te marcaron.</p>
              <p>No hace falta saber nada de tecnología para usarla. La aplicación está pensada para lectoras y lectores que quieren llevar un registro ordenado y personal de su vida lectora, sin complicaciones.</p>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>2. Navegación general</h2>
              <p>La aplicación tiene un <strong>menú de navegación</strong> fijo en la parte superior de la pantalla, con acceso a las secciones principales:</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>◆ <strong>LA BIBLIOTECA</strong> — Tu colección de libros completa.</li>
                <li>◆ <strong>AGREGAR LIBRO</strong> — Formulario para registrar nuevas obras.</li>
                <li>◆ <strong>SESIONES</strong> — El panel de lectura activa y sesiones de hoy.</li>
                <li>◆ <strong>REPORTES</strong> — Historial detallado de tiempo por día, mes y año.</li>
                <li>◆ <strong>INTELIGENCIA VISUAL</strong> — Estadísticas, gráficos y tus metas de lectura.</li>
              </ul>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>3. La Biblioteca</h2>
              <p>Es el corazón de Bookish. Desde aquí podés ver todos tus libros organizados, filtrarlos por estado y acceder al detalle de cada uno.</p>
              <div style={{ margin: '1rem 0', border: '1px solid var(--oro-oscuro)', padding: '1rem', background: 'var(--sup-alta)' }}>
                <h3 style={{ color: 'var(--oro-primario)', marginBottom: '0.5rem', fontSize: '0.75rem' }}>◆ Tip</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Los libros se muestran en un carrusel deslizable. Navegá entre ellos con las flechas que aparecen a los costados o deslizando en pantallas táctiles.</p>
              </div>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>4. El temporizador y las Sesiones</h2>
              <p>Solo aparece en libros en estado "Leyendo". Permite medir tu tiempo de lectura activo de forma precisa.</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>◆ <strong>INICIAR</strong>: Comienza el conteo del tiempo.</li>
                <li>◆ <strong>PAUSAR</strong>: Detiene el reloj momentáneamente (ideal para interrupciones).</li>
                <li>◆ <strong>DETENER</strong>: Finaliza la sesión, te permite agregar una nota sobre lo leído y guarda el registro.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>En la sección <strong>SESIONES</strong> podés ver todos los libros que tenés abiertos simultáneamente y controlar sus cronómetros desde un solo lugar.</p>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>5. Reportes de lectura</h2>
              <p>En <strong>REPORTES</strong> encontrarás un análisis detallado de cómo distribuís tu tiempo:</p>
              <ul style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Vista Diaria:</strong> Listado cronológico de sesiones y tiempo total por libro.</li>
                <li><strong>Vista Mensual:</strong> Calendario de actividad y promedio diario de lectura.</li>
                <li><strong>Vista Anual:</strong> Evolución mes a mes para ver tus picos de lectura durante el año.</li>
              </ul>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>6. Inteligencia Visual</h2>
              <p>Esta sección transforma tus datos en conocimiento sobre tus hábitos:</p>
              <ul style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Mi Desafío Lector:</strong> Establecé una meta de libros para el año y Bookish te dirá si vas a buen ritmo para cumplirla.</li>
                <li><strong>Análisis por Géneros y Autores:</strong> Descubrí qué temas y escritores predominan en tu biblioteca.</li>
                <li><strong>Evolución de Ratings:</strong> Observá cómo cambian tus valoraciones de libros a lo largo de los años.</li>
              </ul>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>7. Respaldo y Seguridad</h2>
              <p>Tus datos son tuyos y se guardan localmente. Sin embargo, siempre es recomendable tener una copia de seguridad.</p>
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: 'var(--sup-media)', border: '1px solid var(--oro-oscuro)', borderRadius: '4px' }}>
                <p style={{ marginBottom: '1rem' }}>En el icono de la <strong>NUBE</strong> del menú superior podés:</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>◆ <strong>EXPORTAR</strong>: Descarga un archivo ZIP con todos tus libros, notas, sesiones y portadas.</li>
                  <li>◆ <strong>RESTAURAR</strong>: Sube un archivo ZIP previo para recuperar tu biblioteca en caso de cambiar de PC.</li>
                </ul>
                <p style={{ margin: '1rem 0 0 0', color: 'var(--oro-primario)', fontSize: '0.85rem' }}><em>Aviso: Al restaurar, se borrarán los datos actuales para reemplazarlos por los del backup.</em></p>
              </div>
            </div>

            <div className="seccion-bloque">
              <h2 className="seccion-titulo" style={{ color: 'var(--texto-primario)', textTransform: 'none', letterSpacing: 'normal' }}>Preguntas frecuentes (FAQ)</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', border: '1px double var(--oro-oscuro)', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '4px' }}>
                  <h3 style={{ color: 'var(--oro-primario)', fontSize: '0.9rem', marginBottom: '1.2rem', textAlign: 'center', letterSpacing: '2px' }}>◆ SECCIÓN ESPECIAL: GESTIÓN DE ARCHIVOS ◆</h3>
                  
                  <div style={{ marginBottom: '1.2rem' }}>
                    <h4 style={{ color: 'var(--blanco)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>1. ¿Dónde se guarda mi base de datos?</h4>
                    <p style={{ margin: 0 }}>Físicamente, todos tus libros y sesiones están en el archivo <code>bookish.db</code> ubicado en:</p>
                    <code style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--sup-alta)', fontSize: '0.75rem', color: 'var(--oro-primario)', border: '1px solid var(--sup-baja)' }}>Documentos\Bookish\data\</code>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--blanco)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>2. ¿Dónde se guardan mis portadas?</h4>
                    <p style={{ margin: 0 }}>Bookish crea automáticamente una carpeta llamada <code>portadas</code> dentro de la misma ruta. Si querés hacer un backup manual, esa es la carpeta que debés copiar junto al archivo <code>bookish.db</code>.</p>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--oro-primario)', fontSize: '0.8rem' }}>¿El temporizador sigue corriendo si cierro la app?</h4>
                  <p>Sí. Las sesiones activas se guardan. El tiempo transcurrido se contabiliza correctamente cuando volvés a abrir la aplicación.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--oro-primario)', fontSize: '0.8rem' }}>¿Cómo agrego una portada?</h4>
                  <p>En el detalle de cualquier libro, seleccioná <strong>VER + DATOS</strong> {'->'} <strong>EDITAR</strong> y buscá la sección de portada al final del formulario.</p>
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
          padding-bottom: 5rem;
        }
        .guia-cuerpo ul, .guia-cuerpo ol {
          margin-bottom: 1.5rem;
        }
        .guia-cuerpo p {
          color: var(--texto-tenue);
          margin-bottom: 1rem;
        }
        .seccion-bloque {
          margin-bottom: 3rem;
        }
      `}</style>
    </>
  )
}

