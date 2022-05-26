import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Heroes from './components/heroes/Heroes';
import Details from './components/details/Details';
import Hero from './components/hero/Hero';
import './App.css';

function App() {
	localStorage.setItem("email", "esteban@gmail.com");
	localStorage.setItem("name", "Carlos Esteban");
	localStorage.setItem("lastName", "Ospina Salarriaga");
	localStorage.setItem("password", "esteban");
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login/>}></Route>
					<Route path='/login' element={<Login/>}></Route>
					<Route path='/heroes' element={<Heroes/>}></Route>
					<Route path='/details' element={<Details/>}/>
					<Route path='/hero' element={<Hero/>}>
						<Route path=':heroId' element={<Hero/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
