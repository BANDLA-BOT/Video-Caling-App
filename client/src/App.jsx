import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import CallPage from "./components/CallPage";
import HomePage from "./components/HomePage";
import NoMatch from "./components/NoMatch";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/:id" element={<CallPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
