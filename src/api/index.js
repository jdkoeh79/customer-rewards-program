import transactions from '../data/transactions';
import customers from '../data/customers';

// Mock API calls to fetch transactions and customers from an external data source/database

export const getTransactions = (customerId) => {
  return new Promise(resolve => setTimeout(() => {
    resolve(transactions.filter(t => t.customerId === customerId));
  }), 2000);
}

export const getCustomers = () => {
  return new Promise(resolve => setTimeout(() => {
    resolve(customers);
  }), 500);
}

export default {
  getTransactions,
  getCustomers
}
