import constants from './config/constants.js'

import PreBootScene from './scenes/ui/preboot.js'
import BootScene from './scenes/ui/boot.js'

import SplashScene from './scenes/ui/splash.js'
import MadeWithScene from './scenes/ui/madeWith.js'

import CreditsScene from './scenes/ui/credits.js'

import HUDGameScene from './scenes/game/HUDGame.js'
import GameScene from './scenes/game/game.js'

import PauseScene from './scenes/ui/pause.js'

import getSceneManager from './managers/sceneManager.js'
// import getDataManager from './managers/dataManager'
import getTimeManager from './managers/timeManager.js'


import gs from './config/gameStats.js'
// import tunner from './utils/tunner'
// import serverConnector from './utils/serverConnector'
import Phaser from 'phaser'
import { useEffect } from 'react'


export default function Game() {
    useEffect(() => {
        // load Data
        getTimeManager().start()

        const game = new Phaser.Game({
            type: Phaser.WEBGL,
            width: constants.WIDTH,
            height: constants.HEIGHT,
            parent: document.getElementById('gameContainer'),
            canvas: document.getElementById('game'),
            backgroundColor: constants.BACKGROUND_COLOR,
            scale: {
                parent: '.gameContainer',
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [
                PreBootScene,
                BootScene,
                SplashScene,
                MadeWithScene,
                CreditsScene,
                HUDGameScene,
                GameScene,
                PauseScene
            ]
        })

        // init managers
        getSceneManager(game.scene)

        setTimeout(() => {
            document.querySelector('canvas').focus()
            window.focus()
            document.querySelector('canvas').oncontextmenu = function (e) {
                e.preventDefault()
            }
        }, 1000)


        // how it works with game context?
        if (constants.DAT_GUI_ENABLE) {
            gs.setListener('game.backgroundColor', (val) => {
                let color = Phaser.Display.Color.HexStringToColor(val)
                game.renderer.config.backgroundColor = color
            })

            gs.setListener('scene.restart', () => {
                gs.stats.scene.restart = false
                getSceneManager().restartScene()
            })

            gs.setListener('scene.current', (val) => {
                getSceneManager().changeToScene(val)
            })
        }
    }, [])

    return (
        <div id="gameContainer" className="gameContainer">
            <canvas id="game"></canvas>
        </div>
    )
}
