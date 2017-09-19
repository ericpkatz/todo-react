import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import axios from 'axios';

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      tasks: []
    }
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  addTask(newTask){
    axios.post("/api/todo", { name: newTask })
    .then(res => res.data)
    .then(task => {
      this.setState({
        tasks: this.state.tasks.concat(task)
      })      
    })
  }

  deleteTask(taskId){
    axios.delete(`/api/todo/${taskId}`)
    .then(res => res.data)
    .then(() => {
      const tasks = this.state.tasks.filter( task => {
        return task.id !== taskId;
      });
      this.setState({ tasks })
    })
  }

  componentDidMount(){
    axios.get("/api/todo")
    .then(res => res.data)
    .then(tasks => {
      this.setState({ tasks })
    })
  }

  render(){
    return(
      <div className="col-xs-12">
        <h1>To-Do List</h1>
        <TodoForm addTask={ this.addTask } />
        <TodoList tasks={ this.state.tasks } deleteTask={ this.deleteTask } />
      </div>
    )
  }
}
