import React from "react";
import ToDoItems from "./ToDoItems";
import "./index.css";
import { Row, Col, Input, Form } from "reactstrap";


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tasks: [],
        };

        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    
    formatDate = (date) => {
        let newDate = date.split('-');
        newDate[0] = newDate[0].substring(2);
        newDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
        return newDate;
      };

    addTask(e) {
        if (this.textInput.value !== "" && this.dateInput.value) {
            let formattedDate = this.formatDate(this.dateInput.value);

            let newTask = {
                name: this.textInput.value,
                key: Date.now(),
                date: formattedDate
            };

            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newTask)
                };
            
        });
           
          this.textInput.value = '';
          this.dateInput.value = '';
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
                <input
                      type="date"
                      className="dateInput"
                      ref={x => {
                        this.dateInput = x;
                      }}
                ></input>
                <button type="submit">Add Task</button>
              </form>
            </div>
            <ToDoItems entries={this.state.tasks} delete={this.deleteTask} />{" "}
            {/* ToDoItems has access to two props, entries and delete */}
          </div>
        );
  }
}


export default ToDoList;