import {Component} from 'react';
import ToDoItems from './ToDoItems';

class ToDoList extends Component {
    // state is a container, safe of the class component
    // state is a special reserved keyword
    constructor(props) {
        super(props)

        console.log('Constructor log')

    // we can write state simple and ommit constructor with PROPS and SUPER including THIS until state
    // constructor is used either to declare state or to make bindings


        this.state = {
            show: true,
            inputValue: '',
            todoId: 1,
            error: null,
            todos: [{ToDo: 1, Description: 'Some to do thing one'}, {ToDo: 2, Description: 'Some to do thing two'}]
          }
        // this.onChange = this.onChange.bind(this) //no need to bind anymore as ARROW functions solved binding issues. onChange below we have written with an arrow function
    }

    static getDerivedStateFromError(error){
      console.log('Derived error log')
      return {
          error: error.message
      }
  }

    static getDerivedStateFromProps(props, state){
        console.log('Derived state log')
        return {
            Description: "New To Do Thing"
        }
    }

style1 = {
    backgroundColor: 'yellow'
  };

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.state.todoId}`)
        .then(data => data.json())
        .then(res => console.log(res))
    }

    // unlike constructor above we CANNOT ommit componentDidMount
    // componentDidMount is used to take data from somewhere like fetching from server

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.todoId !== prevState.todoId){ //! this conditional is very important
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.state.todoId}`)
        .then(data => data.json())
        .then(res => console.log(res))
        }
    }


    // shouldComponentUpdate(nextProps, nextState){
    //     return !(this.state.show == nextState.show && this.state.todos == nextState.todos && this.state.todoId == nextState.todoId)
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState){
    //     console.log('Snapshot log')
    // }

  
    onChange = (event) =>{
      const value = event.target.value
      // console.log(value)
      this.setState({
        inputValue: value
      })
    }
      // console.log(this.state.inputValue)

      addTodo = (event) => {
        event.preventDefault()
        const ToDo = {
          ToDo: this.state.todos.length + 1,
          Description: this.state.inputValue
        }
        this.setState({
          todos: [...this.state.todos, ToDo],
          inputValue: ''
        })
      }
    
    removeTodo = (ToDo) => {
      const todos = this.state.todos.filter((todo) => todo.ToDo !== ToDo)
      this.setState({
        todos
      })
    }

    toggle = () => {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        })
    }

    open = () => {
        this.setState({ show: true})
    }

    nextToDo = () => {
        this.setState((prevState) => {
            return {
                todoId: prevState.todoId + 1
            }
        })
    }
  
    render() {

        console.log('Render log', this.state)

        return (
            <div className="todos">
                <form onSubmit={this.addTodo} className='todo-form'>
                    <input type='text' onChange={this.onChange} value={this.state.inputValue}/>
                    <button type='submit'>New To Do</button>
                </form>

                <button onClick={this.toggle}>Toggle</button>
                <button onClick={this.open}>Open</button>
                <button onClick={this.nextToDo}>Next To Do</button>


                  {this.state.show && this.state.todos.map((ToDo) => (
                    <ToDoItems key={ToDo.ToDo} ToDo={ToDo.ToDo} Description={ToDo.Description} action={this.removeTodo}/>
                  ))}
            </div>
        )
    }
}

export default ToDoList;