"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import UserIcon from "@/public/assets/icons/user.svg"
import EmailIcon from "@/public/assets/icons/email.svg"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { create } from "domain"
import { useRouter } from "next/navigation"

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
 
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({ name, email, phone} : z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    
    try {
      //Below three lines are the lines for database connectivity
      // const userData = { name, email, phone }

      // const user = await createUser(userData);

      // if(user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        
        <CustomFormField
            fieldType={FormFieldType.INPUT} 
            control={form.control}
            name = "name"
            label = "Full name"
            placeholder = "John Doe"
            iconSrc={UserIcon}
            iconAlt="user"
        />

        <CustomFormField
            fieldType={FormFieldType.INPUT} 
            control={form.control}
            name = "email"
            label = "Email"
            placeholder = "johndoe@gmail.com"
            iconSrc={EmailIcon}
            iconAlt="email"
        />

        <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT} 
            control={form.control}
            name = "phone"
            label = "Phone number"
            placeholder = "123-456-7890"
        />


        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm