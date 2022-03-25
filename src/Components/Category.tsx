import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import { currencyFormat } from '../model';

interface Props {
    name: string;
    amount: number;
    max: number;
    expenses: any;
    onAddExpenseClick: () => void;
}

const Category: React.FC<Props> = ({ name, amount, max, expenses = [], onAddExpenseClick }) => {

    return (    
        <div className="category">
            <Card className="card">
                <Card.Body>
                    <Card.Title className="card_title">
                        <div className="title">{name}</div>
                        
                        <div className="number">
                            {currencyFormat.format(amount)} 
                            <span className="mute_number">/ {currencyFormat.format(max)}</span>
                        </div>

                    </Card.Title>
                    <ProgressBar 
                        className="progress_bar"  
                        variant={getProgressBarVariant(amount, max)}
                        min = {0}
                        max = {max}
                        now = {amount} animated
                    />
                    <Stack className= "add_View">
                        <Button 
                            className="addExpense_button" 
                            variant="outline-primary" 
                            onClick={onAddExpenseClick}>
                            Add Expense
                        </Button>
                    </Stack>
                    <ul className="expense">
                        {expenses.map((expense:any) => {
                            return (
                                <li>{expense.description}: $ {expense.amount}</li>
                            )
                        })}
                    </ul>
                </Card.Body>
            </Card>
        </div>
  )
}
function getProgressBarVariant(_amount: number, _max: number){
    const ratio = _amount / _max;
    if (ratio < 0.5) {
        return "primary"
    } else if (ratio < 0.75){
        return "warning"
    }
    return "danger"
}

export default Category