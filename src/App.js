import React, { useState } from 'react'

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
      setItems((items)=>[...items, newItem]);
  }

  function handleDeleteItems(id) {
     setItems((items)=>items.filter((item)=>item.id !== id))
  }

  function handleCheckBox(id) {
    setItems((items)=>items.map((item)=>item.id === id ? {...item, packed:!item.packed} : item))
 }
  return (
    <div className='app'>
       <Logo/>
       <Form onAddItems = {handleAddItems}/>
       <PackingList items={items} onDeleteItems={handleDeleteItems} onCheck={handleCheckBox}/>
       <Stats/>
    </div>
  )
}

function Logo() {
   return <h1>😊Far Away 😶‍🌫️</h1>
}

function Form({onAddItems}) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;

    const newItem = {description, quantity, id:Date.now(), packed:false}
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1); 
  }

  return <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip?</h3>
      <select value={quantity} onChange={(e)=> {setQuantity(Number(e.target.value))}}>
         <option value={1}>1</option>
         <option value={2}>2</option>
         <option value={3}>3</option>
         <option value={4}>4</option>
         <option value={5}>5</option>
      </select>
      <input type='text' placeholder='Item...' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <button>Add</button>
  </form>
}

function PackingList({items, onDeleteItems, onCheck}) {
  return <div className='list'>
  <ul>
       {
        items.map((item)=><Item item={item} onDeleteItems={onDeleteItems} onCheck={onCheck} key={item.id}/>)
       }
   </ul>
   </div>
} 

function Item({item, onDeleteItems, onCheck}) {
  
   return <li>
    <input type='checkbox' value={item.packed} onChange={()=>onCheck(item.id)}/>
    <span style={item.packed ? {textDecoration:"line-through"} : {}}>
     {item.quantity} {item.description} 
    </span>
    <button onClick={()=>onDeleteItems(item.id)} style={{color:"red"}}>X</button>
    </li>
}


function Stats() {
 return <footer className='stats'>
       <em>
          😶‍🌫️ You have X items on your list, and you have already packed X (X%)
       </em>
   </footer>
}