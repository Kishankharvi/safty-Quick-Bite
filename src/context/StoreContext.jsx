import { createContext, useEffect, useState } from "react";
import { rest_info } from "../assets/resCardsItems";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartIteams, setCartIteams] = useState({});

  const addIteam = (iteamID) => {
    const itemInfo = rest_info.find((product) => product.info.id === iteamID);
    const itemName = itemInfo.info.cuisines;

    setCartIteams((prev) => {
      const newCount = (prev[iteamID] || 0) + 1;
      return { ...prev, [iteamID]: newCount };
    });

    return { itemName, count: (cartIteams[iteamID] || 0) + 1 };
  };

  const removeIteam = (iteamID) => {
    setCartIteams((prev) => {
      const updatedCart = { ...prev, [iteamID]: prev[iteamID] - 1 };
      if (updatedCart[iteamID] <= 0) {
        delete updatedCart[iteamID];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartIteams) {
      if (cartIteams[item] > 0) {
        let itemInfo = rest_info.find((product) => product.info.id === item);
        if (itemInfo && itemInfo.info.costForTwo) {
          const price = parseInt(
            itemInfo.info.costForTwo.replace(/\D/g, ""),
            10
          );
          total += price * cartIteams[item];
        }
      }
    }
    return total;
  };

  const contextValue = {
    rest_info,
    cartIteams,
    setCartIteams,
    addIteam,
    removeIteam,
    getTotalCartAmount,
  };

  useEffect(() => {
    console.log(cartIteams);
  }, [cartIteams]);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
