import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BalanceBoard from './components/BalanceBoard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTimeline from './components/ExpenseTimeline';
import MemberForm from './components/MemberForm';
import { addExpense, addMember, loadTrip } from './features/trip/tripSlice';

const App = () => {
  const dispatch = useDispatch();
  const { trip, settlements, loading, error } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(loadTrip());
  }, [dispatch]);

  if (loading || !trip) {
    return <div className="screen-center">Loading your trip...</div>;
  }

  return (
    <main className="layout">
      <header className="hero glass-card">
        <h1>{trip.name}</h1>
        <p>Smart group expense tracking with clean settlements for every traveler.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="grid-2">
        <MemberForm onAdd={(payload) => dispatch(addMember(payload))} />
        <ExpenseForm members={trip.members} onSave={(payload) => dispatch(addExpense(payload))} />
      </div>

      <div className="grid-2">
        <BalanceBoard members={trip.members} settlements={settlements} />
        <ExpenseTimeline expenses={trip.expenses} members={trip.members} />
      </div>
    </main>
  );
};

export default App;
