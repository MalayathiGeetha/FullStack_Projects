import {Button} from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import {Form,FormField,FormControl,FormItem,FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import {Avatar,AvatarFallback} from '@/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { createComment } from '@/Redux/Comment/Action'
import { useParams } from 'react-router-dom'


const CreateCommentForm=({issueId})=>{

    const dispatch=useDispatch()
    const form=useForm({
        defaultValues:{
            content:"",
        }
            
    })
    const onSubmit=(data)=>{
        dispatch(createComment({content:data.content,issueId}))
        console.log("create project data ",data);
    }
    return(
        <div>
            <Form  {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="content"
                        render={({field}) =>
                        (<FormItem>
                            <div  className="flex gap-2">
                                <div>
                                <Avatar>
                                    <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                                </div>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="w-[20rem]"
                                        placeholder="add comment here..."/>
                                </FormControl>
                               
                            </div>
                            <FormMessage/>
                        </FormItem>
                     )}
                    />
                        <Button type="submit">
                            save
                        </Button>
                </form>
            </Form>
            
        </div>
    )
}
export default CreateCommentForm