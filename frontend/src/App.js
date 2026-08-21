import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/addUser";
import EditUser from "./components/EditUser";
import AddProduct from "./components/addProduct";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserList/>}/>
      <Route path="/add" element={<AddUser/>}/>
      <Route path="edit/:id" element={<EditUser/>}/>

      <Route path="/products" element={<ProductList/>}/>
      <Route path="/products/add" element={<AddProduct/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
