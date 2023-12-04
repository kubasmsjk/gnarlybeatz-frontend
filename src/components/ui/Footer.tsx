export default function Footer() {
  return (
    <div className="mt-auto">
      <div className="bg-black w-[20.5rem] sm:w-[30rem] h-[2.8rem] sm:h-14 mt-auto mx-auto rounded-t-3xl border-t-2 border-[#8A0303]"></div>
      <footer className="mt-auto bg-black">
        <div className="container mx-auto max-w-full flex justify-center items-center">
          <p>
            <small>&copy; Copyright {new Date().getFullYear()}, xGnarly</small>
          </p>
        </div>
      </footer>
    </div>
  );
}
