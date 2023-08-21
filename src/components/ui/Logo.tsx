import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.webp";

export default function Logo() {
  return (
    <div className="container max-w-full flex">
      <Link href="/">
        <Image
          src={logo}
          alt="xGnarly logo image"
          decoding="async"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          priority
        />
      </Link>
    </div>
  );
}
