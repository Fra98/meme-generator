import { Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import { PersonCircle, BoxArrowRight, EmojiSmile } from "react-bootstrap-icons";
import './XNavbar.css'
import '../API'
import { useHistory } from 'react-router-dom';

const brandName = 'Meme Generator';

function XNavbar(props) {
	return (
		<Navbar bg='dark' variant='dark p-1 shadow' expand='sm' fixed="top" className='justify-content-between'>
			<XBrand />
			<XSearchBar setFilter={props.setFilter} />
			<XUserProfile user={props.user} doLogOut={props.doLogOut} userLogged={props.userLogged} />
		</Navbar>
	);

}


// Brand logo and name
function XBrand(props) {
	return (
		<Navbar.Brand href="#" className='mx-2 navbar-brand'>
			<EmojiSmile size={21} className='mr-1' />{' '}{brandName}
		</Navbar.Brand>
	);
}

// Search input bar
function XSearchBar(props) {
	return (
		<Form className="px-2 w-100 d-none d-sm-block" onChange={(event) => props.setFilter(event.target.value)}>
			<FormControl type="text" placeholder="Search" aria-label="Search" className="form-control-dark rounded-pill" />
		</Form>
	);
}


// User profile button 
function XUserProfile(props) {
	const history = useHistory();
	const redirectToLogin = () => { history.push("/login") };

	return (
		<Dropdown>
			<Dropdown.Toggle variant="dark" id="dropdown-basic" className='px-1'>
				<span className='pr-2'>{props.user}</span>
				<PersonCircle size={20} className='mr-2'/>
			</Dropdown.Toggle>

			<Dropdown.Menu alignRight>
				<Dropdown.Item onClick={props.userLogged ? props.doLogOut : redirectToLogin}>
					<span className='pr-2'>{props.userLogged ? "Logout" : "Login"}</span>
					<BoxArrowRight size={18} />
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}


export default XNavbar;