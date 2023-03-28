import React,{useState} from 'react'
import { api } from '../Api';

// Update the Maintenance Jobs
function UpdateMaintenance() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[displayEdit, setDisplayEdit]= useState(false); 
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    
    // Store values to edit single specific job information
    const[id,setId] = useState("");
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[priority,setPriority] = useState(10);
    const[status,setStatus] = useState("SUBMITTED");
    const[building,setBuilding] = useState("");
    const[street,setStreet] = useState("");
    const[city,setCity] = useState("");

    // Different statuses get results to display
    const[submitted,setSubmitted] = useState([]);
    const[inProgress,setInProgress] = useState([]);
    const[completed,setCompleted] = useState([]);

    // Keeps values of all the Statuses to be updated
    const[statusUpdate,setStatusUpdate] = useState([]);
    const[addMaintenance,setAddMaintenance] = useState([])

    // Update status if changed or Add to list status to update
    function updateStatus(id, status){
        let statusList = statusUpdate;
        let data = {id:id, status:status};

        let statusInObject = false
        for(let i in statusList){
            if(statusList[i].id ===id){
                statusList[i] = data;
                statusInObject = true;
            }
        }
        if(!statusInObject){
            statusList.push(data);
        }
        setStatusUpdate(statusList)
    }

    // Fetch the data from the API to display all the jobs for each status
    function componentDidMountDisplay() {
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
            setDisplayEdit(true);
        });
    }

    // Fetch Data for a specific job by ID
    function componentDidMountDisplayOne(id) {
        const method = "GET";
        
        // Fetch data from API by ID and update all the fields
        api(`/maintenancejob/${id}`,method)
        .then(result => {
            setId(result._id)
            setTitle(result.title);
            setDescription(result.description);
            setPriority(result.priority);
            setStatus(result.status);
            setBuilding(result.address.building);
            setStreet(result.address.street);
            setCity(result.address.city);
            setDisplayEdit(true);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        });     
    }

    // Update data for a specific ID with the API
    function componentDidMountUpdate(id, title,description,priority,status,building,street,city) {

        //Method Put(Update)
        let method = "PUT";
        
        // Structure data correct format
        let data = {id:id, title:title, description:description, priority:priority, status:status, building:building, street:street, city:city}
        
        // Fetch data from API and update
        api(`maintenancejob/`,method,data )
        .then(result => {
            setAddMaintenance(result);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // Update a group of statuses by IDs
    function componentDidMountUpdateStatus(statusUpdate) {

        //Method Put(Update)
        let method = "PUT";

        // Structure data correct format - Status Update holds an array of values
        let data = {data:statusUpdate}

        // Fetch data from API and update
        api(`maintenancestatus/`,method,data )
        .then(result => {
            setAddMaintenance(addMaintenance);
            setAddMaintenance(result);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // Archive a specific job by ID number or all completed jobs if id = 0
    function componentDidMountUpdateArchive(id) {

        //Method Put(Update)
        let method = "PUT";

        // Structure data correct format
        let data = {id:id}
            
        // Fetch data from API and update
        api(`maintenancearchive/`,method, data)
        .then(result => {
            setAddMaintenance(result);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }
  

    // If started is false, display start button
    if(started === false){
        return(
        <button className='options-Button' onClick={() =>{ setStarter(true); componentDidMountDisplay()}}>EDIT / UPDATE</button>
        )
    }
    else if(displayEdit === false){
        // Return result of all the Jobs and buttons to Edit
        return(
            <div>
                <h2>ALL JOBS:</h2>   
                <table>
                    <thead>
                        <tr>
                        <th>TITLE</th><th>DATE CREATED</th><th>PRIORITY</th><th>DESCRIPTION</th><th>CITY</th><th>EDIT STATUS</th><th>EDIT JOB</th><th>ARCHIVE JOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8}><b>SUBMITTED</b></td>
                        </tr>

                        {submitted.map((element, index) =>{
                            return(
                            <tr key={index}>
                                <td>{element.title}</td>
                                <td>{element.dateCreated}</td>
                                <td>{element.priority}</td>
                                <td>{element.description}</td>
                                <td>{element.address.city}</td>
                                <td>     
                                    <select name="status" onChange={e => {updateStatus(element._id, e.target.value)}}>
                                        <option value={element.status}></option>
                                        <option value="SUBMITTED">SUBMITTED</option>
                                        <option value="IN PROGRESS">IN PROGRESS</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>
                                </td>
                                <td><button onClick={() =>{ componentDidMountDisplayOne(element._id)}}>EDIT JOB</button></td>
                                <td><button onClick={() =>{ componentDidMountUpdateArchive(element._id); setDisplayEdit(false); setStarter(false)}}>ARCHIVE</button></td>
                            </tr>
                            )
                        })}

                        <tr>
                            <td colSpan={8}><b>IN PROGRESS</b></td>
                        </tr>

                        {inProgress.map((element, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{element.title}</td>
                                    <td>{element.dateCreated}</td>
                                    <td>{element.priority}</td>
                                    <td>{element.description}</td>
                                    <td>{element.address.city}</td>
                                    <td>     
                                        <select name="status" onChange={e => {updateStatus(element._id, e.target.value)}}>
                                            <option value={element.status}></option>
                                            <option value="SUBMITTED">SUBMITTED</option>
                                            <option value="IN PROGRESS">IN PROGRESS</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                        </select>
                                    </td>
                                    <td><button onClick={() =>{ componentDidMountDisplayOne(element._id)}}>EDIT JOB</button></td>
                                    <td><button onClick={() =>{ componentDidMountUpdateArchive(element._id); setDisplayEdit(false); setStarter(false)}}>ARCHIVE</button></td>
                                </tr>
                            )
                        })}
                        
                        <tr>
                            <td colSpan={8}><b>COMPLETED</b></td>
                        </tr>

                        {completed.map((element, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{element.title}</td>
                                    <td>{element.dateCreated}</td>
                                    <td>{element.priority}</td>
                                    <td>{element.description}</td>
                                    <td>{element.address.city}</td>
                                    <td>     
                                    <select name="status" onChange={e => {updateStatus(element._id, e.target.value)}}>
                                        <option value={element.status}></option>
                                        <option value="SUBMITTED">SUBMITTED</option>
                                        <option value="IN PROGRESS">IN PROGRESS</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>
                                    </td>
                                    <td><button onClick={() =>{ componentDidMountDisplayOne(element._id)}}>EDIT JOB</button></td>
                                    <td><button onClick={() =>{ componentDidMountUpdateArchive(element._id); setDisplayEdit(false); setStarter(false)}}>ARCHIVE</button></td>
                                </tr>
                            )
                         })}                      
                    </tbody>

                </table>
                <button className='options-Button' onClick={() =>{ componentDidMountUpdateArchive(0); setDisplayEdit(false); setStarter(false)}}>ARCHIVE ALL COMPLETED JOBS</button>
                <button className='options-Button' onClick={() =>{ componentDidMountUpdateStatus(statusUpdate); setDisplayEdit(false); setStarter(false); setStatusUpdate([])}}>UPDATE ALL STATUSES</button>
                <br/><br/>
                <button className='options-Button' onClick={() =>{ setDisplayEdit(false); setStarter(false)}}>CLOSE INFORMATION</button>
                <br/><br/>
            </div>
        )
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Display a specific Job to edit the specific fields of the job
      return(<div>
        <h2>EDIT THE JOB</h2>
        <table>
            <tbody>
                <tr>
                    <td>JOB TITLE:</td>
                    <td><input name="title" type="text" onChange={e => {setTitle(e.target.value)}} value={title}/></td>
                </tr>
                <tr>
                    <td>DESCRIPTION:</td>
                    <td><input name="description" type="text" onChange={e => {setDescription(e.target.value)}} value={description}/></td>
                </tr>
                <tr>
                    <td>PRIORITY:</td>
                    <td>
                        <output>{priority}</output><br/>
                        <input type="range" name="priority" min="0" max="10" onChange={e => {setPriority(e.target.value)}} value={priority}/>
                    </td>
                </tr> 
                <tr>
                    <td>STATUS:</td>
                    <td>
                        <select name="status" onChange={e => {setStatus(e.target.value)}} value={status}>
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
                    <td><input name="building" type="text" onChange={e => {setBuilding(e.target.value)}} value={building}/></td>
                </tr>
                <tr>
                    <td>STREET:</td>
                    <td><input name="street" type="text" onChange={e => {setStreet(e.target.value)}} value={street}/></td>
                </tr>
                <tr>
                    <td>CITY:</td>
                    <td><input name="city" type="text" onChange={e => {setCity(e.target.value)}} value={city}/></td>
                </tr>            
            </tbody>
        </table>

        <button className='options-Button' onClick={() =>{ componentDidMountUpdate(id,title,description,priority,status,building,street,city); setStarter(false); setDisplayEdit(false)}}>SAVE JOB EDIT</button>
        <br/>
        <button className='options-Button' onClick={() =>{ setStarter(false); setDisplayEdit(false)}}>CANCEL</button>
        <br/><br/>
    </div>)
    }
}

export default UpdateMaintenance