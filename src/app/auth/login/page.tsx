import Navbar from './Navbar'
import LoginForm from './LoginForm'
// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next"
import { getCsrfToken } from "next-auth/react"

export default async function SignIn() {
  const csrfToken: string | undefined  = await getCsrfToken();
  return (
    <div className = "flex flex-col items-center justify-content">
        <Navbar/>
        <LoginForm csrfToken = {csrfToken}/>
    </div>
  )
}

