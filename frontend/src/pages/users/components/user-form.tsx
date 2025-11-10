import type { UseFormReturn } from "react-hook-form";

const UserForm = ({ methods, onSubmit }: { 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	methods: UseFormReturn<any>, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void 
}) => {

	return (<div>
		<form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
					Name
				</label>
				<input
					type="text"
					id="name"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="name"
					{...methods.register("name")}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
					Username
				</label>
				<input
					type="text"
					id="username"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="username"
					{...methods.register("username")}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
					Password
				</label>
				<input
					type="password"
					id="password"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="password"
					{...methods.register("password")}
				/>
			</div>
			<div className="flex justify-end">
				<button
					className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
					type="submit"
				>
					submit
				</button>
			</div>
		</form>
	</div >);

}


export default UserForm;
