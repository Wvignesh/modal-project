import  { useState,useEffect} from 'react';

const getStorageData = (keyName:any, defaultValue:any) =>{
  const savedItem = localStorage.getItem(keyName);
const parsedItem = JSON.parse(savedItem?? '');
return parsedItem || defaultValue;
}
 
export const useLocalStorage = (keyName:any, initialValue:any) => {
  const [value, setValue] = useState(() => {
    return getStorageData(keyName, initialValue);
  });
   
useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [keyName, value]);
 
return [value, setValue];
}