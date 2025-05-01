import SubscribersData from "@/shared/components/dashboard/data/subscribers.data";

const Page = () => {
  return (
    <div className="flex flex-col h-screen max-w-[1920px] mx-auto">
      <div className="flex-shrink-0 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
          Subscribers
        </h1>
        <p className="pt-2 text-base md:text-lg text-gray-600">View and manage your subscribers</p>
      </div>
      <div className="flex-1 min-h-0 px-4 md:px-8">
        <SubscribersData />
      </div>
    </div>
  );
};

export default Page;
