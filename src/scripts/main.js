import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    mainContainer.innerHTML = SinkRepair()
}

render()

