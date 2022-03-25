import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import IExpense from '../Interfaces/Expense';
import IBudget from '../Interfaces/Budget';
import useLocalStorage from '../Hooks/UseLocalHook';

interface IBudgetContext{
    budgets: IBudget[];
    expenses: IExpense[];
    getBudgetExpenses?: (budgetId: string) => IExpense[];
    addExpense?: (expense: IExpense) => void;
    addBudget?: (budget: IBudget) => void;
    deleteBudget?: (budget: IBudget) => void;
    deleteExpense?: (expense: IExpense) => void;
}
const defaultState = {
    budgets: [],
    expenses: [],
}
const BudgetsContext = React.createContext<IBudgetContext>(defaultState);

export function useBudget() {
    return useContext(BudgetsContext)
}
type Props = {
    children: any
}

export const BudgetsProvider = ({ children }: Props ) => {

    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId: string) {
        return expenses.filter((expense: IExpense) => expense.budgetId === budgetId)
    }
    function addExpense( { description, amount, budgetId }: IExpense){
         setExpenses((prevExpenses: IExpense[]) => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    function addBudget( { name, max }: IBudget ){
        setBudgets((prevBudgets: IBudget[]) => {
            if (prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}] 
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
        }}>{children}</BudgetsContext.Provider>
    )

}
