import { Route, Routes } from "react-router-dom";
import s from "./app.module.css"
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <div className={s.container}>
        <Routes>
          <Route path='/*' element={<Auth />} /> 
          <Route path='/register/*' element={<Register />} /> 
          <Route path='/main/*' element={<MainPage />} /> 
        </Routes>
    </div>
  );
}

export default App;
