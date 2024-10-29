import './App.css';

import { Header } from './components/shared/Header';
import { ListMessages } from './components/ListMessages';
import { MessageProvider } from './modules/communication/MessageProvider';

function App() {
  return (
    <MessageProvider>
      <div className="App">
        <Header />
        <ListMessages />
      </div>
    </MessageProvider>
  );
}

export default App;
