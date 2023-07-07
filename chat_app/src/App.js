import './App.css';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Join from './components/Join';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />

        </Routes>
      </Router>

      {/* <Chat /> */}
    </div>
  );
}

export default App;
