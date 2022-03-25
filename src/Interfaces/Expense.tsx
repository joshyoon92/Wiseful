export default interface IExpense {
    id?: string;
    budgetId: string;
    description: string;
    amount: number;
}