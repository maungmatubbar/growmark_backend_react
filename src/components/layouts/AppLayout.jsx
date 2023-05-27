import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import AppHeader from '../includes/AppHeader';
import AppAsidebar from '../includes/AppAsidebar';
import AppFooter from '../includes/AppFooter';
import { Provider } from 'react-redux';
import store from '../store/store'
export default function AppLayout() {
  const {token} = useStateContext();
  if(!token){
    return <Navigate to="/login" />
  }
  return (
    <>
      <Provider store={store}>
        <AppHeader />
        <AppAsidebar />
        <main id="main" className="main">
          <Outlet />  
        </main>
        <AppFooter/>
      </Provider>
    </>
  )
}
