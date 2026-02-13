const StatsCards = ({ stats }) => {
  const cards = [
    { label: 'Total Spent', value: `₹${stats.totalSpent.toFixed(2)}` },
    { label: 'Expenses', value: stats.expenseCount },
    { label: 'Travel Buddies', value: stats.memberCount },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <article key={card.label} className="glass-card stat-card">
          <p>{card.label}</p>
          <h3>{card.value}</h3>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
