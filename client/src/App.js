import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    SplashScreen,
    RegisterScreen,
    HomeScreen,
    WorkspaceScreen,
    SignIn,
    CommunityScreen,
    UsersScreen,
    AllListsScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path= "/login" exact component={SignIn} />
                        <Route path="/home/" exact component={HomeScreen} />
                        <Route path="/home/:id" exact component={WorkspaceScreen} />
                        <Route path="/community/" exact component={CommunityScreen} />
                        <Route path="/users/" exact component={UsersScreen} />
                        <Route path="/alllists/" exact component={AllListsScreen} />

                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App