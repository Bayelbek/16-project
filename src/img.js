import React, {Component} from 'react';
import Product from './products.json'
class Img extends Component {
    render() {

        const d = Product.find(r => r.id === +this.props.match.params.id)
        if (d) {
            return (
                <div>
                    <img src={d.main_image}/>
                    <h1>{d.title}</h1>
                </div>
            );
        }
        return (
            <h1>Товар не найден!</h1>
        )

    }
}

export default Img;