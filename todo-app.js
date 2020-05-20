function Task(props) {
    if (props.isDone === true) {
        return <li> <strike><u>{props.name},{props.dueDate} {props.Check} {props.delete} </u></strike></li>
    } else {
        return <li> {props.name},{props.dueDate} {props.Check} {props.delete} </li>
    }

}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list};

        this.handleAddTask = this.handleAddTask.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handlecheck = this.handlecheck.bind(this);
    }

    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState(
            {list: this.state.list}
            )
    }

    deleteItem(id) {
        //copy cuurent list of items
        const list= [...this.state.list];
    
        //filter out item being deleted
        const updatedList = list.filter(item => item.id !== id);
    
        //update the state with deleted id
        this.setState({
          list: updatedList
        });
    }

    handlecheck (id) {
        //filter out item
        const checkBoxList = this.state.list.filter((task) => {
            if (task.id === id) {
                if (task.isDone === true) {
                    task.isDone = false;
                } else {
                    task.isDone = true;
                }
            }
            return task;
        })
        //update the state
        this.setState({
            list: checkBoxList
        })
    }

    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} isDone={t.isDone} Check={t.Check} delete={t.delete}/>)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} onDelete={this.deleteItem} onCheck={this.handlecheck}/>
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',dueDate: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const id = Date.now();
        const task = {id:id, name: this.state.value, 
        dueDate: this.state.dueDate, isDone: false, 
        Check: <input type = "checkbox" onClick = {() => this.handlecheck(id)}></input>,
        delete: <button type = "button" onClick = {() => this.handleDelete(id)}> x </button>
        
        };

        // console.log(task);
        // add the task object to the task list
        this.props.onAddTask(task);
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }

    handleDateChange(event) {
        // code to set the state of the component
        this.setState({dueDate: event.target.value});
    }
    handleDelete(id) {
        this.props.onDelete(id);
    }

    handlecheck(id) {
        this.props.onCheck(id);
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                <input 
                type="date" value={this.state.dueDate}
                onChange={this.handleDateChange}/>
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);