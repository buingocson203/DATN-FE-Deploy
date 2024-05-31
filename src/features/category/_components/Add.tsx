
import { useToast } from '../../../components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useCategoryMutation } from '@/hooks/useAdmCategoryMutation'


const AddCategory = () => {
    const { toast } = useToast()
    const { form, onSubmit } = useCategoryMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chuc mung thanh nien',
                description: 'Them danh mục thanh cong'
            })
            form.reset()
        }
    })
    return (
        <div className='border p-6'>
            <h2 className='text-xl font-bold'>Them danh muc</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ten danh muc</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ten danh muc' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit'>Them</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddCategory