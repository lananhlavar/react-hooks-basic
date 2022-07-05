import React,{useEffect, useState} from 'react';
import queryString from'query-string';

import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';

import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
    ]);
     
    const [postList,setPostList] = useState([]);
    const [pagination, setPagination] = useState({
      _page: 1,
      _limit: 10,
      _totalRows:1,
    })
    const [filters, setFilters] = useState({
      _limit:10,
      _page:1,
    })
    useEffect( () => {
      async function fetchPostList() {
        //...
        try {
          //_limit=10&_page=1
          const paramString =queryString.stringify(filters)
          const requestUrl =`http://js-post-api.herokuapp.com/api/posts?${paramString}`;
          const response= await fetch(requestUrl);
          const reponseJSON= await response.json();
          console.log(reponseJSON);
  
          const {data, pagination} = reponseJSON;
          setPostList(data);
          setPagination(pagination);
          
        } catch (error) {
          console.log('Fail:', error.message);
        }
     
      }
      fetchPostList();
    }, [filters]);

   function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
   }

    function handleTodoClick(todo) {
      const index = todoList.findIndex( x => x.id === todo.id);
      if(index <0) return;
      const newTodoList =[...todoList];
      newTodoList.splice(index,1);
      setTodoList(newTodoList);
    }
    function handleTodoFormSubmit(formValues) {
      console.log('Form submit:', formValues);

      const newTodo= {
        id: todoList.length +1,
        ...formValues,
      }

      const newTodoList =[...todoList];
      newTodoList.push(newTodo);
      setTodoList(newTodoList);

    }
  return (
    <div className="app">
      <h1>Post List</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit}
      />
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}
  <PostList posts={postList}/>
  <Pagination
  pagination={pagination}
  onPageChange={handlePageChange}
  />
    </div>
  );
}

export default App;
