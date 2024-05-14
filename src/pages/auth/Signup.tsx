import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuthMutation from "@/hooks/useAuthMutation"

const Signup = () => {
  const { form, onSubmit } = useAuthMutation({
    action: "SIGN UP",
    onSuccess: () => {
      console.log(" Dang ki thanh cong")
    }
  })
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem>
               <FormLabel>Email</FormLabel>
              <FormControl>
               
                <Input type="email" {...field} placeholder="Email cua  ban" />
               
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Mat khau</FormLabel>
              <FormControl>
                
                <Input type="password" {...field} placeholder="Password cua  ban" />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button variant="destructive" type="submit">Dang ky</Button>
        </form>
      </Form>
    </div>
  )
}

export default Signup