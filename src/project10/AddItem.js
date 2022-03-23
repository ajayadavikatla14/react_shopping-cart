import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const AddItem = ({items,deleteHandler,editHandler}) => {
  return (
    <>
      {
        items.map((e)=>{
          const {id,title}=e;
          return(
            <div key={id} className="total">
                <div className="title">
                    <div className="t">{title}</div>
                    <div className="btns">
                      <button className='btn-edit' onClick={()=>editHandler(id)} > <FaEdit  /> </button>&nbsp;
                      <button className='btn-del' onClick={()=>deleteHandler(id)}  > <FaTrash  /> </button>
                    </div>
                </div>
            </div>
          )
        })
      }
    </>
  )
}

export default AddItem