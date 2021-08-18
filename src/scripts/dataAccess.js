const applicationState = {  //Stores the data we fetch below, for easy access (see getter methods)
    requests : []
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")


// This function sends a request to the API to fetch data (in this case, requests.)
// Stored permanent state in the API variable, so we're using that in our return statement 
// instead of using the whole http address. That first line of the return statement only returns a 
// promise. THEN, we use then(res => res.json()), which **almost** allows us to use the data.
// THEN, we use another .then to STORE that data in our local app (here, applicationState)
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
// This function posts new content to our API database (POST method). First, we store some instructions in a variable (here, fetchOptions)
// Afterwards, we return a fetch request that includes our fetchOptions.
// .then(res => res.json())
// .then we dispatch to a custom event listener, so it runs when we get the data back

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


//This function deletes a **specific** request, which is why it takes a unique identifier as an argument. 
//in our fetch request, we specify that we're specifically looking for an id, that we want to use the method DELETE on it.
//.then, dispatch to custom event listener.

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}



//This function exports the permanent state of our application. We got that permanent state by fetching it from a json server, and stored it in our application using fetch()
//applicationState.requests is where we have stored our array of requests.
// With the export function getRequests(), we can access that data from other modules in the app 
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

