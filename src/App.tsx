import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalIfOpen, setisNewTransactionModalIfOpen] = useState(false);

  // Normalmente quando for fazer uma função que ao clicar em um botão algo abre ou algo do tipo usar o handle
  function handleOpenNewTransactionModal() {
      setisNewTransactionModalIfOpen(true);
  }
  
  function handleCloseNewTransactionModal() {
      setisNewTransactionModalIfOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalIfOpen}
        onRequestClose={handleCloseNewTransactionModal} 
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}