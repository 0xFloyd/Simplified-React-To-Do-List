import React from "react";
import ToDoItems from "./ToDoItems";
import "./index.css";
import { Tooltip } from "reactstrap";


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tasks: [],
          tooltipOpen: false
        };

        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggle = this.toggle.bind(this);
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
          this.dateInput.value = 'mm/dd/yyyy';
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
  
    toggle() {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
    }
    
  
    render() {
        return (
          <div className="todoListMain">
            <div className="header">
              <div>
                <h1>TewDew<span className="toolTipMark" href="#" id="toolTip">?</span></h1>
                <Tooltip  isOpen={this.state.tooltipOpen} target="toolTip" toggle={this.toggle}>
                  <div>
                    <p className="toolTipText">TewDew focuses on your tasks, and nothing else.<br></br>Add at task with the "Add Task" button, and delete a task by simply clicking on it.</p>
                  </div>
                </Tooltip>
              </div>
              <div>
                <p className="siteDescription">Your tasks, focused and simplifed.</p>
              </div>
              <form onSubmit={this.addTask}>
                    <input
                      className="taskTextInput"
                      ref={x => (this.textInput = x)}
                      placeholder="Enter task"
                ></input>
                <input
                      type="date"
                      className="dateInput"
                      placeholder="mm-dd-yyyy"
                      onfocus={this.type="date"}
                      onblur={this.type = "text"}
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