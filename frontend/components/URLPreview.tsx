import useSwr from "swr";
import axios from "axios";

const URLPreview: React.FC<{ url: string }> = ({ url }) => {
  const {
    data: { data },
  }: any = useSwr(
    url,
    async () => {
      return await axios.get("/api/url-preview", {
        params: {
          url,
        },
      });
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      suspense: true,
    }
  );

  if (!data) {
    return null;
  }

  const { title, image, description, siteName } = data;

  if (!title) {
    return null;
  }

  return (
    <div className="justify-between mt-4 border-l-2 p-2 border-blue-400 bg-blue-100 ">
      <div className="flex flex-col">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 font-bold hover:underline mb-1"
        >
          {siteName}
        </a>
        <p className="text-gray-800 font-bold mb-1">{title}</p>
        <p className="text-gray-600 text-xs mb-2">{description}</p>
        <div
          className="w-full h-24 sm:h-52 bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
};

export default URLPreview;
