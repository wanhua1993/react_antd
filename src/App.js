import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
function App() {
  return (
    <BrowserRouter>
      {/* 只匹配其中一个路径 */}
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
