import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Route, Routes } from "react-router";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<h1 className="text-2xl">test</h1>} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</QueryClientProvider>
	)
}



type LoginPayload = {
	username: string
	password: string
}

const Login = () => {
	const [loginData, setLoginData] = useState<LoginPayload>({
		username: "",
		password: "",
	})


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setLoginData((prev) => ({
			...prev,
			[name]: value,
		}))
	}


	const mutation = useMutation({
		mutationFn: async (payload: LoginPayload) => {
			const response = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST", body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json"
				}
			})

			const { data, error, } = await response.json()
			if (!response.ok) {
				console.log(response)
				throw new Error(error.message)
			}
			return data
		},
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.log(error)
		}
	})

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100" >
			<div className="shadow-md p-8 bg-white rounded min-w-[500px]">
				<h1 className="text-2xl text-center">Login</h1>
				<div className="flex flex-col gap-4 mt-4">
					<input className="input" placeholder="username" value={loginData.username} name="username" onChange={onChange} />
					<input className="input" placeholder="password" value={loginData.password} name="password" type="password" onChange={onChange} />
					<button className="w-full" onClick={() => mutation.mutate(loginData)}>login</button>
				</div>
			</div>
		</div >
	)
}


export default App
