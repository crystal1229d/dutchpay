import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CreateGroup } from './components/CreateGroup'
import { AddMembers } from './components/AddMembers'
import { ExpenseMain } from './components/ExpenseMain'


const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateGroup />} />
          <Route path='/members' element={<AddMembers />} />
          <Route path='/expense' element={<ExpenseMain />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
