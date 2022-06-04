import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext.js";
import Todo from "../components/Todo.js";

// Defines Todo dashboard layout
function Home() {
    const user = useContext(UserContext);
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [todos, setTodos] = useState([]);


    // Fetch all Todos of the user on component load
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/todo`, { withCredentials: true }).then(response => {
            setTodos(response.data);
        });
    }, []);

    if (!user.email) {
        return 'You need to log in first';
    }

    // Adds a new Todo to database via API call and add it to local Todos list as well
    function addToDo(e) {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_API_URL}/todo`, { text: titleValue, description: descriptionValue }, { withCredentials: true }).then(response => {
            setTodos([...todos, { text: titleValue, description: descriptionValue, done: false, _id: response.data._id }]);
            setTitleValue('');
            setDescriptionValue('');
        });
    }

    // Update an existing Todo in database via API call and update it on local Todos list as well
    function updateToDo(todo, change) {
        axios.post(`${process.env.REACT_APP_API_URL}/todo`, { id: todo._id, ...change }, { withCredentials: true }).then(response => {
            const newTodos = todos.map(t => {
                if (t._id === todo._id) {
                    t = { ...t, ...change }
                }
                return t;
            })
            setTodos([...newTodos]);
        });
    }
    // Delete an existing Todo in database via API call and delete it from local Todos list as well
    function removeToDo(todo) {
        axios.delete(`${process.env.REACT_APP_API_URL}/todo`, { data: { id: todo._id }, withCredentials: true }).then(response => {
            const newTodos = todos.filter((o, i) => {
                return o._id !== todo._id
            }
            );
            setTodos([...newTodos]);
        });
    }
    return <div>

        {/* New Todo add form */}
        <h3>Add Todo</h3>
        <form onSubmit={e => addToDo(e)}>
            <input placeholder={"Title"} value={titleValue} onChange={e => setTitleValue(e.target.value)} minLength={1} maxLength={20} required={true} />
            <br />
            <textarea placeholder={"Description"} value={descriptionValue} onChange={e => setDescriptionValue(e.target.value)} minLength={1} maxLength={100} required={true}></textarea>
            <br />
            <button type="submit">Add</button>
        </form>
        {/* Displays instructions based on availability of Todos */}
        {todos.length > 0 ?
            <div>
                {/* Display  two Todos lists side by side*/}
                <div className={"todo-list"}>
                    <div className={"todo-sub-list"}>
                        {/* Show pending Todos list along with total pending Todos count */}
                        <h1>Pending ({todos.filter((obj) => obj.done === false).length})</h1>
                        <ul>
                            {todos.map((todo, index) => (todo.done === false ? (
                                <Todo key={index} todo={todo} updateToDo={updateToDo} removeToDo={removeToDo}></Todo>
                            ) : null))}
                        </ul>
                    </div>
                    <div className={"todo-sub-list"}>
                        {/* Show completed Todos list along with total completed Todos count */}
                        <h1>Completed ({todos.filter((obj) => obj.done === true).length})</h1>
                        <ul>
                            {todos.map((todo, index) => (todo.done === true ? (
                                <Todo key={index} todo={todo} updateToDo={updateToDo} removeToDo={removeToDo}></Todo>
                            ) : null))}
                        </ul>
                    </div>
                </div>
                <small className="instruction">Click on ❌ to remove</small><br />
                <small className="instruction">Click on ✅ to change state</small><br />
                <small className="instruction">Click on <b>title</b> or <i>description</i> to edit</small>
            </div> :
            <div>
                <br />
                <small className="instruction">Add a Todo to begin with</small>
            </div>
        }
    </div>
}



export default Home;