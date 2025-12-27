import { useState } from 'react'
import './index.css'


type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

function App() {

  const [items, setItems] = useState<Item[]>([]);
  const numPacked = items.filter((item) => item.packed).length;
  const numItems = items.length;

  function handleAddItem(item: Item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id))

  }

  function handleToggleItem(id: number) {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  // function handleClearList() {

  // }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats numPacked={numPacked} numItems={numItems} />
    </div>
  )
}

export default App



function Logo() {
  return <div className='logo'>
    <h1> 🌴Travel List 💼</h1>
  </div>
}

function Form({ onAddItem }: { onAddItem: (item: Item) => void }) {

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted");
    if (!description) return;
    onAddItem({
      id: Date.now(),
      description,
      quantity,
      packed: false
    })
    setDescription("");
    setQuantity(1);


  }


  return <form className='add-form' onSubmit={handleSubmit}>
    <h3>What do you need for your trip?</h3>
    <select name="" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
    <button>Add</button>
  </form>
}


function PackingList({ items, onToggleItem, onDeleteItem }: { items: Item[], onToggleItem: (id: number) => void, onDeleteItem: (id: number) => void }) {
  const [sortBy, setSortBy] = useState<'default' | 'description' | 'packed' | 'unpacked'>('default');

  let sortedItems;
  if (sortBy === 'default') {
    sortedItems = [...items];
  } else if (sortBy === 'description') {
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === 'packed') {
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
  } else if (sortBy === 'unpacked') {
    sortedItems = [...items].sort((a, b) => Number(b.packed) - Number(a.packed));
  }
  else {
    sortedItems = [...items];
  }

  return (
    <div className='list'>
      {sortedItems.length > 0 ? (
        <>
          <ul>
            {sortedItems.map((item) => (
              <PackingItem item={item} handleToggleItem={onToggleItem} onDeleteItem={onDeleteItem} />
            ))}
          </ul>
          <div className='actions'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'default' | 'description' | 'packed' | 'unpacked')}>
              <option value="default">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed items</option>
              <option value="unpacked">Sort by unpacked items</option>
            </select>
            <button>Clear list</button>
          </div>
        </>
      ) : (
        <p>No items in list</p>
      )}
    </div>
  )
}

function PackingItem({ item, handleToggleItem, onDeleteItem }: { item: Item, handleToggleItem: (id: number) => void, onDeleteItem: (id: number) => void }) {
  return <li key={item.id}>
    <input type="checkbox" checked={item.packed} onChange={() => handleToggleItem(item.id)} />
    <span style={{ textDecoration: item.packed ? "line-through" : "" }}>{item.quantity} {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}

function Stats({ numPacked, numItems }: { numPacked: number, numItems: number }) {
  return numItems > 0 ? (
    <footer className='stats'>
      <h3>Stats</h3>
      <p>{numItems} items in total</p>
      <p>{numPacked} items packed</p>
      <p>{Math.round(numPacked / numItems * 100)}% of list completed</p>
    </footer>
  ) : (
    <footer className='stats'>
      <h3>Stats</h3>
      <p>No items in list</p>
    </footer>
  )
}
