import React,{useState} from 'react'
import { api } from '../Api';

// Search for all the jobs on the system
function DisplayMaintenance() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);

    const[submitted,setSubmitted] = useState([]);
    const[inProgress,setInProgress] = useState([]);
    const[completed,setCompleted] = useState([]);

    // Fetch the data from the API
    function componentDidMount() {

        const method = "GET";

        // Fetch SUBMITTED data from API and update
        let data = "SUBMITTED";
        api(`/maintenance/${data}`,method)
        .then(result => {
            setSubmitted(result);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        });  

        // Fetch IN PROGRESS data from API and update
        data = "IN PROGRESS";
        api(`/maintenance/${data}`,method)
        .then(result => {
            setInProgress(result);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        });

        // Fetch COMPLETED data from API and update
        data = "COMPLETED";
        api(`/maintenance/${data}`,method)
        .then(result => {
            setCompleted(result);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        });
    }

    // If not started yet, return button to start search
    if(started === false){
        return(<button className='options-Button' onClick={() =>{ componentDidMount(); setStarter(true)}}>SEARCH ALL JOBS</button>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Show all Maintenance jobs on the system split up by status
        return(
            <div>
                <h2>DISPLAY ALL THE JOBS:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>TITLE</th><th>DATE CREATED</th><th>DESCRIPTION</th><th>BUILDING</th><th>STREET</th><th>CITY</th><th>PRIORITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7}><b>SUBMITTED</b></td>
                        </tr>

                        {submitted.map((element, index) =>{
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

                        <tr>
                            <td colSpan={7}><b>IN PROGRESS</b></td>
                        </tr>

                        {inProgress.map((element, index) =>{
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
                        
                        <tr>
                            <td colSpan={7}><b>COMPLETED</b></td>
                        </tr>

                        {completed.map((element, index) =>{
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

export default DisplayMaintenance