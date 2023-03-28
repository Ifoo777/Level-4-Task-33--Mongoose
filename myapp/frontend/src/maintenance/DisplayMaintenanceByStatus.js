import React,{useState} from 'react'
import { api } from '../Api';

// Search Jobs by Status
function DisplayMaintenanceByStatus() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);

    const[addStatus,setAddStatus] = useState("SUBMITTED");
    const[statusData,setStatusData] = useState([]);

    // Fetch the data from the API by entered status
    function componentDidMount(addStatus) {
        const method = "GET";

        // Fetch data from API
        api(`/maintenance/${addStatus}`,method)
        .then(result => {
            setStatusData(result);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        });  

    }

    // If not started yet, return button to start search
    // Give drop down list with options to search
    if(started === false){
        return(
            <div>
                <select className='displayStatusInput' name="status" onChange={e => {setAddStatus(e.target.value)}}>
                    <option value="SUBMITTED"></option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <br/>     
                <button className='options-Button' onClick={() =>{ componentDidMount(addStatus); setStarter(true)}}>SEARCH JOBS BY STATUS</button>
            </div>
        )
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Show all Maintenance jobs on the system
        return(
            <div>
                <h2>DISPLAY ALL THE JOBS BY STATUS:</h2>
                <table>
                    <thead>
                        <tr>
                        <th>TITLE</th><th>DATE CREATED</th><th>DESCRIPTION</th><th>BUILDING</th><th>STREET</th><th>CITY</th><th>PRIORITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7}><b>{addStatus}</b></td>
                        </tr>

                        {statusData.map((element, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{element.title}</td>
                                    <td>{element.dateCreated}</td>
                                    <td>{element.description}</td>
                                    <td>{element.address.building}</td>
                                    <td>{element.address.street}</td>
                                    <td>{element.address.city}</td>
                                    <td>{element.priority}/10</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <button className='options-Button' onClick={() =>{ setStarter(false)}}>CLOSE SEARCH</button>
            </div>
        )
    }
}

export default DisplayMaintenanceByStatus