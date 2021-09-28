import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Korzinka from './About';
import ProMarket from './Link';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Modal, FormControl, Alert, Nav, NavDropdown, Form, Container, Card, Button} from 'react-bootstrap';
import numberSeparator from "number-separator";
import Img from './img';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            trash: [],
        }
    }

    trashs = (y) => {
        this.setState(prev => {
            return {
                trash: prev.trash.includes(y.id) ? prev.trash.filter(v => v !== y.id) : [...prev.trash, y.id]
            }
        })
    }
    trashs2 = (i) => {
        const a = [...this.state.trash];
        a.splice(i, 1);
        this.setState({trash: a})

    }

    Price = y => {
        if (y.discount === null) {
            return (
                <Card.Text style={{fontSize: 30, color: 'green'}}>
                    {numberSeparator(y.price)} <u>c</u>

                </Card.Text>
            )
        } else {
            return (
                <>
                    <Alert style={{
                        paddingTop: '10px',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        position: 'absolute',
                        color: 'white',
                        top: '10px',
                        right: '10px',
                        width: '55%',
                        height: '45px'
                    }} key={1} variant={'danger'}>
                        Скидка {(y.discount)}%
                    </Alert>
                    <Card.Text style={{fontSize: 30, color: 'green'}}>
                        <span style={{color: 'green'}}>{numberSeparator(y.price - (y.price * y.discount / 100))}<u>c</u></span>
                        <span style={{color: 'red'}}> <del>{numberSeparator(y.price)} <u>c</u></del> </span>
                    </Card.Text>
                </>
            )
        }
    }

    componentDidMount() {
        this.setState({trash: JSON.parse(localStorage.getItem("names")) || []})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.trash !== this.state.trash) {
            localStorage.setItem("names", JSON.stringify(this.state.trash));
        }
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to='/'>Besoft Teach</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to='/korzinka'>Корзина ({this.state.trash.length})</Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    onChange={e => this.setState({item: e.target.value})}
                                    type="search"
                                    placeholder="Фильтр"
                                    value={this.state.item}
                                    className=""
                                    aria-label="Search"
                                />
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Switch>
                    <Route path="/product/:id" component={props => <Img {...props} />} />

                    <Route path="/korzinka">
                        <Korzinka
                            Item={this.state.item}
                            Trash={this.state.trash}
                            Price={this.Price}
                            Trashs2={this.trashs2}

                        />
                    </Route>
                    <Route path="/">
                        <ProMarket
                            Item={this.state.item}
                            Trash={this.state.trash}
                            Trashs={this.trashs}
                            Price={this.Price}
                        />
                    </Route>

                </Switch>

            </>
        )
    }
}