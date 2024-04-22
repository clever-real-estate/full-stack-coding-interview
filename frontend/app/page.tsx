import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-4xl font-bold text-center">Welcome to Next.js</h1>
          <p className="text-lg text-center mt-4">
          Get started by editing{" "}
          <code className="bg-gray-100 p-2 rounded-md">pages/index.tsx</code>
          </p>
          <div className="flex justify-center mt-8">
          <Image
            src="/nextjs.svg"
            alt="Next.js Logo"
            width={300}
            height={300}
          />
          </div>
        </div>
      </div>
     </div>
    </main>
  );
}
