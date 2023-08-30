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

        this.testing();
    }

    testing() {
        //in case of promise and AJAX, the setState will act as a synchronous call
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done');
            }, 5000)
        })

        promise.then( () => {

            // so all the three calls will be called and component will rendered 3 times
            this.setState({ qty: this.state.qty + 10 });

            this.setState({ qty: this.state.qty + 10 });

            this.setState({ qty: this.state.qty + 10 });

            console.log('state', this.state);
            // in total qty becomes 31 = 1 + 10 + 10 + 10
        });
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


        //no matter how many times we call an event handler inside setState
        //it will merge all the calls (shallow merging) and only last call will execute
        //it is also known as batching || react renders our component only once
        //if first call is increment by 1 and last call is increment by 5 then increment by 5 will execute only

        // this.setState({
        //     qty: this.state.qty + 1
        // });

        // this.setState({
        //     qty: this.state.qty + 5
        // });



        //setState form 2: by passing a function     --> if previous state requires use this form
        
        //after updating the qty, in console it stills shows the previous one (because setState call is asynchronous)
        //we don't know when this call finishes. So when we use setState we do not relay on this.state
        //so to update that we use callback function (as a second argument in setState func) which will execute once our state gets updated
        //callback for multiple calls will fired together after re-render
        this.setState((prevState) =>{
            return {
                qty: prevState.qty + 1
            }
        }, () => {
            console.log("this.state", this.state);
        });


        //here also react performs batching (render component only once)
        //but here the callback func is store in a queue
        //now as the first callback func execute, the previous state updates
        //so for next func again callback func will execute
        //so here in form 2 all the functions will executes but render only once on the page

        // this.setState((prevState) =>{
        //     return {
        //         qty: prevState.qty + 1
        //     }
        // });

        // this.setState((prevState) =>{
        //     return {
        //         qty: prevState.qty + 1
        //     }
        // });

    }

    decreaseQuantity = () =>{
        const { qty } = this.state;

        if(qty === 0 ){
            return;
        }
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
        console.log('render')
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