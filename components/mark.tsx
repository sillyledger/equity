import Image from "next/image";
import Link from "next/link";

export function Mark() {
  return (
    <Link href="/" className="mark" aria-label="Equity home">
      <Image src="/mark.svg" alt="" width={32} height={32} priority />
    </Link>
  );
}
