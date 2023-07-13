import Datagrid from "./Datagrid";
import Tabform from "./Tabform";

function App() {
  return (
    <div className="App" style={{padding:'20px'}}>
       <h1>Data View Screen (Grid)</h1>
       <Datagrid/>
       <br/><br/><br/>
       <h1>Data Entry Form</h1>
       <Tabform/>
       <br/><br/><br/>
       <br/><br/><br/>
       <br/><br/><br/>
    </div>
  );
} 
export default App;