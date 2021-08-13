const applicationState = {          //Stores the data we fetch below, for easy access (see getter methods)
    requests : []
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


//This function exports the permanent state of our application. We got that permanent state by fetching it from a json server, and stored it in our application using fetch()
//applicationState.requests is where we have stored our array of requests.
// With the export function getRequests(), we can access that data from other modules in the app 
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

