import { ChangeEvent, FormEvent, useState } from 'react';

interface FormValues {
    [key: string]: string;
}

type UseFormType = {
    formValues: FormValues;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent) => void;
}

const useForm = (initialValues: FormValues, onSubmit: (formValues: FormValues) => void): UseFormType => {

    const [formValues, setFormValues] = useState<FormValues>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev: FormValues) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    }

  return {formValues, handleChange, handleSubmit} 
}

export default useForm;