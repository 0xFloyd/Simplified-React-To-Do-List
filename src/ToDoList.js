import React from "react";
import ToDoItems from "./ToDoItems";
import "./index.css";


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tasks: [],
        };

        this.addTask = this.addTask.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
  
    addTask(e) {
        if (this.textInput.value !== "") {
            let newTask = {
                name: this.textInput.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newTask)
                };
        });

            this.textInput.value = '';
        }

        console.log(this.state.tasks);
        e.preventDefault();
    }
  

    deleteTask(key) {
        let filteredItems = this.state.tasks.filter(function(item) {
            return (item.key !== key);
        });

        this.setState( {
            tasks: filteredItems
        });
    }
  
  
    render() {
        return (
          <div className="todoListMain">
            <div className="header">
              <form onSubmit={this.addTask}>
                <input
                  ref={x => (this.textInput = x)}
                  placeholder="Enter task"
                ></input>
                <button type="submit">Add Task</button>
              </form>
            </div>
            <ToDoItems entries={this.state.tasks} delete={this.deleteTask} />       {/* ToDoItems has access to two props, entries and delete */}
          </div>
        );
  }
}

export default ToDoList;