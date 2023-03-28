// Use One centralized API function for all the methods
// Fetch data from API
export const api = (url, dataMethod, data) =>{
    
    return fetch(url, {
        method: dataMethod,
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
    })
    .then(response => response.json()); // parses response to JSON           
};
