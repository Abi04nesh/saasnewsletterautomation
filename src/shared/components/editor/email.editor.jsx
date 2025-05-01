"use client";
import EmailEditor from "react-email-editor";
import React, { useEffect, useRef, useState } from "react";
import { DefaultJsonData } from "@/assets/mails/default";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { saveEmail } from "@/actions/save.email";
import toast from "react-hot-toast";
import { GetEmailDetails } from "@/actions/get.email-details";
import { sendEmail } from "@/shared/utils/email.sender";

const Emaileditor = ({ subjectTitle }) => {
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState(DefaultJsonData);
  const { user } = useClerk();
  const emailEditorRef = useRef(null);
  const history = useRouter();

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (!unlayer) return; // Ensure unlayer exists

    unlayer.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      await sendEmail({
        userEmail: ["abinesh.p.csd.2021@snsce.ac.in"],
        subject: subjectTitle,
        content: html,
      }).then(() => {
        toast.success("Email sent successfully!");
        history.push("/dashboard/write");
      });
    });
  };

  useEffect(() => {
    if (user) {
      getEmailDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onReady = () => {
    const unlayer = emailEditorRef.current?.editor;
    if (unlayer) {
      unlayer.loadDesign(jsonData);
    }
  };

  const saveDraft = async () => {
    const unlayer = emailEditorRef.current?.editor;

    if (!unlayer) return; // Ensure unlayer exists

    unlayer.exportHtml(async (data) => {
      const { design } = data;
      if (!user?.id) return; // Ensure user.id exists before saving
      await saveEmail({
        title: subjectTitle,
        content: JSON.stringify(design),
        newsLetterOwnerId: user.id,
      }).then((res) => {
        toast.success(res.message);
        history.push("/dashboard/write");
      });
    });
  };

  const getEmailDetails = async () => {
    if (!user?.id) return; // Ensure user.id exists before fetching email details
    await GetEmailDetails({
      title: subjectTitle,
      newsLetterOwnerId: user.id,
    }).then((res) => {
      if (res) {
        setJsonData(JSON.parse(res.content));
      }
      setLoading(false);
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {!loading && (
        <>
          {/* Editor Header */}
          <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-gray-800">{subjectTitle}</h2>
              <p className="text-sm text-gray-500">Draft • Last edited just now</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-50 text-gray-700 border-2 px-6 rounded-lg transition-colors"
                onClick={saveDraft}
              >
                Save Draft
              </Button>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition-colors"
                onClick={exportHtml}
              >
                Send Email
              </Button>
            </div>
          </div>

          {/* Editor Workspace */}
          <div className="flex-1 bg-gray-50">
            <div className="h-full max-w-[1200px] mx-auto bg-white">
              <EmailEditor
                minHeight="calc(100vh - 85px)"
                ref={emailEditorRef}
                onReady={onReady}
                options={{
                  customCSS: [
                    `.blockbuilder-preferences-sidebar { min-width: 360px !important; }`,
                    `.template-list { max-width: none !important; }`,
                  ],
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Emaileditor;
