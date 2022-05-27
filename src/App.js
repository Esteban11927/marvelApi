import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Heroes from './components/heroes/Heroes';
import Details from './components/details/Details';
import Hero from './components/hero/Hero';
import PageNotFound from './components/pageNotFound/PageNotFound';
import { AuthContext } from './helpers/authContext';
import './App.css';

function App() {
	localStorage.setItem("email", "esteban@gmail.com");
	localStorage.setItem("password", "esteban");
	const name = "Carlos Esteban";
	const lastName = "Ospina Saldarriaga";
	return (
		<div className="App">
			<AuthContext.Provider value={{ name, lastName }}>
				<BrowserRouter>
					<Routes>
							<Route path="/" element={<Login/>}></Route>
							<Route path='/login' element={<Login/>}></Route>
							<Route path='/heroes' element={<Heroes/>}></Route>
							<Route path='/details' element={<Details/>}/>
							<Route path='/hero' element={<Hero/>}>
								<Route path=':heroId' element={<Hero/>} />
							</Route>
							<Route path="*" element={<PageNotFound/>}></Route>
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
