const BalanceBoard = ({ members, settlements }) => (
  <section className="glass-card">
    <h3>Net balance by person</h3>
    <ul className="balance-list">
      {members.map((member) => (
        <li key={member.id}>
          <span className="member-pill">
            <i style={{ backgroundColor: member.avatarColor }} />
            {member.name}
          </span>
          <span className={member.net >= 0 ? 'positive' : 'negative'}>
            {member.net >= 0 ? `+₹${member.net.toFixed(2)}` : `-₹${Math.abs(member.net).toFixed(2)}`}
          </span>
        </li>
      ))}
    </ul>

    <h4>Who pays whom</h4>
    <ul className="settlement-list">
      {settlements.length === 0 && <li>All settled 🎉</li>}
      {settlements.map((row, index) => (
        <li key={`${row.from}-${row.to}-${index}`}>
          <strong>{row.fromName}</strong> pays <strong>{row.toName}</strong> <span>₹{row.amount.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default BalanceBoard;
