import React from 'react'

const Alert = ({show,type}) => {

   if(show && type==='success') { 
    return <div style={{color:'green'}} >Item added....</div> 
    } 
   else if(type==='danger'){
     return<><div style={{color:'red'}}>data deleting..</div> </>
   }
   else if(type==='deleteItem'){
     return <div style={{color:'#de52a8'}} >Item deleted...</div>
   }
   else if(type==='edit'){
    return <div style={{color:'#de52a8'}} >Item edited...</div>
  }
}

export default Alert