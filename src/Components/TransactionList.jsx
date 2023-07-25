

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Transactions:</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;