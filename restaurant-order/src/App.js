import './App.css';
import { CardContainer, Header, MenuContainer } from './components';
import {Routes, Route} from 'react-router-dom'
import {Main, CreateContainer} from './components';
import {AnimatePresence } from 'framer-motion'
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
import { useEffect } from 'react';


function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/createItem' element={<CreateContainer/>}/>
          <Route path='/cardContainer' element={<CardContainer/>}/>
          <Route path='/menuContainer' element={<MenuContainer/>}/>

        </Routes>
      </main>
    </div>
    </AnimatePresence>
    
  );
}

export default App;
