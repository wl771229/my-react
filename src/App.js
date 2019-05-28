import React, { Component } from 'react'
import './App.css';

class App extends Component  {

  constructor(){
    super()
     this.state = {
      todoList:[
          {
            isState:true,
              id:1,
              content:'德玛西亚'
          },
          {
              isState:false,
              id:2,
              content:'我是小明'
          }
        ],
         id:2,
         addValue:'',
         editId:0,
         checkNumber:0
      }
    }
    //添加内容
    addContent(e){
      let value = e.target.value;
      this.setState({
          addValue:value
      })
    }
    //提交添加的内容
    contentSubmit(e){
        //阻止默认事件
        e.preventDefault();
        this.state.id+=1;

        this.setState({
            todoList:this.state.todoList.concat([
                {
                    content:this.state.addValue,
                    isState:false,
                    id: this.state.id,
                }
            ]),
            addValue:'',
            editValue:''
        },() =>{
            this.checkNumber()

        })

    }
    //删除内容
    delContent(id){
      let {todoList} = this.state;

        var delIndex =  todoList.findIndex((todo) =>{return todo.id == id});
        todoList.splice(delIndex,1);
        this.checkNumber()

    }
    //修改状态
    todoChecked(e,id){
        let {todoList} = this.state;
        todoList.forEach((item) =>{
          if(item.id == id){
              item.isState = e.target.checked
          }
        });
        this.checkNumber()
        // this.setState({});
    }
    //编辑
    todoEditor(e,id){
        let {todoList} = this.state;
        let editId = '';
        let todoId = 'todo_'+id;


        todoList.forEach((item) =>{
            if(item.id == id){
                editId = id
            }
        });
        this.setState({
            editId
        },() =>{
            //    选中input

            this.refs[todoId].focus();
        });
    }

    //    编辑内容
    editorContent(e,id){
        let value = e.target.value;
        let {todoList} = this.state;
        todoList.forEach((item) =>{
            if(item.id == id){
                item.content = value
            }
        });


        this.setState({})

    }
    //提交修改之后的内容
    editSubmit(e,id){
        //阻止默认事件
        e.preventDefault();

        this.setState({
            editId:0
        })

    }
    //选中的个数
    checkNumber(){
        let {todoList} = this.state;
        let num = 0;
        todoList.forEach((item) =>{
            if(item.isState == false){
                num+=1
            }
        });
        this.setState({
            checkNumber:num
        })
    }
    //初始化加载
    componentDidMount(){
      this.checkNumber()
    }
    render() {
        let {addValue,editId,checkNumber} = this.state;

        const todoContent = this.state.todoList.map((item,index) =>{
            return (
                <li className={[item.isState?"completed":'', editId == item.id ?'editing':''].join(' ')} key={index} >
                  <div className="view">

                    <input className="toggle" onChange={(e) =>{this.todoChecked(e,item.id)}} type="checkbox" checked = {item.isState} />

                    <label onDoubleClick={(e) =>{this.todoEditor(e,item.id)}}>{item.content}</label>

                    <button className="destroy" onClick={this.delContent.bind(this,item.id)}></button>
                  </div>
                  <form onSubmit={(e) =>{this.editSubmit(e,item.id)}}>
                  <input ref={'todo_'+item.id} className="edit" onBlur={(e) =>{this.editSubmit(e,item.id)}}  onChange={(e) =>{this.editorContent(e,item.id)}} value={item.content} />
                  </form>
                </li>
            )
        });
        return (
            <div className="App">
              <section className="todoapp">
                <header className="header">
                  <h1>todos</h1>
                  <form onSubmit={(e) =>{this.contentSubmit(e)}}>

                  <input className="new-todo" value={addValue} onChange={(e) =>{this.addContent(e)}} placeholder="What needs to be done?"  />
                  </form>

                </header>
                  {/* This section should be hidden by default and shown when there are todos */}
                <section className="main">
                  <input id="toggle-all" className="toggle-all" type="checkbox" />
                  <label >Mark all as complete</label>
                  <ul className="todo-list">

                      {todoContent}

                  </ul>
                </section>
                  {/* This footer should hidden by default and shown when there are todos */}
                <footer className="footer">
                  <span className="todo-count"><strong>{checkNumber}</strong> item left</span>
                    {/* Remove this if you don't implement routing */}
                  <ul className="filters">
                    <li>
                      <a className="selected" href="#/">All</a>
                    </li>
                    <li>
                      <a href="#/active">Active</a>
                    </li>

                    <li>
                      <a href="#/completed">Completed</a>
                    </li>
                  </ul>
                    {/*Hidden if no completed items are left ↓ */}
                  <button className="clear-completed">Clear completed</button>
                </footer>
              </section>
              <footer className="info">
                <p>Double-click to edit a todo</p>
                  {/* Remove the below line ↓ */}
                <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                  {/* Change this out with your name and url ↓ */}
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
              </footer>

            </div>
        );

    }

}

export default App;
