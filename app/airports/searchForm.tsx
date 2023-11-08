'use client'
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {useRouter} from "next/navigation";
import {Button} from "@radix-ui/themes";

type Inputs = {
    search: string
    exampleRequired: string
}

interface Props {
        search?: string

}
const SearchForm = ({search}:Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const find = search ? decodeURIComponent(search) : '';

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/airports/${data.search}`)
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue={find} className='bg-white p-0.5 mr-3 border border-gray-500 fill-accent rounded border-accent-focus' {...register("search", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button className='p-2 rounded bg-blue-700 text-white' type="submit">Search</button>
        </form>
    );
};

export default SearchForm;




