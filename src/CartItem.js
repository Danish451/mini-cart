import React from 'react'

class CartItem extends React.Component{
    constructor(){
        super();
        this.state = {
            price : 999,
            title : 'Phone',
            qty: 1,
            img: ''
        }
        // this.increaseQuantity = this.increaseQuantity.bind(this);
        // or we can use arrow function that will automatically binds the value of this to the instance of class

    }
    increaseQuantity = () =>{
        // console.log('this', this);
        // console.log('this.state', this.state);

        // setState is a function that comes from Component class
        //calling setState function will rerender our component


        //setState form 1: by passing object to rerender the changes
        // this.setState({
        //     qty: this.state.qty + 1
        // });


        //setState form 2: by passing a function     --> if previous state requires use this form
        this.setState((prevState) =>{
            return {
                qty: prevState.qty + 1
            }
        });

    }

    decreaseQuantity = () =>{
        this.setState({
            qty: this.state.qty - 1
        });


        /*
        this.setState((prevState) =>{
            return {
                qty: prevState.qty - 1
            }
        });
        */
    }

    deleteQuantity = () =>{
        this.setState({
            qty: this.state.qty - this.state.qty
        });

        /*
            this.setState((prevState) =>{
            return {
                qty: prevState.qty - prevState.qty
            }
        });
        */
    }
    render() {
        //object destructing || want these properties from state object
        const { price, title, qty } = this.state;
        return (
            <div className='cart-item'>
                <div className='left-block'>
                    <img style={styles.image}/>
                </div>
                <div className='right-block'>
                    <div style={ { fontSize: 25 } }>{title}</div>
                    <div style={ { color: '#777' } }>Rs {price}</div>
                    <div style={ { color: '#777' } }>Qty: {qty}</div>
                    <div className='cart-item-actions'>
                        {/* Buttons */}
                        <img 
                            alt='increase'
                            className='action-icons'
                            src='https://cdn-icons-png.flaticon.com/128/992/992651.png'
                            onClick={this.increaseQuantity}
                        />
                        <img 
                            alt='decrease' 
                            className='action-icons' 
                            src='https://cdn-icons-png.flaticon.com/128/992/992683.png' 
                            onClick={this.decreaseQuantity}
                        />
                        <img 
                            alt='delete' 
                            className='action-icons' 
                            src='https://cdn-icons-png.flaticon.com/128/3405/3405244.png' 
                            onClick={this.deleteQuantity}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// create objects for styling
const styles = {
    //property
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#777'
    }
}

export default CartItem;

//state: store local data for particular component
//it is just like plain javascript object

//when we create constructor, first call the constructor of super class if I am inheriting
//like in above case we call constructor for componenet class using super || then we create our constructor for CartItem class