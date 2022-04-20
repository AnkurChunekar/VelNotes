import { useState } from "react";
import "./FilterRow.css";

export function FilterRow() {
  const [filtersMenuVisible, setFiltersMenuVisible] = useState(false);

  return (
    <section className="notes-filters flex ai-center jc-space-b">
      <div className="chips-container flex">
        <button className="chip active">All</button>
        <button className="chip">Work</button>
        <button className="chip">Study</button>
        <button className="chip">Travel</button>
      </div>
      <div className="filter-container">
        <button
          onClick={() =>
            setFiltersMenuVisible((filtersMenuVisible) => !filtersMenuVisible)
          }
          className="filter-btn"
        >
          <i className="fa-solid fa-arrow-up-wide-short" />
          <span className="m-xxs m-tb0 fs-4"> Filters </span>
        </button>

        {filtersMenuVisible ? (
          <div className="filter-menu p-s">
            <header className="flex ai-center jc-space-b">
              <h3 className="fw-600">Filters</h3>
              <button className="btn btn-primary btn-outline">Clear</button>
            </header>
            <section>
              <h5 className="fw-600 m-s m-rl0">Priority</h5>
              <div className="radio m-xs">
                <input type="radio" name="priority" id="low-to-high" />
                <label className="m-xxs" htmlFor="low-to-high">Low To High</label>
              </div>
              <div className="radio m-xs">
                <input type="radio" name="priority" id="high-to-low" />
                <label className="m-xxs" htmlFor="high-to-low"> High To Low </label>
              </div>
            </section>
            <section>
              <h5 className="fw-600 m-s m-rl0">Date of Updation</h5>
              <div className="radio m-xs">
                <input type="radio" name="date" id="new" />
                <label className="m-xxs" htmlFor="new">Newest First</label>
              </div>
              <div className="radio m-xs">
                <input type="radio" name="date" id="old" />
                <label className="m-xxs" htmlFor="old"> Oldest First </label>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </section>
  );
}
