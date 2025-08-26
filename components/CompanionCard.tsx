import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        {/* <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button> */}
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} mins</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch lesson
        </button>
      </Link>
    </article>
    // <div className="relative max-w-xs p-3 bg-cyan-100 text-gray-800 rounded-2xl rounded-br-none">
    //   Hello! This is a chat message.
    //   <div
    //     className="absolute right-0 bottom-0 w-0 h-0
    //           border-t-[12px] border-t-cyan-100
    //           border-r-[12px] border-r-transparent"></div>
    // </div>
  );
};

export default CompanionCard;
