import React from 'react'
import { Publicaciones } from '../publicaciones/Publicaciones'
import { RightBar } from '../rightBar/RightBar'

export const HomeScreen = () => {
    return (
        <div className="main__home">
            
                <Publicaciones />
            
        
                <RightBar />
         
        </div>
    )
}
