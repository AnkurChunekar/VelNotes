import { Route, Routes } from "react-router-dom";
import { Landing, Login, Signup, Home, Notes, Archive, Trash } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route path="notes" element={<Notes />} />
          <Route path="archive" element={<Archive />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
