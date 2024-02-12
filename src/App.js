import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';

function App() {
  return (
    <div className="App">
      <h5>Teste Kabum!</h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar Usuarios</Link>
            </li>
            <li>
              <Link to="user/create">Criar Usuário</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
