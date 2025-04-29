import SubscribersData from "@/shared/components/dashboard/data/subscribers.data";

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 p-5">
        <h1 className="text-2xl font-medium">
          Subscribers
        </h1>
        <p className="pt-1 text-lg">View and manage your subscribers</p>
      </div>
      <div className="flex-1 min-h-0">
        <SubscribersData />
      </div>
    </div>
  );
};

export default Page;
