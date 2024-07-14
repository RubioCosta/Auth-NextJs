import { useContext } from "react";

// Context
import AppContext from "../context/AppContex";

const useAppData = () => useContext(AppContext);

export default useAppData;