import Grupo2 from '../../../img_src/Grupo2.jpg';

export const ContactUsPage = () => {
  return (
    <div className="flex flex-col py-5 px-5 sm:px-10">
        <h1 className="text-1xl font-bold mb-3 text-left">
            
        </h1>

        <div className="w-full bg-green-100 min-h-150 rounded-3xl">
            <div className=" w-full p-6 sm:px-10 items-center">
            <div className="text-center">
                <h1 className="text-1xl font-bold mb-3">
                    Miembros del Grupo 2
                </h1>
                <ul class="list-none flex gap-4 p-0 m-0 justify-center">
                  <li>Joaquin Alfaro</li>
                  <li>Fantino Camara</li>
                  <li>Sebastian Garcia</li>
                  <li>Rober Goñas</li>
                  <li>Ariel Gutiérrez</li>
                  <li>Sofia Mejorada</li>
                  <li>Alessander Mejia</li>
                </ul>         
            </div>
              <img src={Grupo2} alt="Imagen del grupo" className="mx-auto" ></img>
            </div>
        </div>
    </div>
  )
}