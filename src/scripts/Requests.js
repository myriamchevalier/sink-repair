import { getRequests } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    
    const requestListElement = () => {
        for (const request of requests){  
            return `<li>${request.description}</li>`
        }
    }
    let html = `
        <ul>
            ${
                requests.map(requestListElement).join("")
            }
        </ul>
    `

    return html
}

