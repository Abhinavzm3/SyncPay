import { useState } from 'react';

const MemberForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim() });
    setName('');
  };

  return (
    <form className="glass-card form-grid" onSubmit={handleSubmit}>
      <h3>Add travel buddy</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Friend name"
      />
      <button type="submit">Add friend</button>
    </form>
  );
};

export default MemberForm;
