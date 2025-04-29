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
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Emaileditor;
