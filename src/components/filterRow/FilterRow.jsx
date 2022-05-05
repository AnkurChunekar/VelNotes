import { useState } from "react";
import { useTags, useFilter } from "../../context";
import { capitalizeString } from "../../helpers";
import "./FilterRow.css";

export function FilterRow() {
  const [filtersMenuVisible, setFiltersMenuVisible] = useState(false);

  const {
    tagsState: { tags },
  } = useTags();

  const { filterState, filterDispatch } = useFilter();

  const priorityChangeHandler = (e) => {
    filterDispatch({
      type: "UPDATE_PRIORITY",
      payload: { priority: e.target.id },
    });
  };

  const sortByDateChangeHandler = (e) => {
    filterDispatch({
      type: "UPDATE_SORT_BY_DATE",
      payload: { sortByDate: e.target.id },
    });
  };

  const toggleTagChangeHandler = (e) => {
    filterDispatch({
      type: "TOGGLE_TAG",
      payload: { tagName: e.target.name },
    });
  };


  return (
    <div className="filter-container">
      <button
        onClick={() =>
          setFiltersMenuVisible((filtersMenuVisible) => !filtersMenuVisible)
        }
        className="filter-btn"
      >
        <i className="fa-solid fa-arrow-up-wide-short" />
        <span className="m-xxs m-tb0">Filters</span>
      </button>

      {filtersMenuVisible ? (
        <div className="filter-menu p-s">
          <header className="flex ai-center jc-space-b">
            <h3 className="fw-600">Filters</h3>
            <button
              onClick={() => filterDispatch({ type: "RESET" })}
              className="btn btn-secondary"
            >
              Clear
            </button>
          </header>

          <div className="flex ai-start container">
            <section className="sort-section">
              <h5 className="fw-600">Priority</h5>
              <div className="radio">
                <input
                  checked={filterState.priority === "low-to-high"}
                  type="radio"
                  name="priority"
                  id="low-to-high"
                  onChange={priorityChangeHandler}
                />
                <label className="m-xxs" htmlFor="low-to-high">
                  Low To High
                </label>
              </div>
              <div className="radio">
                <input
                  checked={filterState.priority === "high-to-low"}
                  type="radio"
                  name="priority"
                  id="high-to-low"
                  onChange={priorityChangeHandler}
                />
                <label className="m-xxs" htmlFor="high-to-low">
                  High To Low
                </label>
              </div>

              <h5 className="fw-600">Date of Updation</h5>
              <div className="radio">
                <input
                  onChange={sortByDateChangeHandler}
                  checked={filterState.sortByDate === "newest-first"}
                  type="radio"
                  name="date"
                  id="newest-first"
                />
                <label className="m-xxs" htmlFor="newest-first">
                  Newest First
                </label>
              </div>
              <div className="radio">
                <input
                  onChange={sortByDateChangeHandler}
                  checked={filterState.sortByDate === "oldest-first"}
                  type="radio"
                  name="date"
                  id="oldest-first"
                />
                <label className="m-xxs" htmlFor="oldest-first">
                  Oldest First
                </label>
              </div>
            </section>

            <section className="tags-section">
              <h5 className="fw-600">Select Tags</h5>
              <ul className="list list-style-none">
                {tags.map(({ tagName, id }) => (
                  <li key={id}>
                    <input
                      onChange={toggleTagChangeHandler}
                      checked={filterState.tags.includes(tagName)}
                      name={tagName}
                      type="checkbox"
                      id={id}
                    />
                    <label htmlFor={id}> {capitalizeString(tagName)} </label>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
}
