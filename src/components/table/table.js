import { useState, useEffect, useRef } from "react";
import './table.css';
import { v4 as uuidv4 } from 'uuid';

const foodList = [
    {
        name : "Menudo Grande",
        price: 110,
    },
    {

        name : "Menudo Mediano",       
        price: 100,
    },
    {
        name : "Menudo Chico",       
        price: 90,
    },
    {
        name : "Menudo Mini",      
        price: 60,
    },
    {
        name : "Gordita con guisado",       
        price: 40,
    },
    {
        name : "Gordita sin guisado",       
        price: 35,
    },
    {
        name : "Gordita con tripas",       
        price: 55,
    },
    {
        name : "Quesadilla sola",       
        price: 22,
    },
    {
        name : "Quesadilla con guisado",       
        price: 30,
    },
    {
        name : "Quesadilla con tripas",       
        price: 45,
    },
    {
        name : "Sope con guisado",       
        price: 40,
    },
    {
        name : "Sope sin guisado",       
        price: 35,
    },
    {
        name : "Sope con tripas",       
        price: 55,
    },
    {
        name : "Taco de guisado",       
        price: 22,
    },
    {
        name : "Taco de tripas",       
        price: 40,
    },
    {
        name : "Taco de guisado",       
        price: 22,
    }, 
    {
        name : "Chilaquiles",       
        price: 75,
    },
    {
        name : "1/2 Chilaquiles",       
        price: 45,
    },
    {
        name : "Orden Flautas",       
        price: 75,
    },
    {
        name : "Pieza Flauta",       
        price: 20,
    },
    {
        name : "Huevo al gusto",       
        price: 60,
    },
    {
        name : "Huevo pieza",       
        price: 15,
    },
    {
        name : "Pan dulce",       
        price: 15,
    },
    {
        name : "Cafe Taza",       
        price: 20,
    },
    {
        name : "Cafe Litro",       
        price: 35,
    },  
    {
        name : "Agua Chica",       
        price: 20,
    },
    {
        name : "Agua grande",       
        price: 30,
    },
    {
        name : "Agua Jarra",       
        price: 100,
    }, 
    {
        name : "Refresco",       
        price: 25,
    },
    {
        name : "Jugo mini",       
        price: 20,
    },
    {
        name : "Jugo 1/2",       
        price: 35,
    },
    {
        name : "Jugo 1Lt",       
        price: 70,
    },
    {
        name : "Tortilla docena",       
        price: 15,
    },
    {
        name : "Tortilla paquete",       
        price: 30,
    },
    {
        name : "Vaso salsa",       
        price: 18,
    },
    {
        name : "1/2 Salsa",       
        price: 40,
    }, {
        name : "Vaso guacamole",       
        price: 25,
    },
    {
        name : "1/2 guacamole",       
        price: 50,
    },
    {
        name : "otro",      
        price: 0,
    }, 
];
function Table(){
    const [selectedOption,setSelectedOption] = useState(""); 
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [total,setTotal] = useState(0);
    const [foodTable, setFoodTable] = useState([]);
    const [otherPrice,setOtherPrice] = useState('');
    const [resetFlag, setResetFlag] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const inputRef = useRef(null);

    useEffect(()=>{
        document.title= pageTitle;
    },[pageTitle]);

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
        const selectedFood = foodList.find(food => food.name === event.target.value);
//      console.log(otherPrice);
        setSelectedPrice(selectedFood ? selectedFood.price : 0);
        setPrice(selectedFood ? selectedFood.price : 0);       
      }


    const handleAdd = ()  => {   
        setTotal(prevTotal => prevTotal+price);
        
        const newFood = {
            id:uuidv4(),
            name:selectedOption,
            price:price
        };
        setFoodTable(prevFoodTable => [...prevFoodTable,newFood]);
        setOtherPrice(NaN);
        setResetFlag(true);
    }

    useEffect( () => {
        inputRef.current.value = '';
        setResetFlag(false);
    }, [resetFlag]);

    useEffect( () => { 
        console.log(otherPrice);
        if(isNaN(otherPrice)){
        console.log("entro a NaN");
        const selectedFood = foodList.find(food => food.name === selectedOption);
        console.log(selectedFood);
        setPrice(selectedFood ? selectedFood.price : 0); 
        }else{
            setPrice(otherPrice);
        }
            },[otherPrice, resetFlag]);

    const handleOtherPrice = (event) => {
        const value = parseInt(event.target.value);
        setOtherPrice(value);
    }
    const handleDelete = (foodItem) => { 
        const isConfirmed = window.confirm('Quieres Eliminar? ...');
        if (isConfirmed) {
            setTotal(prevTotal => prevTotal-foodItem.price);
            setFoodTable(foodTable.filter(item => item.id !== foodItem.id));
        }
    }; 
    const handlePageTitle = (event) => {
        const tempTitle = event.target.value;
        setPageTitle(tempTitle);
    };
    useEffect(() => {
        const handleWindowClose = (event) => {
          // Cancela el cierre de la ventana o pestaña
          event.preventDefault();
          // Muestra un mensaje de confirmación personalizado
          const confirmationMessage = '¿Estás seguro de que quieres salir?';
          event.returnValue = confirmationMessage; // Requerido por Chrome
          return confirmationMessage;
        }
        window.addEventListener('beforeunload', handleWindowClose);
 
        // Remueve el evento beforeunload al desmontar el componente
        return () => {
          window.removeEventListener('beforeunload', handleWindowClose);
        };
      }, []); 

    return <> 
    
    <div className="header">
    <input type="text" id="IdTable" onChange={handlePageTitle} ></input>
    <a id="btnNewTable" href="/"target="_blank"><button>Nueva Mesa</button></a>
   
    </div>
    <div className="container">
        <div className="leftColumn">
            <div className="foodSelection">
            <select id="food" onChange={handleSelect} >
            <option value="">-- selecciona --</option>
                { foodList.map((item,index)=>(
                    <option value={item.name} key={item.index}>{item.name}</option>
                ))}
            </select>
            <label id="price">{selectedPrice}</label>
            <input type="number" id="otherPrice" value={otherPrice} ref={inputRef} onChange={handleOtherPrice}></input>
            </div> 
            <div className="btnAddContainer">              
            <button id="btnAdd" onClick={handleAdd} >Agregar</button> 
            </div>                    
        </div>
        <div className="rightColumn">
            
            <div id="foodList">
            {foodTable.map((item,index)=>(
                <div id="foodListItem">
                    <div id="div"></div>
                    <label id="listName">{item.name}</label>
                    <label id="listPrice">{item.price}</label>
                    <button id="btnDeleteFood" onClick={() => handleDelete(item)} >borrar</button>
                    <div id="div"></div>
                </div>
            ))}
            </div>
            <div className="totalLabel">
                <label id="total">{total}</label>
            </div>
        </div>
    </div>  
     </>
}
export default Table;