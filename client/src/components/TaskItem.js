import Modal from "./Modal"
// import './taskItem.css'

function TaskItem(props) {

  const {onClose, open, title, description}  = props;
  
  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
