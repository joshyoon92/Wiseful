import './App.css';
import { loadDataFromServer } from './server';
import Header from './Header';
import Category from './Components/Category';
import AddBudgetModal from './Components/AddBudgetModal';
import { useEffect, useState } from 'react';
import { useBudget } from './Contexts/Budget';
import AddExpenseModal from './Components/AddExpenseModal';
import Footer from './Footer';

const App: React.FC = () => {

  const [showAddBudgetModal,setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudget()

  function openAddExpenseModal({ budgetId }: any){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)

  }
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadDataFromServer();
    }
    fetchData()
  }, [])

  return (
    <div className="App">
        
      <Header 
        setShowAddBudgetModal={setShowAddBudgetModal} 
        openAddExpenseModal={openAddExpenseModal}
      />

      {budgets.map(budget => {
        const expenses = getBudgetExpenses!(budget.id!)
        const amount = expenses.reduce(
          (total, expense) => total + expense.amount,0)
        return (
          <Category 
            key={budget.id}
            name={budget.name}
            expenses={expenses}
            amount ={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          />
        )
      })}      
      <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <Footer/>
    </div>
  );
}

export default App;
