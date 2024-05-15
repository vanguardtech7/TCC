import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
     <Outlet/>
    </div>
  );
}

export default App;
