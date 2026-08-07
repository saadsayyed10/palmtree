import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full lg:p-6">
      <header className="flex justify-between items-center w-full">
        <h1 className="lg:text-3xl font-semibold">PalmTree</h1>
        <div className="flex justify-end items-end w-full lg:gap-x-6 text-neutral-600 font-medium">
          <Link href={"/support"}>Support</Link>
          <Link href={"/documentation"}>Documentation</Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
