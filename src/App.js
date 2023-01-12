import './App.css';
import { useState, useEffect } from 'react';
import { getCustomers } from './api';
import Customer from './components/Customer';

const App = () => {
  const [customers, setCustomers] = useState([]);

  const getPageData = async () => {
    const customers = await getCustomers();
    setCustomers(customers);
  }

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <div className="App">
      <section className="container">
        {customers.map(customer => {
          return (
            <Customer key={customer.id} customerId={customer.id} />
          );
        })}
      </section>
    </div>
  );
}

export default App;
