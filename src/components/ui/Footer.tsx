export default function Footer() {
  return (
    <footer className="mt-auto bg-black">
      <div className="container mx-auto max-w-full flex justify-center items-center">
        <p>
          <small>&copy; Copyright {new Date().getFullYear()}, xGnarly</small>
        </p>
      </div>
    </footer>
  );
}
