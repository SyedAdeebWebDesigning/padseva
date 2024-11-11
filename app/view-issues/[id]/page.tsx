import { getNewsLetterById } from "@/lib/actions/Newsletter.action";
import { INewsLetter } from "@/lib/database/model/Newsletter.model";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Props) => {
  const data = await getNewsLetterById(params.id);
  const newsletter: INewsLetter = JSON.parse(JSON.stringify(data));
  return (
    <div>
      <iframe src={newsletter.issuePDF} />
    </div>
  );
};
export default Page;
