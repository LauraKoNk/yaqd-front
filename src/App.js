import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from './administration/PrivateRoute'; // Import du composant PrivateRoute

//site
import ShowAll from './containers/ShowAll';
import CardModal from './components/CardModal';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import LegalNotice from './components/LegalNotice';
import Contact from './components/Contact';

// admin CRUD
import IndexAdmin from './administration/IndexAdmin';
import AllAnimation from './administration/AllAnimation';
import AllChaines from './administration/AllChaines';
import AllDiffusions from './administration/AllDiffusions';
import NewAnimation from './administration/NewAnimation';
import NewDiffusions from './administration/NewDiffusions';
import NewChaines from './administration/NewChaines';
import EditAnimation from './administration/EditAnimation';
import EditChaines from './administration/EditChaines';
import EditDiffusions from './administration/EditDiffusions';

//auth
import Login from './administration/Login';
import SignUp from './administration/SignUp';


function App() {
  return (
    <Router>
      {/* -------- Header ------ */}
    < Header />
    <main>
      <Routes>
        {/* Navigation du site */}
        <Route path='/' element={<ShowAll />}/>
        <Route path="/card" element={<CardModal />} />
        <Route path='/apropos' element={<About />}/>
        <Route path='/mentions-legales' element={<LegalNotice />}/>
        <Route path='/contact' element={ <Contact />} />
        {/* Administration */}
        <Route path='/indexAdmin' element={ <PrivateRoute> <IndexAdmin /> </PrivateRoute> } />
        <Route path='/allAnimation' element={ <PrivateRoute><AllAnimation /></PrivateRoute> } />
        <Route path='/allChaine' element={ <PrivateRoute><AllChaines /></PrivateRoute> } />
        <Route path='/allDiffusion' element={ <PrivateRoute> <AllDiffusions /></PrivateRoute>} />
        <Route path='/newAnimation' element={ <PrivateRoute><NewAnimation /></PrivateRoute> } />
        <Route path='/newChaine' element={ <PrivateRoute> <NewChaines /></PrivateRoute> } />
        <Route path='/newDiffusion' element={ <PrivateRoute><NewDiffusions /></PrivateRoute> } />
        <Route path='/editAnimation/:id' element={ <PrivateRoute><EditAnimation /></PrivateRoute> } />
        <Route path='/editChaine/:id' element={ <PrivateRoute><EditChaines /></PrivateRoute> } />
        <Route path='/editDiffusion/:id' element={ <PrivateRoute><EditDiffusions /></PrivateRoute> } />
        {/* Authentification */}
        <Route path='/login' element={ <Login />} />
        <Route path='/signup' element={<PrivateRoute><SignUp /></PrivateRoute> } />
      </Routes>
    </main>
     <Footer />
     <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        theme="light"
      />
    </Router>
  );
}

export default App;
