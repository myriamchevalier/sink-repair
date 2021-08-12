import { getRequests } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    
    const requestListElement = (request) => {  
            return `<li>${request.description}</li>`
        }
    let html = `
        <ul>
            ${
                requests.map(requestListElement).join("")  //.map iterates through the array, and uses the callback function to get an argument(the parameter of the cb function)
            }
        </ul>
    `
    
    return html
}

