import {Link, useNavigate} from "react-router";
import {useRegistrationMutation, type IRegistrationData} from "../mutations/auth/register";
import {twMerge} from "tailwind-merge";
import {type FormEvent, useState} from "react";
import {HTTPError} from "ky";
import { FormMessage } from "../components";

export default function Register() {
    const navigate = useNavigate()

    const [error, _error] = useState<IValidationError<IRegistrationData>|null>(null)

    const {isPending, mutateAsync} = useRegistrationMutation()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        _error(null)

        mutateAsync({
            email: String(formData.get('email')),
            name: String(formData.get('name')),
            password: String(formData.get('password'))
        })
            .then(() => navigate('/'))
            .catch(async (e: HTTPError) => {
                console.log('->>Error', e)

                if ('response' in e) {
                    if (e.response.status === 422) e.response.json<IValidationError<IRegistrationData>>().then(_error)
                }
            })
    }

    return <div className={'w-full'}>
        <title>Create Account</title>
        <h1 className={'text-xl font-bold mb-4'}>Create Account</h1>
        <form className={'w-full'} onSubmit={handleSubmit}>
            <div className="space-y-3 grid grid-cols-1">
                <div className="space-y-1">
                    <label htmlFor={'name'} className="label block">Full Name</label>
                    <input name={'name'} id={'name'} type="name" className={'input w-full'} placeholder={'Full Name'}/>
                    <FormMessage error={error?.errors?.name} />
                </div>
                <div className="space-y-1">
                    <label className="label block" htmlFor={'email'}>Email Address</label>
                    <input id={'email'} name={'email'} type="email" className={'input w-full'} placeholder={'Email Address'}/>
                    <FormMessage error={error?.errors?.email} />
                </div>
                <div className="space-y-1">
                    <label className="label block" htmlFor={'password'}>Password</label>
                    <input id={'password'} name={'password'} type="password" className={'input w-full'} placeholder={'Password'}/>
                    <FormMessage error={error?.errors?.password} />
                </div>

                <button className={twMerge("btn btn-block btn-primary", isPending && "btn-disabled")}>
                    {isPending ? <span className="loading loading-spinner"/> : null}
                    Register
                </button>
                <p className="text-muted">
                    Already have an account?&nbsp;
                    <Link className={'btn-link font-bold'} to={'/login'}>Login</Link>
                </p>
            </div>
        </form>
    </div>
}
