import customers from '../data/customers';

export const compileCustomerData = (transactions) => {
  let rawData = transactions;
  const { customerId } = transactions[0];
  let totalPoints = 0;
  let totalSpent = 0;

  const compiledData = rawData.map(t => {
    const points = calculatePoints(t.amount);
    totalPoints += points;
    totalSpent += t.amount;

    // Pull just the date from the timestamp since our sample data only contains one transaction per date.
    // This would have to be reworked for use with real world data.
    const ts = new Date(t.timestamp);
    const date = `${ts.getUTCMonth() + 1}/${ts.getUTCDate()}/${ts.getUTCFullYear()}`;

    return {
      ...t,
      date,
      points,
    }
  });

  const monthTotals = compileMonthlyTotals(compiledData);

  const data = {
    username: customers.find(c => c.id === customerId).username,
    transactions: compiledData,
    totalSpent,
    monthTotals,
    totalPoints
  }

  return data;
}

const calculatePoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += 2 * (amount - 100);
    amount = 100;
  }

  if (amount > 50) {
    points += 1 * (amount - 50);
  }

  return Math.floor(points);
}

const compileMonthlyTotals = (transactions) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const totals = [];

  transactions.forEach(t => {
    const ts = new Date(t.timestamp);
    const monthName = months[ts.getUTCMonth()];

    if (!totals.find(m => m.name === monthName)) {
      totals.push({
        name: monthName,
        points: t.points
      });
    } else {
      totals[totals.findIndex(m => m.name === monthName)].points += t.points;
    }
  });

  return totals;
}

export default compileCustomerData;
