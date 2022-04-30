import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Landing, Login, Signup, Home, Notes, Archive, Trash } from "./pages";
import { RequiresAuth } from "./components";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme={"dark"}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <RequiresAuth>
                <Home />
              </RequiresAuth>
            }
          >
            <Route path="notes" element={<Notes />} />
            <Route path="archive" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
