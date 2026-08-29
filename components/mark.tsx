import Image from "next/image";
import Link from "next/link";

export function Mark() {
  return (
    <Link href="/" className="mark" aria-label="Equity home">
      <Image src="/mark.svg" alt="" width={20} height={20} priority />
    </Link>
  );
}
