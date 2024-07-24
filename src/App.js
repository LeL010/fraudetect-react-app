import logo from './logo.svg';
import './App.css';
import TransactionForm from "./TransactionForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TransactionForm />
      </header>
    </div>
  );
}

export default App;
