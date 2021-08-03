import React from 'react'

import { Button } from "@material-ui/core";


export const GetPassword2 = () => {

    return (
      


        
        
        <div className="getPassword2">
        <div className="caja3">
          <form className="formulario2">
            <h3 className="titulo2">Recuperar clave</h3>
  
            <div>
              <i class="fas fa-key"></i>
              <span>
                {" "}
                <input
                  className="texto"
                  type="text"
                  placeholder="Ingrese la clave nueva"
                  name="lEmail"
                  
                  
                />
              </span>
            </div>
            <div>
              <i class="fas fa-key"></i>
              <span>
                {" "}
                <input
                  className="texto"
                  type="text"
                  placeholder="Ingrese la clave nueva otra vez"
                  name="lEmail"
                />
              </span>
            </div>
  
            <Button className="boton2" variant="contained" color="primary" href="GetPassword2">
              Guardar
            </Button>
          </form>
        </div>
      </div>

    )
}