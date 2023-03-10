import './App.css';
import { Header } from './components';
import {Routes, Route} from 'react-router-dom'
import {Main, CreateContainer} from './components';
import {AnimatePresence } from 'framer-motion'


function App() {
  return (
    <AnimatePresence>
      <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/createItem' element={<CreateContainer/>}/>
        </Routes>
      </main>
    </div>
    </AnimatePresence>
    
  );
}

export default App;
