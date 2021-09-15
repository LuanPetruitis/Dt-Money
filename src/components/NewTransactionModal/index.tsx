import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import './style';
import { Container, TransactionTypeContainer, RadioBox } from './style';

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    // Sempre que for preciso por exemplo guardar onde o usuário clicou usar o useSate, ou seja o estado
    const [type, setType] = useState('deposit');
    
    async function handleCreateNewTransaction(event: FormEvent) {
        // Previnir o funcionamento padrão
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    

    return (
        // O isOpen é usado para controlar a forma como o Modal está.
        // O onRequestClose é para chamar a função que irá fechar o Modal
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-moal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    // Salva o valor digitado
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number" 
                    placeholder="Valor"
                    value={amount}
                    // Salva o valor digitado
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <input  
                    placeholder="Categoria"
                    value={category}
                    // Salva o valor digitado
                    onChange={event => setCategory(event.target.value)}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        // Essa é uma forma de colocar uma classe com condição para ela estar ativa ou não, usando o estado
                        // Não vamos utilizar dessa forma porque quanddo utilizamos o styled components é melhor fazer com propriedade
                        // className={type === 'deposit' ? 'active' : ''}
                        onClick={() => {setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button"
                        onClick={() => {setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>

    );
}