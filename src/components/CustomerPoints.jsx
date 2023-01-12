const CustomerPoints = ({ id, customerId, timestamp, amount }) => {
  return (
    <>
      <div>Transaction ID: {id}</div>
      <div>Customer ID: {customerId}</div>
      <div>Timestamp: {timestamp}</div>
      <div>Transaction Amount: {amount}</div>
    </>
  );
}

export default CustomerPoints;
