import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import { UserList } from "./pages/user/UserList";
import { AddUser } from "./pages/user/AddUser";
import { EditUser } from "./pages/user/EditUser";

// Product Pages
import { ProductList } from "./pages/product/ProductList";
import { AddProduct } from "./pages/product/AddProduct";
import { EditProduct } from "./pages/product/EditProduct";

// Address Pages
import { AddressList } from "./pages/address/AddressList";
import { AddAddress } from "./pages/address/AddAddress";
import { EditAddress } from "./pages/address/EditAddress";

// Auth Pages
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";

// Routes Guard
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman publik, tidak butuh login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman User (Protected) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />

        {/* Halaman Product (Protected) */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />

        {/* Halaman Address (Protected) */}
        <Route
          path="/addresses"
          element={
            <PrivateRoute>
              <AddressList />
            </PrivateRoute>
          }
        />
        <Route
          path="/addresses/add"
          element={
            <PrivateRoute>
              <AddAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/addresses/edit/:id"
          element={
            <PrivateRoute>
              <EditAddress />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
