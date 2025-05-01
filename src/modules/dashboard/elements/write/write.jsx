"use client";

import { deleteEmail } from "@/actions/delete.email";
import { getEmails } from "@/actions/get.emails";
import { ICONS } from "@/shared/utils/icons";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Write = () => {
  const [emailTitle, setEmailTitle] = useState("");
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useClerk();

  const handleCreate = () => {
    if (emailTitle.length === 0) {
      toast.error("Enter the email subject to continue!");
    } else {
      const formattedTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-email?subject=${formattedTitle}`);
    }
  };

  useEffect(() => {
    FindEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const FindEmails = async () => {
    await getEmails({ newsLetterOwnerId: user?.id })
      .then((res) => {
        setEmails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHanlder = async (id) => {
    await deleteEmail({ emailId: id }).then((res) => {
      FindEmails();
    });
  };

  return (
    <div className="max-w-[1920px] mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <div
          className="bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-all p-6 aspect-[4/3] flex flex-col items-center justify-center group"
          onClick={() => setOpen(!open)}
        >
          <div className="transform transition-transform group-hover:scale-110">
            <span className="text-3xl block text-center mb-4 text-gray-600">{ICONS.plus}</span>
            <h5 className="text-2xl font-medium text-gray-800">Create New</h5>
          </div>
        </div>

        {/* Saved Emails */}
        {emails?.map((i) => {
          const formattedTitle = i?.title?.replace(/\s+/g, "-").replace(/&/g, "-");
          return (
            <div
              key={i?._id}
              className="bg-white rounded-xl border hover:border-gray-300 group transition-all p-6 aspect-[4/3] relative flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-xl text-gray-800 line-clamp-2">{i.title}</h3>
                <button
                  onClick={() => deleteHanlder(i?._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                >
                  {ICONS.delete}
                </button>
              </div>
              
              <Link
                href={`/dashboard/new-email?subject=${formattedTitle}`}
                className="mt-auto flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Open</span>
                <span className="ml-2">{ICONS.rightArrow}</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Create New Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {ICONS.cross}
            </button>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Create New Email</h2>
                <p className="text-gray-600 mt-1">Enter a subject for your email campaign</p>
              </div>

              <input
                type="text"
                name="email-subject"
                id="email-subject"
                placeholder="Enter email subject..."
                className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                value={emailTitle}
                onChange={(e) => setEmailTitle(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <Button
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors px-6 py-2 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-black text-white hover:bg-gray-900 transition-colors px-6 py-2 rounded-lg"
                  onClick={handleCreate}
                >
                  Create Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
