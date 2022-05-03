import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import App from "./App";
import "./index.css";
import {
  AuthProvider,
  NotesProvider,
  TrashProvider,
  ArchiveProvider,
  TagsProvider,
  FilterProvider,
} from "./context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <TrashProvider>
            <ArchiveProvider>
              <TagsProvider>
                <FilterProvider>
                  <App />
                </FilterProvider>
              </TagsProvider>
            </ArchiveProvider>
          </TrashProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
