import { createContext, Component } from "react";

export const CustomerContext = createContext({});

class CustomerContextProvider extends Component {
  state = {
    currentAuto: "",
    currentCustomer: "",
  };

  /*   render() {
    return (
      <CustomerContext.Provider value={value}>
        {children}
      </CustomerContext.Provider>
    );
  } */
}

export default CustomerContextProvider;
