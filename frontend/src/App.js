import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/addUser";
import EditUser from "./components/EditUser";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import AddAddress from "./components/AddAddress";
import AddressList from "./components/AddressList";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman publik, tidak butuh login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman yang wajib login dulu */}
        <Route path="/" element={
          <PrivateRoute><UserList /></PrivateRoute>
        } />
        <Route path="/add" element={
          <PrivateRoute><AddUser /></PrivateRoute>
        } />
        <Route path="edit/:id" element={
          <PrivateRoute><EditUser /></PrivateRoute>
        } />
        <Route path="/products" element={
          <PrivateRoute><ProductList /></PrivateRoute>
        } />
        <Route path="/products/add" element={
          <PrivateRoute><AddProduct /></PrivateRoute>
        } />
        <Route path="/addresses" element={
          <PrivateRoute><AddressList /></PrivateRoute>
        } />
        <Route path="/addresses/add" element={
          <PrivateRoute><AddAddress /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;