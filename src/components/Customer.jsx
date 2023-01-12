import { useState, useEffect } from 'react';
import { getTransactions } from '../api';
import compileCustomerData from '../utils/compileCustomerData';

const Customer = ({ customerId }) => {
  const [customerData, setCustomerData] = useState({});

  const getPageData = async () => {
    const transactions = await getTransactions(customerId);
    const data = compileCustomerData(transactions);
    setCustomerData(data);
  }

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <section className="customer">
      <section className="table">
        <h2>{customerData.username}</h2>
        <div className="th">
          <div>Date</div>
          <div>Amount</div>
          <div>Points Earned</div>
        </div>
        {customerData.transactions &&
        customerData.transactions.length > 0 &&
        customerData.transactions.map(t => {
          return (
            <div key={t.id} className="tr">
              <div>{t.date}</div>
              <div>${t.amount}</div>
              <div>{t.points}</div>
            </div>
          );
        })}
      </section>

      <section className="totals">
        <div className="monthTotals">
          <h3>Monthly Points Totals</h3>
          {customerData.monthTotals &&
          customerData.monthTotals.length > 0 &&
          customerData.monthTotals.map(m => {
            return (
              <div>{m.name}: {m.points}</div>
            );
          })}
        </div>

        <div>
          <h3>Total Spent</h3>
          <p className="total">${customerData.totalSpent}</p>
        </div>

        <div>
          <h3>Total Points</h3>
          <p className="total">{customerData.totalPoints}</p>
        </div>
      </section>
    </section>
  );
}

export default Customer;
