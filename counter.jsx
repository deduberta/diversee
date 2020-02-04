import React, {Component} from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag3']
    };
    // constructor(){
    //     super();
    //     this.handleIncrement = this.handleIncrement().bind(this)
    // }

    handleIncrement = product=> {
        this.setState({count:this.state.count+1})
    }

    render() {
        return (
            <div>
                <span className="badge badge-primary m-2">{this.formatCount()}</span>
                <button  onClick={()=> this.handleIncrement(product)}

                        className="btn btn-secondary btn-sm">Increment</button>
                <ul>
                    {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
            </div>
        );
    }
        formatCount(){
        return this.state.count === 0 ?'Zero':this.state.count
        }
    }


export default Counter;