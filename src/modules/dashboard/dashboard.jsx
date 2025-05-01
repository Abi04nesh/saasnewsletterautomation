import Main from "./elements/main/main";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex w-full h-full">
        <div className="flex-1 overflow-auto">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
