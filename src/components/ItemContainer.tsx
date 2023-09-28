import {useEffect, useState} from "react";
import Item from "./Item";

function ItemContainer()
{
   const [isAddNew, setIsAddNew] = useState(false)
   const [data, setData] = useState([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f"
   ])

   useEffect(() => {
      console.log(data)
   }, [data]);

   const handleTriggerAddNew = () => {
      setIsAddNew(true)
   }

   const handleCompleteAddNew = (newValue: string) => {
      setIsAddNew(false)
      setData((pre) => {
         return [...pre, newValue]
      })
   }

   const handleRemoveItem = (index: number) => {
      setData((pre) => {
         const data = [...pre]
         data.splice(index, 1)
         return data
      })
   }

   const handleChangeItem = (index: number) => {
      return (newValue: string) => {
         setData((pre) => {
            const newData = [...pre]
            newData[index] = newValue
            return newData
         })
      }
   }

   return (
      <section>
         <section className={"flex flex-col gap-2 w-[300px]"}>
            {data.map((value, index) => <Item onRemove={() => handleRemoveItem(index)} onChange={handleChangeItem(index)} key={index} value={value}/>)}
            {isAddNew && <Item value={"new item"} onSave={handleCompleteAddNew} isFocus={true}/>}
         </section>
         <button onClick={handleTriggerAddNew} className={"px-3 py-2 bg-green-600 mt-3"}>New</button>
      </section>
   )
}

export default ItemContainer