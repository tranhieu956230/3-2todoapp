import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

var store = [];

class App extends React.Component {
  constructor(){
    super();
    this.state={arr:store};
  }
  triggerUL(){
  this.setState({arr:store});
  }
  render() {
    return (
      <div id="main">
        <Head triggerUL={this.triggerUL.bind(this)}/>
        <UL arr={this.state.arr}/>
      </div>
    )
  }
}

class Head extends React.Component {
  triggerUL(){
    this.props.triggerUL();
  }
  render() {
    return (
      <div id="head">
        <h1>My ToDo List</h1>
        <Form triggerUL={this.triggerUL.bind(this)}/>
      </div>
    )
  }
}
class Form extends React.Component {
  constructor(){
    super();
    this.state = {text:''};
  }
  handleChange(e){
   this.setState({text:e.target.value});
   
  }
  addTodo(){
    if(this.state.text!=='')store.push({text:this.state.text,completed:false});
    this.setState({text:""});
    this.props.triggerUL();
  }
  handleEnter(e){
   
   if(e.key==="Enter") {
   if(this.state.text!=='')store.push({text:this.state.text,completed:false});
   this.setState({text:""});
   this.props.triggerUL();
   }

   return false;
  }
  render() {
    return (
      <form onSubmit={e=>e.preventDefault()}>
        <input  type="text" onChange={this.handleChange.bind(this)} value={this.state.text} onKeyPress={this.handleEnter.bind(this)}/>
        <button type="button" onClick={this.addTodo.bind(this)}>Add</button>
      </form>
    )
  }
}
class UL extends React.Component {
  constructor(props){
    super(props);
    this.state={array:this.props.arr};
  }
  removeTodo(index){
    store.splice(index,1);
    this.setState({array:store});
  }
  handleComplete(index,e){
   e.target.classList.toggle("completed");
   if(store[index].completed===true) store[index].completed=false;
   else store[index].completed=true;
   this.setState({array:store});

  }
  render() {
    var list = this.state.array;
    list=list.map((obj,index)=>
    <li key={index} onClick={this.handleComplete.bind(this,index)} className={obj.completed===true?"completed":""}>
    {obj.text}
    <Span close={this.removeTodo.bind(this)} id={index}/>
    </li>
    )
    return (
      <ul>{list}</ul>
    )
  }
}
class Span extends React.Component{
  removeTodo(e){
    e.stopPropagation();
    this.props.close(e.target.id);
  }
  render(){
    return(
      <span onClick={this.removeTodo.bind(this)} id={this.props.id}>x</span>
    )
  }
}

window.onload= function(){
store=JSON.parse(sessionStorage["todos"]);
ReactDOM.render(<App />, document.getElementById('root'));
   
}

window.onbeforeunload= function(){
  sessionStorage.setItem("todos",JSON.stringify(store));
  return undefined;
}