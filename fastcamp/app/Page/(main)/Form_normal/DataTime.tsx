"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";

import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker() {

  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="relative
    w-[281px]
    h-[30px]
    bg-white
    border
    border-gray-300
    rounded-xl">
        <DatePicker selected={date} onChange={(date: Date | null) => setDate(date)} placeholderText="เลือกวันที่จัดกิจกรรม" popperPlacement="bottom-end" className="w-[281px] h-[30px] pl-3 pr-9 bg-[#F3F4F6] border border-gray-300 rounded-xl text-sm"/>
        <Image src="/calendar 2.png" width={16} height={16} alt="calendar" className="absolute right-3 top-[7px] opacity-60 pointer-events-none "/>
    </div>
  );

}