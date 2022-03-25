import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import { Button, Stack } from "react-bootstrap";

interface Props {
  setShowAddBudgetModal: (bool:boolean) => void;
  openAddExpenseModal: (budgetId:any) => void;
}

const Header: React.FC<Props> = ({ setShowAddBudgetModal,openAddExpenseModal }) => {

  return (
    <div className="header">
        
        <div className="header_logo">
            <PaidIcon className="logo"/>
            <span className="logo_Name">WISEFUL</span>
        </div>

        <Stack className= "category_expense" direction="horizontal">
            <Button className="category_Button" variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Category</Button>
            <Button className="expense_Button" variant="outline-dark" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>

        <div className="login">
             <span className="login_text">Login</span>
            <AccountCircleIcon />
        </div>
        
    </div>
  )
}
export default Header