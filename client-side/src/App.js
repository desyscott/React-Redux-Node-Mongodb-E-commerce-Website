
import {Route} from "react-router-dom";
import  { SkeletonTheme} from 'react-loading-skeleton'
import MainLayout from "./components/MainLayout/index"
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignIn/Login";
import EmailVerified from "./components/EmailVerified";
import ForgotPassword from "./components/Forgot-Password/ForgotPassword";
import ResetPassword from "./components/Reset-Password/ResetPassword";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart"
import CartNotification from "./Pages/CartNotification"

const  App=()=> {
  return (
    <>
     <SkeletonTheme baseColor="hsl(200,10%,80%)" highlightColor="hsl(200, 20%, 95%)">
      
          <Route path="/" exact render={()=>(
            <MainLayout>
            <Landing/>
            </MainLayout>
          )}/>
       
          <Route path="/product/:productId" render={()=>(
            <MainLayout>
            <ProductDetails/>
            </MainLayout>
          )}/>
          
          
          <Route exact path="/cart" render={()=>(
            <MainLayout>
            <Cart/>
            </MainLayout>
          )}/>
          
          <Route path="/cart/Notify/:productId?" render={()=>(
            <MainLayout>
            <CartNotification/>
            </MainLayout>
          )}/>
           

          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" component={Login} />
          <Route
            path="/email-verification/:userId/:verificationString"
            component={EmailVerified}
          />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/home" component={Home} />
     </SkeletonTheme>
    </>
  );
}

export default App;
