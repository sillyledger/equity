import Image from "next/image";
import Link from "next/link";

export function Mark() {
  return (
    <Link href="/" className="mark" aria-label="Equity home">
      <Image src="/mark.svg" alt="" width={76} height={76} priority />
      <span className="mark-word rs">
        Equity<b>.</b>
      </span>
    </Link>
  );
}
