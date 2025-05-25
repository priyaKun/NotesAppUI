import './App.css';
import NoteList from './components/NoteList';
// import { NoteProvider } from './context/NoteContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <h1>Notes App</h1>
      </header>
      <main>
        <NoteList />
      </main>
    </div>
  );
}

export default App;
