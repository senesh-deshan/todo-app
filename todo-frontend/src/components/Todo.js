
import React, { Component } from "react";
import Editable from "./Editable";

// Defines a single Todo card layout
class Todo extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    render() {
        return <li>
            <div className="card-left">
                <input type={"checkbox"} checked={this.props.todo.done} onChange={(e) => this.props.updateToDo(this.props.todo, { done: !this.props.todo.done })} />
            </div>
            <div className="card-middle">

                {/* Use a editable labels as Todo title */}
                <Editable
                    className={"card-title"}
                    text={this.props.todo.text}
                    childref={this.inputRef}
                    placeholder="Write a todo title"
                    type="input">
                    <input
                        ref={this.inputRef}
                        minLength={1}
                        maxLength={20}
                        required
                        type="text"
                        placeholder="Write a todo title"
                        value={this.props.todo.text}
                        onChange={e => this.props.updateToDo(this.props.todo, { text: e.target.value })}
                    />
                </Editable>

                {/* Use a editable labels as Todo description */}
                <Editable
                    className={"card-content"}
                    text={this.props.todo.description}
                    childref={this.inputRef}
                    placeholder="No description"
                    type="textarea">
                    <textarea
                        ref={this.inputRef}
                        minLength={1}
                        maxLength={100}
                        required
                        type="text"
                        rows="5"
                        placeholder="No description"
                        value={this.props.todo.description}
                        onChange={e => this.props.updateToDo(this.props.todo, { description: e.target.value })}
                    />
                </Editable>
            </div>
            <div className="card-righth">
                <a className={"deletebtn"} onClick={() => this.props.removeToDo(this.props.todo)} href="#/">&times;</a>
            </div>
        </li>;
    };
}


export default Todo;