import { useState } from 'react';

const ExpenseForm = ({ members, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);

  const toggleParticipant = (id) => {
    setParticipants((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !amount || !paidBy || participants.length === 0) return;

    onSave({
      title,
      amount: Number(amount),
      paidBy,
      participants,
    });

    setTitle('');
    setAmount('');
    setPaidBy('');
    setParticipants([]);
  };

  return (
    <form className="glass-card form-grid" onSubmit={handleSubmit}>
      <h3>Log an expense</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Dinner / Hotel / Fuel" />
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="">Who paid?</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      <div className="pills">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            className={participants.includes(member.id) ? 'pill selected' : 'pill'}
            onClick={() => toggleParticipant(member.id)}
          >
            {member.name}
          </button>
        ))}
      </div>
      <button type="submit">Save expense</button>
    </form>
  );
};

export default ExpenseForm;
