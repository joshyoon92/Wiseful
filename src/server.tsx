import data from "./data.json";

/*
    You can use the mock transactions in data.json or mock your own (or edit ours)!
    
    You can also integrate a bank API like Plaid @ https://plaid.com/docs/sandbox. 
    We have keys for Plaid and will be able to test your solution. 
*/
export async function loadDataFromServer() {
  if (Math.random() > .95) {
    throw new Error();
  }
  return data;
}