import { stripeSubscribe } from "@/actions/stripe.subscribe";
import { GrowPlan, freePlan, scalePlan } from "@/app/configs/constants";
import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const PricingCard = ({ active }) => {
  const { user } = useUser();
  const history = useRouter();

  const handleSubscription = async ({ price }) => {
    const res = await stripeSubscribe({ price, userId: user?.id });
    history.push(res);
  };

  return (
    <div id="pricing-section" className="w-full md:flex items-start justify-around py-8">
      {/* Free Plan */}
      <div className="md:w-[400px] bg-white rounded p-5 my-5 md:my-0">
        <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
          Launch
        </h5>
        <div className="border-b pb-8 border-[#000]">
          <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">$0</h5>
          <p className="text-lg">No commitment</p>
        </div>
        <div className="pt-5">
        <p className="text-xl">{"What's included..."}</p>

        </div>
        {freePlan.map((i, index) => (
          <div key={index} className="flex w-full items-center py-4">
            <span className="text-xl">{ICONS.right}</span>
            <p className="pl-2 text-lg">{i.title}</p>
          </div>
        ))}
        <Button color="primary" className="w-full text-xl !py-6">
          Get Started
        </Button>
        <p className="pt-1 opacity-[.7] text-center">30-day free trial of Scale features.</p>
      </div>

      {/* Grow Plan */}
      <div className="md:w-[400px] bg-white rounded p-5 my-5 md:my-0">
        <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
          Grow
        </h5>
        <div className="border-b pb-8 border-black">
          <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">
            ${active === "Monthly" ? "49" : "42"} /month
          </h5>
          <p className="text-lg">Billed {active}</p>
        </div>
        <div className="pt-5">
          <p className="text-xl">Everything in Launch, plus...</p>
        </div>
        {GrowPlan.map((i, index) => (
          <div key={index} className="flex w-full items-center py-4">
            <span className="text-xl">{ICONS.right}</span>
            <p className="pl-2 text-lg">{i.title}</p>
          </div>
        ))}
        <Button
          color="primary"
          className="w-full text-xl !py-6"
          onClick={() =>
            handleSubscription({
              price: active === "Monthly" ? "prod_RsxcZsVWW9idWq" : "prod_RsxgkTiyvS5Qi1",
            })
          }
        >
          Get Started
        </Button>
        <p className="pt-1 opacity-[.7] text-center">
          30-day free trial of Scale features, then ${active === "Monthly" ? "42" : "49"}/mo
        </p>
      </div>

      {/* Scale Plan */}
      <div className="md:w-[400px] bg-white rounded p-5 my-5 md:my-0">
        <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
          Scale
        </h5>
        <div className="border-b pb-8 border-[#000]">
          <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">
            ${active === "Monthly" ? "99" : "84"} /month
          </h5>
          <p className="text-lg">Billed {active}</p>
        </div>
        <div className="pt-5">
          <p className="text-xl">Everything in Grow, plus...</p>
        </div>
        {scalePlan.map((i, index) => (
          <div key={index} className="flex w-full items-center py-4">
            <span className="text-xl">{ICONS.right}</span>
            <p className="pl-2 text-lg">{i.title}</p>
          </div>
        ))}
        <Button
          color="primary"
          className="w-full text-xl !py-6"
          onClick={() =>
            handleSubscription({
              price: active === "Monthly" ? "prod_RsxeIgCFNiVPh7" : "prod_Rsxj5pjrOFy5j9",
            })
          }
        >
          Get Started
        </Button>
        <p className="pt-1 opacity-[.7] text-center">
          30-day free trial of Scale features, then ${active === "Monthly" ? "99" : "84"}/mo
        </p>
      </div>
    </div>
  );
};

export default PricingCard;
