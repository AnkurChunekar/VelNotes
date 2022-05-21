import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Landing,
  Login,
  Signup,
  MainWrapper,
  Notes,
  Archive,
  Trash,
  TagPage,
  Error404,
} from "./pages";
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
        <MainWrapper>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/notes"
              element={
                <RequiresAuth>
                  <Notes />
                </RequiresAuth>
              }
            />
            <Route
              path="/archive"
              element={
                <RequiresAuth>
                  <Archive />
                </RequiresAuth>
              }
            />
            <Route
              path="/trash"
              element={
                <RequiresAuth>
                  <Trash />
                </RequiresAuth>
              }
            />
            <Route
              path="/tags/:tagName"
              element={
                <RequiresAuth>
                  <TagPage />
                </RequiresAuth>
              }
            />
            <Route
              path="*"
              element={
                <RequiresAuth>
                  <Error404 />
                </RequiresAuth>
              }
            />
          </Routes>
        </MainWrapper>
      </div>
    </>
  );
}

export default App;
