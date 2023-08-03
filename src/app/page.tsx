import Navigation from "@/pages/Navigation/Navigation";
import Main from "@/pages/Main/Main";
import Footer from "@/pages/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center">
        <Main></Main>
      </main>
      <footer className="flex justify-center">
        <Footer></Footer>
      </footer>
      <div className="fixed inset-x-0 bottom-6 flex items-center justify-center ">
        <Navigation />
      </div>
    </>
  );
}
