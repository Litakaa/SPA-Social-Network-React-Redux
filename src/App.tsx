import * as React from "react";
import './App.css';
import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import {AppStateType, store} from "./redux/redux-store"
import UsersContainer from "./components/Users/UsersContainer";
import {Component, Suspense} from "react";


const DialogsContainer = React.lazy(() => import("./components/Diallogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

export class App extends Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (
        promiseRejectionEvent: PromiseRejectionEvent) => {
        console.log('Some error')
        console.log(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection',
            this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
    window.removeEventListener('unhandledrejection',
        this.catchAllUnhandledErrors)
}

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<Preloader />}>
                            <section>
                                <Routes>
                                    <Route path="/" element={<Navigate to={"/profile"}/>}/>
                                    <Route path="/dialogs/" element={<DialogsContainer/>}/>
                                    <Route path="/profile" element={<ProfileContainer/>}>
                                        <Route path=":userId" element={<ProfileContainer/>}/>
                                    </Route>
                                    <Route path="/users" element={<UsersContainer/>}/>
                                    <Route path="/news/" element={<News/>}/>
                                    <Route path="/music" element={<Music/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="*" element={<div>404 NOT Found</div>}></Route>
                                </Routes>
                            </section>
                        </Suspense>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}
const AppContainer = connect(mapStateToProps, {initializeApp})(App)

 const MainApp: React.FC = () => {
    return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default MainApp;

