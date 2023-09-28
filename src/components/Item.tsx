import {useEffect, useRef, useState} from "react";

interface ItemProps
{
   value: string
   // index: number
   isFocus?: boolean
   onRemove?: () => void
   onSave?: (newValue: string) => void
   onChange?: (newValue: string) => void
}

function Item(props: ItemProps)
{
   const [value, setValue] = useState(props.value ?? "")
   const [isFocus, setIsFocus] = useState(props.isFocus)
   const inputEditRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (props.isFocus) handleEditFocus()
   }, [props.isFocus]);

   useEffect(() => {
      setValue(props.value)
   }, [props.value]);

   useEffect(() => {
      props.onChange && props.onChange(value)
   }, [value]);

   const handleEditFocus = () => {
      setIsFocus(true)
      inputEditRef.current?.focus()
      inputEditRef.current?.select()
   }

   const handleEditChange = (newValue: string) => {
      setValue(newValue)
   }

   const handleEditBlur = () => {
      setIsFocus(false)
      props.onSave && props.onSave(value)
   }

   return (
      <article className={"flex items-center w-full"}>
         <div className={`${isFocus ? "border-[1px] border-gray-700" : "bg-gray-200"} box-border w-full flex items-center`}>
            <input
               ref={inputEditRef}
               value={value}
               onChange={(e) => handleEditChange(e.target.value)}
               onFocus={handleEditFocus}
               onBlur={handleEditBlur}
               className={`w-full pl-3 py-3 bg-transparent focus:border-0 focus:outline-0`}/>
            <button className={`p-3 ${isFocus || "hidden"}`}>O</button>
         </div>
         <button onClick={props.onRemove} className={"p-3"}>X</button>
      </article>
   )
}

export default Item