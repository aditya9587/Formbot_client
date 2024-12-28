import React from 'react'
import style from "./DeleteModal.module.css"

export default function DeleteModal({closeDeleteModal, deleteFolder}) {
  return (
    <div className={style.deleteModal}>
      <h3>Are you sure you want to delete this folder ?</h3>
      <div className={style.button}>
        <button className={style.create} onClick={deleteFolder}>Confirm</button>
        <hr />
        <button onClick={closeDeleteModal}>Cancel</button>
      </div>
      
    </div>
  )
}
