"use client"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import moment from "moment"
import { useAppContext } from "@/Contexts/AppContext"
import { Calendar } from "@/Components/ui/calendar"
import { useForm } from "@inertiajs/react"
import Select from 'react-select';
import { FaFilter } from "react-icons/fa6"
import TextInput from "../TextInput"

export function DatePicker({ url, select }: any) {
  const { setFilterDate, filterDate } = useAppContext();

  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { data, setData, post, get, processing, errors } = useForm({
    dt: '',
    st: ''
  });
  useEffect(() => {
    if (date) {
      setFilterDate(moment(date));
    }
  }, [date, setFilterDate])


  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(data);

    get(route(url));
  }

  const changeStatus = (selected: any) => {
    setData('st', selected?.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-start gap-2"
    >
      <TextInput
        type="date"
        id="model"
        className="mt-1 block w-full"
        value={data.dt}
        onChange={(e) => setData('dt', e.target.value)}
        autoComplete="model"
      />

      <Select
        menuPosition='fixed'
        options={select}
        onChange={changeStatus}
        placeholder="Filtrar por status"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '15px',
            paddingTop: '2px',
            paddingBottom: '2px',
            marginTop: '0px',
            borderRadius: '6px',
            width: '250px'
          }),
          dropdownIndicator: (base) => ({
            ...base,
            paddingTop: '1px',
            paddingBottom: '1px',
          }),
          menuList: (base) => ({
            ...base,
            fontSize: '14px'
          }),
        }}
      />
      <button type="submit" disabled={processing}>
        <div className="mx-2 text-gray-500">
          <FaFilter size={20} />
        </div>
      </button>
    </form>
  )
}
