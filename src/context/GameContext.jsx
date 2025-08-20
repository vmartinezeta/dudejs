import { createContext, useContext, useState } from 'react';
import useSound from 'use-sound';
import urlSound from "../audio/musica-fondo.mp3";


const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new TypeError("Falta un contexto para ser utilizado");
    }
    return context;
}


export function GameProvider({ children }) {
    const [play, { stop }] = useSound(urlSound,{loop:true});
    const [toggleMusica, setToggleMusica] = useState(false);


    const onToggleMusica = () => {
        const toggle = !toggleMusica;
        if (toggle) {
            play();
        } else {
            stop();
        }

        setToggleMusica(toggle);
    }


    return <GameContext.Provider value={{
        onToggleMusica,
    }}>
        {children}
    </GameContext.Provider>;
}