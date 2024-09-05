import { Filters } from "./componenets/Filters/Filters";
import { Users } from "./componenets/Users/Users";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <Filters />
      <Users />
    </div>
  );
}

export default App;
