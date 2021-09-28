import React, { Component } from 'react';
import Products from './products.json';
import {Card, Button,Alert} from 'react-bootstrap';
import numberSeparator from "number-separator";


export default class Korzinka extends Component {
    render() {
        let summ = 0;
        {this.props.Trash.map((t) => {
            const a = Products.find(g => g.id === t);
            summ += a.discount ? a.price - (a.price * a.discount / 100) : a.price
        })}
        return (
            <>
                <h1 className='container'>Корзина ({numberSeparator(summ)})</h1>
                <div className="d-flex justify-content-evenly flex-wrap mt-2 container">
                    {this.props.Trash.map((a, i) => {
                        const y = Products.find(g => g.id === a);
                        return <Card style={{ width: '18rem', height: 430}} className='cards mt-5'>
                            <div  className="images" style={{backgroundImage:`url(${y.main_image})` }}/>
                            <Card.Body>
                                <Card.Title>{y.title}</Card.Title>
                                {this.props.Price(y)}
                                <div className="ml-5">
                                </div>

                            </Card.Body>
                            <Button  style={{width:'90%', marginLeft: '12px',marginBottom:'5px', backgroundColor: this.props.Trash.includes(y.id)? 'red':'blue'}} onClick={()=>{this.props.Trashs2(i)}}>{this.props.Trash.includes(y.id)? 'Удалить': 'Добавить в корзинку'}</Button>
                        </Card>
                    })}


                </div>
            </>
        )
    }
}