import './App.css';
import DisplayMaintenance from './maintenance/DisplayMaintenance';
import AddMaintenance from './maintenance/AddMaintenance';
import UpdateMaintenance from './maintenance/UpdateMaintenance';
import DisplayMaintenanceByStatus from './maintenance/DisplayMaintenanceByStatus';

function App() {
  return (
    <div className="App">
      <h1>MAINTENANCE MANAGEMENT</h1>
      <hr/>
      <AddMaintenance/>
      <hr/>
      <UpdateMaintenance/>
      <hr/>
      <DisplayMaintenance/>
      <hr/>
      <DisplayMaintenanceByStatus/>
    </div>
  );
}

export default App;
