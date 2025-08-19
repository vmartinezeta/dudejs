import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import { useGame } from './context/GameContext'
import "./estilos.css"


function App() {
    const phaserRef = useRef()
    const {onToggleMusica} = useGame()
    const [scene, setScene] = useState(null)
    const [text, setText] = useState("")

    const changeScene = () => {
        if (!scene) return
        scene.changeScene()
    }

    const currentScene = scene => {
        setScene(scene)
        if (scene.scene.key === "MainMenu") {
            setText("Menu principal");
        } else if (scene.scene.key === "Game") {
            setText("Dude");
        }
    }

    return <div className="columna">
        <div className="columna__arriba">
            <h1 className="titulo-principal">{text}</h1>
        </div>
        <div className="columna__abajo">
            <div className="columna__izquierda">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
            <div className="columna__derecha">
                <div className="centro-control">
                    <button disabled={false} className="button" onClick={changeScene} >Play</button>
                    <button disabled={false} className="button" onClick={onToggleMusica} >Música fondo</button>
                </div>
            </div>
        </div>
    </div>
}

export default App