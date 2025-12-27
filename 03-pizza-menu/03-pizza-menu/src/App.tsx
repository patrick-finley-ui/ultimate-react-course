import './App.css'


const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

type PizzaProps = {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
}



function App() {
  return (
    <>
      <h1>Our Menu</h1>
      {pizzaData.map(pizza => <Pizza key={pizza.name} name={pizza.name} ingredients={pizza.ingredients} price={pizza.price} photoName={pizza.photoName} />)}
    </>
  )
};


function Pizza(props: PizzaProps) {
  return (
    <div>
      <img src={props.photoName} alt={props.name} width={200} />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.price}</span>
    </div>
  )
}

export default App
