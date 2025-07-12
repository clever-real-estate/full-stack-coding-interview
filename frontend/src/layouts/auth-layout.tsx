export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <main className=" rounded-md flex flex-col max-h-full  overflow-auto mx-20  ">{children}</main>;
}
