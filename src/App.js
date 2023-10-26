import { Route, Routes } from "react-router-dom";
import s from "./app.module.css"
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    <div className={s.container}>
        <Routes>
          <Route path='/*' element={<Auth />} /> 
          <Route path='/register/*' element={<Register />} /> 
        </Routes>
    </div>
  );
}

export default App;
