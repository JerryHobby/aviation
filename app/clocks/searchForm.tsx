'use client'
import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form"
import {useRouter} from "next/navigation";

type Inputs = {
    search: string
    exampleRequired: string
}

interface Props {
    search?: string

}

const SearchForm = ({search}: Props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const find = search ? decodeURIComponent(search) : '';

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/clocks/${data.search}`)
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}
            <label className='font-semibold pr-3'>Airport(s):</label>
            <input defaultValue={find}
                   className='text-sm bg-white p-0.5 mr-3 border border-gray-500 fill-accent rounded border-accent-focus' {...register("search", {required: true})} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button className='py-1 px-3 text-sm rounded bg-blue-700 text-white' type="submit">Airport(s)</button>
        </form>
    );
};

export default SearchForm;




