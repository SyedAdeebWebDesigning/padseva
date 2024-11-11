import { getAllNewsLetters } from "@/lib/actions/Newsletter.action";
import { INewsLetter } from "@/lib/database/model/Newsletter.model";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const data = await getAllNewsLetters();
  const newsletters = JSON.parse(JSON.stringify(data));
  return (
    <main>
      <div className={"p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}>
        {newsletters.map((newsletter: INewsLetter) => (
          <Link
            href={`/view-issues/${newsletter._id}`}
            key={newsletter._id}
            className={"bg-white shadow-lg rounded-md group p-4"}
          >
            <div className={"relative"}>
              <div
                className={
                  "relative flex w-full h-[500px] items-center justify-center group-hover:scale-105 transition-all duration-300"
                }
              >
                <Image
                  src={newsletter.issueCoverPhoto}
                  alt={"Cover Photo"}
                  fill
                  className={"object-contain rounded-t-md"}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default page;
