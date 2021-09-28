import React, { Component } from 'react';
import Products from './products.json';
import './App.css';
import {Card, Button,Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";


export default class ProMarket extends Component {

    render() {
        const p = Products.filter(y => y.title.toLowerCase().indexOf(this.props.Item.toLowerCase()) !== -1);
        return (
            <>
                <h1 className="mt-3 container">Продукты ({p.length})</h1>

                <div className="d-flex justify-content-evenly flex-wrap mt-2 container">
                    {p.map((y, i) => {
                        return <Card style={{ width: '18rem', height: 430}} className='cards mt-5'>
                            <div  className="images" style={{backgroundImage:`url(${y.main_image})`}}/>
                            <Card.Body>
                                <Card.Title>{y.title}</Card.Title>
                                {this.props.Price(y)}
                                <div className="ml-5">
                                    <Button as={Link} to={`/product/${y.id}`} variant="outline-primary">Подробнее</Button>
                                </div>

                            </Card.Body>

                            <Button  style={{width:'90%', marginLeft: '12px',marginBottom:'5px', backgroundColor: this.props.Trash.includes(y.id)? 'red':'blue'}} onClick={()=>this.props.Trashs(y)}>{this.props.Trash.includes(y.id)? 'Удалить': 'Добавить в корзинку'}</Button>

                        </Card>
                    })}
                </div>
            </>
        )
    }
}