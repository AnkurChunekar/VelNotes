import { createContext, useContext, useReducer } from "react";
import { initialFilterState, filterReducer } from "../reducers";

const FilterContext = createContext(initialFilterState);

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
