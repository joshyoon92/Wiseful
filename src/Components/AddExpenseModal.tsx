import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudget } from "../Contexts/Budget";
import IExpense from "../Interfaces/Expense";

interface IExpenseModal {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string | undefined;
}

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }: IExpenseModal) {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const budgetIdRef = useRef<HTMLSelectElement | null>(null);
  const { addExpense, budgets } = useBudget();

  function handleSubmit(e: any) {
    e.preventDefault()
    const expense: IExpense = {
        description: descriptionRef.current!.value,
        amount: parseFloat(amountRef.current?.value!),
        budgetId: budgetIdRef.current!.value,
    };
    if (addExpense){
        addExpense(expense)
    }
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title> New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className = "mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className = "mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={0.01}/>
          </Form.Group>
          <Form.Group className = "mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                    {budgets.map(budget => (
                        <option key={budget.id} value={budget.id}>
                            {budget.name}
                        </option>
                    ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
