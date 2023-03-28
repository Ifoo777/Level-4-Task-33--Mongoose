import React,{useState} from 'react'
import { api } from '../Api';

// Add JOBS to the System
function AddMaintenance() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[addJob, setAddJob]= useState(false);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
        
    const[addTitle,setAddTitle] = useState("");
    const[addDescription,setAddDescription] = useState("");
    const[addPriority,setAddPriority] = useState(10);
    const[addStatus,setAddStatus] = useState("SUBMITTED");

    const[addBuilding,setAddBuilding] = useState("");
    const[addStreet,setAddStreet] = useState("");
    const[addCity,setAddCity] = useState("");

    const[addMaintenance,setAddMaintenance] = useState([])
   

    // Post the Data to the API
    function componentDidMount(addTitle,addDescription,addPriority,addStatus,addBuilding,addStreet,addCity) {

        //Method Post(Add)
        let method = "POST";
        
        // Structure data correct format
        let data = {title:addTitle, description:addDescription, priority:addPriority, status:addStatus, building:addBuilding, street:addStreet, city:addCity}
        
        // Fetch data from API and update
        api(`maintenance/`,method,data )
        .then(result => {
            setAddMaintenance(result);
            setIsLoaded(true);

        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // If started/add jobs is false, display input fields
    if(started === false){
        return(<button className='options-Button' onClick={() =>{setStarter(true)}}>ADD A NEW JOB</button>)
    } else if(addJob === false){
        return(<div>
                <h2>ADD A NEW JOB</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>JOB TITLE:</td>
                            <td><input name="title" type="text" onChange={e => {setAddTitle(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>DESCRIPTION:</td>
                            <td><input name="description" type="text" onChange={e => {setAddDescription(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>PRIORITY:</td>
                            <td>
                                <output>{addPriority} / 10</output><br/>
                                <input type="range" name="priority" min="0" max="10" onChange={e => {setAddPriority(e.target.value)}}/>
                            </td>
                        </tr> 
                        <tr>
                            <td>STATUS:</td>
                            <td>   
                                <select name="status" onChange={e => {setAddStatus(e.target.value)}}>
                                    <option value="SUBMITTED">SUBMITTED</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>LOCATION DETAILS</td>
                        </tr>
                        <tr>
                            <td>BUILDING NAME:</td>
                            <td><input name="building" type="text" onChange={e => {setAddBuilding(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>STREET:</td>
                            <td><input name="street" type="text" onChange={e => {setAddStreet(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>CITY:</td>
                            <td><input name="city" type="text" onChange={e => {setAddCity(e.target.value)}}/></td>
                        </tr>
                                      
                    </tbody>
                </table>

                <button className='options-Button' onClick={() =>{ componentDidMount(addTitle,addDescription,addPriority,addStatus,addBuilding,addStreet,addCity); setStarter(true); setAddJob(true); setAddPriority(10)}}>ADD JOB</button>
                <br/>
                <button className='options-Button' onClick={() =>{ setStarter(false); setAddJob(false); setAddPriority(10)}}>CANCEL</button>
                <br/><br/>
            </div>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Return result of Job that was added successfully
        return(
        <div>
            <h2>JOB SUCCESSFULLY ADDED:</h2>   
            <table>
                    <tbody>
                        <tr>
                            <td>JOB TITLE:</td>
                            <td>{addMaintenance.title}</td>
                        </tr>
                        <tr>
                            <td>DESCRIPTION:</td>
                            <td>{addMaintenance.description}</td>
                        </tr>
                        <tr>
                            <td>PRIORITY:</td>
                            <td>{addMaintenance.priority}</td>
                        </tr> 
                        <tr>
                            <td>STATUS:</td>
                            <td>{addMaintenance.status}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><b>LOCATION DETAIL</b></td>
                        </tr>
                        <tr>
                            <td>BUILDING NAME:</td>
                            <td>{addMaintenance.address.building}</td>
                        </tr>
                        <tr>
                            <td>STREET:</td>
                            <td>{addMaintenance.address.street}</td>
                        </tr>
                        <tr>
                            <td>CITY:</td>
                            <td>{addMaintenance.address.city}</td>
                        </tr>           
                    </tbody>
                </table>
            <button className='options-Button' onClick={() =>{ setStarter(false); setAddJob(false)}}>CLOSE INFORMATION</button>
            <br/><br/>
        </div>
      )
    }
}

export default AddMaintenance