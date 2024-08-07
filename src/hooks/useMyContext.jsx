import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const useMyContext = () => {
  const DataContext = useContext(AuthContext);
  return DataContext;
};

export default useMyContext;
