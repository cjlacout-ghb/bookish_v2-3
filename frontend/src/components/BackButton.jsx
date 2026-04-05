import { useNavigate, useLocation } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostramos el botón de retroceso en la landing page principal
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="btn-back-wrapper animar-entrada">
      <button 
        className="btn-back-global" 
        onClick={() => navigate(-1)}
        title="Volver atrás"
      >
        <span className="btn-back-icon material-symbols-outlined">chevron_left</span>
      </button>
    </div>
  )
}
