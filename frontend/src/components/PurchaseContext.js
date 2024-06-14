import React, { createContext, useState } from 'react';

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([
    { id: 1, item: "Ticket A", date: "2023-01-01", price: 35000, showTime: "10:30" },
    { id: 2, item: "Ticket B", date: "2023-02-15", price: 35000, showTime: "12:50" },
    { id: 3, item: "Ticket C", date: "2023-03-10", price: 35000, showTime: "15:00" }
  ]);

  return (
    <PurchaseContext.Provider value={{ purchaseHistory, setPurchaseHistory }}>
      {children}
    </PurchaseContext.Provider>
  );
};
