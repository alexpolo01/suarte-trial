import { Link } from 'react-router-dom';

import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function WelcomeAdmin() {
  return (
    <>
      <div className="welcome-admin__container">
        <Text className="welcome-admin__text" paragraph justify large>
                    Bienvenido al panel de administración de Suarte. Algunas consideraciones a tener en cuenta:
        </Text>

        <Text className="welcome-admin__text" paragraph justify large>
                    Este panel solo estara disponible durante la fase 0 del proyecto. Se trata de una herramienta sencilla que permitira gestionar las solicitudes de galerías y solicitudes de cuadros.
        </Text>

        <Text className="welcome-admin__text" paragraph justify large>
                    Por favor, no compartas la cuenta con nadie. Y siempre asegurate de que cierras sesion una vez termines de usar el panel. Para cerrar sesion puedes usar el boton de "Cerrar sesión" en la barra de navegación superior.
                    Nunca dejes la cuenta abierta para evitar posibles ataques de seguridad.
        </Text>

        <Text className="welcome-admin__text" paragraph justify large>
                    Además, nuestra web esta toda en ingles (por el momento), asi que acuerdate de escribir siempre todos los mensajes en ingles para que se le notifique a la galería correctamente y pueda entendernos. Aunque sea una galería española, vamos a 
                    intentar mantener la maxima consistencia posible en nuestro sistema de soporte.
        </Text>

        <Text className="welcome-admin__text" paragraph justify large>
                    Si no eres un empleado de Suarte y estas viendo este panel, asumimos nuestra derrota asi que en el siguiente link puedes encontrar todos los datos críticos de Suarte como recompensa por habernos vulnerado la aplicación: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Datos críticos de Suarte</a>
        </Text>

        <Text className="welcome-admin__text" paragraph justify large>
                    Cansado de trabajar tanto? Ponte este temita mi rey: <a href="https://www.youtube.com/watch?v=vIaH35-MLsk">Nice.</a>
        </Text>

        <div className="welcome-admin__links">
          <Link className="welcome-admin__link" to="gallery-requests">Ver solicitudes de galerias</Link>
          <Link className="welcome-admin__link" to="artwork-requests" style={{ marginRight: "20px" }}>Ver solicitudes de cuadros</Link>
          <Link className="welcome-admin__link" to="limited-edition-requests" style={{ marginRight: "20px" }}>Ver solicitudes de ediciones limitadas</Link>
          <a className="welcome-admin__link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ marginRight: "20px" }}>Ver datos bancarios de Pablo Gil Martinez</a>
        </div>
      </div>
    </>
  );
}
