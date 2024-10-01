import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/icon.svg";

export default function Login() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la petición a la API
      const response = await fetch("http://localhost:3001/pacientes");
      const data = await response.json();

      const paciente = data.find(
        (p) =>
          p.dni === dni && p.apellidos.toLowerCase() === password.toLowerCase()
      );

      if (paciente) {
        navigate("/home");
      } else {
        setError("DNI o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en la autenticación:", err);
      setError("Hubo un problema con el servidor");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
          Healthly
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <label
                  htmlFor="dni"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ingresar DNI
                </label>
                <input
                  type="text"
                  name="dni"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ingrese su DNI"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña (Apellido)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su apellido"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
