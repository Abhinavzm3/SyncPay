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
                Paid by {memberNameById[expense.paidBy]} • split between{' '}
                {expense.participants.map((memberId) => memberNameById[memberId]).join(', ')}
              </p>
            </div>
            <span>₹{expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseTimeline;
