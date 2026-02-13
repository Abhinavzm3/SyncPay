const ExpenseTimeline = ({ expenses, members }) => {
  const memberNameById = Object.fromEntries(members.map((member) => [member.id, member.name]));

  return (
    <section className="glass-card">
      <h3>Trip timeline</h3>
      <ul className="timeline">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <div>
              <strong>{expense.title}</strong>
              <p>
                {expense.category.toUpperCase()} • Paid by {memberNameById[expense.paidBy]} • {new Date(expense.paidAt).toLocaleDateString()}
              </p>
              {expense.note && <small>{expense.note}</small>}
            </div>
            <span>₹{expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseTimeline;
