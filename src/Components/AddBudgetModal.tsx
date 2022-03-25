import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudget } from "../Contexts/Budget";
import IBudget from "../Interfaces/Budget";

interface IBudgetModal {
  show: boolean;
  handleClose: () => void;
}

export default function AddBudgetModal({ show, handleClose }: IBudgetModal) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);
  const { addBudget } = useBudget();
  
  function handleSubmit(e: any) {
    e.preventDefault()
    const budget: IBudget = {
      name: nameRef.current?.value!,
      max: parseFloat(maxRef.current ? maxRef.current.value : ""),
    };

    if (addBudget) {
      addBudget(budget);
    }
    
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title> New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className = "mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className = "mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control ref={maxRef} type="number" required min={0} step={0.01}/>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
