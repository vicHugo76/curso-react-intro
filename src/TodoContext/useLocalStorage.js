import React from 'react'

// **** Custom Hook Local Storage ****

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
  
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
        setLoading(false);
      } catch(error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  }, [itemName]);
    

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item, 
    saveItem,
    loading, 
    error
  };
}

export { useLocalStorage };

// localStorage.removeItem('Tareas_v1');

// const defaultTodos = [{
//   text: 'Cortar cebolla',
//   completed: true
// },
// {
//   text: 'Tomar el curso de Intro a React.js',
//   completed: false
// },
// {
//   text: 'Llorar con la llorona',
//   completed: false
// },
// {
//   text: 'LALALALALA',
//   completed: false
// },
// {
//   text: 'Usar estados derivados',
//   completed: true
// }];

// localStorage.setItem('Tareas_v1', JSON.stringify(defaultTodos));