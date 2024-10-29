import './App.css';

import { Header } from './components/shared/Header';
import { MessageProvider } from './modules/communication/MessageProvider';

function App() {
  return (
    <MessageProvider>
      <div className="App">
        <Header />
      </div>
    </MessageProvider>
  );
}

export default App;
