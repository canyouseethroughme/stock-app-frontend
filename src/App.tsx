import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewOrder from "./pages/NewOrder";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userName="Alin"
              barName="Space Bar"
              userType="manager"
              data=""
            />
          }
        />
        <Route path="/new-order" element={<NewOrder barName="Space Bar" />} />
      </Routes>
    </div>
  );
};

export default App;
