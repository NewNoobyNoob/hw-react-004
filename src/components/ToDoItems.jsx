import React, { PureComponent } from 'react'

class ToDoItems extends PureComponent {

//   shouldComponentUpdate(nextProps, nextState){
//     return !(this.state.show == nextState.show && this.state.todos == nextState.todos)
// } // instead pg above shouldComponentUpdate we put after extends (and within import also) PureComponent instead a simple Component

handleResize = () => {
  console.log('user' + this.props.ToDo)
}

componentDidMount() {
  window.addEventListener('resize', this.handleResize)
}

componentWillUnmount() {
  window.removeEventListener('resize', this.handleResize)
}

  render() {

    const {ToDo, Description, action} = this.props;

    return (
      <div className="todo-item">
          <p>ToDo: {ToDo}</p>
          <p>Description: {Description}</p>
          <button onClick={() => action(ToDo)}>Remove</button>
      </div>  
      )
}

}
  

export default ToDoItems