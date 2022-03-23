import React, { useEffect, useState } from 'react'
import AddItem from './AddItem';
import Alert from './Alert';
import './App.css';

const getLocalStorage=()=>{
    let list=localStorage.getItem('list');
    if(list){
        return JSON.parse(localStorage.getItem('list'))
    }
    else{
        return []
    }
}

const Main = () => {
    const [isEmpty,setIsEmpty]=useState(false);
    const [list,setList]=useState(getLocalStorage());
    const [editMode,setEditMode]=useState(false);
    const [name,setName]=useState('');
    const [editId,setEditId]=useState(null);
    const [alert,setAlert]=useState({
        show: false,
        type:'success',
        text:'',
    });

    useEffect(()=>{
        const timeout=setInterval(()=>{
            setIsEmpty(false);
        },2000)
        return ()=> clearTimeout(timeout)
    },[isEmpty])

    useEffect(()=>{
        const timeout=setInterval(()=>{
            setAlert({...alert,show:false});
        },2000)
        return ()=> clearTimeout(timeout)
    },[alert])

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(list));
    },[list])

    const submitHandler=(e)=>{
        e.preventDefault();
        if(!name){
            // alerting
            setIsEmpty(true);
            console.log('alerting');
        }
        else if(name && editMode){
           setList(
               list.map((item)=>{
                   if(item.id ===editId ){
                       return {...item,title:name}
                   }
                   return item;
               })
           )
           setName('')
           setEditId(null);
           setEditMode(false);
           setAlert({...alert,show:true,type:'edit'})
        }
        else{
            var newItem={
                id: new Date().getTime().toString(),
                title: name,
            }
            setList([...list,newItem]);
            console.log(list);
            setName('')
            setAlert({...alert,show:true,type:'success'})
            console.log(alert);
        }
    }

    const clearAll=()=>{
        setList([]);
        setAlert({...alert,show:true,type:'danger'})
        console.log(alert);
    }

    const deleteHandler=(id)=>{
        console.log(id);
        var afterDeleted=list.filter((e)=>(e.id)!==id)
        setList(afterDeleted);
        setAlert({...alert,show: true, type:'deleteItem'})
    }

    const editHandler=(id)=>{
        console.log(id);
        var exactVal=list.find((e)=>(e.id)===id);
        setEditMode(true);
        setEditId(id);
        setName(exactVal.title);
    }

  return (
    <>
        <div className="container">
            <div className='heading'>Shopping Items</div>
            <div className="alert">
                { alert.show && <Alert {...alert} />  }
            </div>
            <form className="total_form" onSubmit={submitHandler} >
                <div className="inpt">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={`${isEmpty ? 'Enter Valid Item' : 'eg. watch'}`}              className={`${isEmpty && 'empty'}`} />
                    <button type='submit' className='submit_btn' >{editMode ? 'Edit' : 'Submit'}</button>
                </div>
               
            </form>
            { list.length > 0 ?
            <div className="items">
                <div className="each_item">
                    <AddItem items={list} deleteHandler={deleteHandler} setIsEmpty={setIsEmpty} editHandler={editHandler}  />
                </div>
                <div className="clear">
                    <button className='clear-all' onClick={()=>clearAll()} >Clear Items</button>
                </div>
            </div>
            : null }
        </div>
    </>
  )
}

export default Main