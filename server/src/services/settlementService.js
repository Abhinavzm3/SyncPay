export const calculateBalances = (trip) => {
  const balances = Object.fromEntries(trip.members.map((member) => [member.id, 0]));
  trip.expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;
    balances[expense.paidBy] += expense.amount;
    expense.participants.forEach((participantId) => {
      balances[participantId] -= share;
    });
  });
  return balances;
};

export const buildSettlements = (trip) => {
  const balances = calculateBalances(trip);
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([memberId, amount]) => {
    if (amount > 0.01) creditors.push({ memberId, amount });
    if (amount < -0.01) debtors.push({ memberId, amount: Math.abs(amount) });
  });

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const memberName = Object.fromEntries(trip.members.map((member) => [member.id, member.name]));
  const settlements = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const transfer = Math.min(debtor.amount, creditor.amount);
    settlements.push({
      from: debtor.memberId,
      to: creditor.memberId,
      fromName: memberName[debtor.memberId],
      toName: memberName[creditor.memberId],
      amount: Number(transfer.toFixed(2)),
    });
    debtor.amount -= transfer;
    creditor.amount -= transfer;
    if (debtor.amount <= 0.01) i += 1;
    if (creditor.amount <= 0.01) j += 1;
  }

  return { balances, settlements };
};
