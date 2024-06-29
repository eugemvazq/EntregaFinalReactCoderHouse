import Navbar from "./components/Navbar";
import { Outlet as Page } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Page />
      </div>
    </>
  );
}

export default App;
