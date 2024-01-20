import { Navbar, Container, Nav, Form } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import whisky from '../../assets/images/whisky.jpg'
import './Header.css'
import { ModalBottle } from "../../components/ModalBottle"
import React from "react"
import { Bottle } from "../../types"
import { newBottle } from "../../Utils/utils"
import { v4 as uuidv4 } from 'uuid';

type HeaderProps = {
	newSearch: (value: string) => void
	submitNewBottle: (value: Bottle) => void
}

export default function Header(props: HeaderProps) {
	const [modalShow, setModalShow] = React.useState(false);

	function updateBottleFromModal(newBottleToSet: Bottle): void {
		newBottle(newBottleToSet, (success: boolean) => {
			if (success) console.log(newBottle);
			props.submitNewBottle && props.submitNewBottle(newBottleToSet)
		})
	}

	return (
		<>
			<ModalBottle newBottle={true} onValidSubmit={updateBottleFromModal} show={modalShow} onHide={() => setModalShow(false)} bottle={{
				id: uuidv4(),
				qty: 0,
				name: "",
				age: 0,
				alcool: 0,
				photo: "",
				pays: "",
				genre: "",
				distillerie: "",
				address: "",
				zip: "",
				nez: "",
				bouche: "",
				final: "",
				note: 0,
				message: ""
			}} />
			<Navbar expand="lg" sticky="top" className="bg-dark py-2 ">
				<Container fluid >
					<Navbar.Brand href="#">
						<img src={whisky} height='75px'></img>
					</Navbar.Brand>
					<Nav className="me-auto">
						<div className="d-flex justify-content-end me-2 flex-nowrap">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2 fs-6 fw-light"
								aria-label="Search"
								onChange={(e) => { props.newSearch(e.target.value) }}
							/>
							<Nav.Link onClick={() => setModalShow(true)}>
								<Icon.PlusLg width="2rem" height="2rem"/>
							</Nav.Link>
						</div>
					</Nav>
				</Container>
			</Navbar>
		</>
	)
}