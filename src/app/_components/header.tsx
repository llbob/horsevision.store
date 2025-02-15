import Link from "next/link";

interface HeaderProps {
  text?: string;
}

const Header = ({ text = "" }: HeaderProps) => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8">
      <Link href="/" className="hover:underline">
        {text}
      </Link>
    </h2>
  );
};

export default Header;
