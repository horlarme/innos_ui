import {Link, useNavigate} from "react-router";
import {twMerge} from "tailwind-merge";
import {type FormEvent, useState} from "react";
import {HTTPError} from "ky";
import {FormMessage} from "../components";
import type {IRegistrationData} from "../mutations";
import {useLoginMutation} from "../mutations";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function Login() {
    const navigate = useNavigate()

    const [error, _error] = useState<IValidationError<IRegistrationData> | null>(null)

    const {isPending, mutateAsync} = useLoginMutation()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        _error(null)

        mutateAsync({
            email: String(formData.get('email')),
            password: String(formData.get('password'))
        })
            .then(() => navigate('/'))
            .catch(async (e: HTTPError) => {
                if ('response' in e && e.response.status === 422) e.response.json<IValidationError<IRegistrationData>>().then(_error)
            })
    }

    return <div className={'w-full'}>
        <title>Login</title>
        <h1 className={'text-xl font-bold mb-4'}>Login</h1>
        <form className={'w-full'} onSubmit={handleSubmit}>
            <div className="space-y-3 grid grid-cols-1">
                <div className="space-y-1">
                    <label className="label block" htmlFor={'email'}>Email Address</label>
                    <InputText id={'email'} name={'email'} type="email" className={'input w-full'}
                           placeholder={'Email Address'}/>
                    <FormMessage error={error?.errors?.email}/>
                </div>
                <div className="space-y-1">
                    <label className="label block" htmlFor={'password'}>Password</label>
                    <InputText id={'password'} name={'password'} type="password" className={'input w-full'}
                           placeholder={'Password'}/>
                    <FormMessage error={error?.errors?.password}/>
                </div>

                <Button
                    label={'Login'}
                    loading={isPending}
                    className={twMerge("btn btn-block btn-primary")}>
                </Button>
                <p className="text-muted mt-2">
                    New User?&nbsp;
                    <Link className={'font-bold'} to={'/register'}>Create Account</Link>
                </p>
            </div>
        </form>
    </div>
}
