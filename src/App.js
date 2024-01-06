import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css'
import { CreateGroup } from './components/CreateGroup'
import { AddMembers } from './components/AddMembers'
import { ExpenseMain } from './components/ExpenseMain'
import { ROUTES } from './routes';


const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={ROUTES.CREATE_GROUP} />} />
          <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup />} />
          <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />} />
          <Route path={ROUTES.EXPENSES_MAIN} element={<ExpenseMain />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
