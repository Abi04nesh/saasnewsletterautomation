import Image from "next/image";

const FooterLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/FreeSample-Vectorizer-io-netzwerk_tech_logo.svg" // Ensure the file name matches exactly
        alt="Netzwerk Logo"
        width={50} // Adjust as per your needs
        height={50} // Adjust as per your needs
      />
      <h5 className="text-white text-lg font-medium">Netzwerk</h5>
    </div>
  );
};

export default FooterLogo;
