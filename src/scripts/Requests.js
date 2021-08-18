import { getRequests } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    
    //function below takes request as a parameter, and is invoked within our .map method (which iterates through the requests array). This is why there is no need for a forof loop, it would be redundant. Did not understand that at first.
    const requestListElement = (request) => {  
        return `
        <li>
            ${request.description}
            <button class="request__delete"
                    id="request--${request.id}">
                Delete
            </button>
        </li>
        `
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

