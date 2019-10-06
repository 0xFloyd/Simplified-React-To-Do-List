import React from "react";

class ToDoItems extends React.Component {
    constructor(props) {
        super(props);

        this.createTasks =this.createTasks.bind(this);
    }
    
    delete(key) {
        this.props.delete(key);
    }

    createTasks(task) {
        return <li onClick={() => this.delete(task.key)} key={task.key}>{task.name}</li>
    }

    render() {
        let toDoListItems = this.props.entries;
        let listItems = toDoListItems.map(this.createTasks);

        return (
            <ul className="taskList">
                {listItems}
            </ul>
        );
    }
};

export default ToDoItems;