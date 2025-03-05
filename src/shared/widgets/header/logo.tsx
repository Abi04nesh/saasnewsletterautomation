import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/FreeSample-Vectorizer-io-netzwerk_tech_logo.svg" // Ensure the file name matches exactly
        alt="Netzwerk Logo"
        width={56} // Adjust as per your needs
        height={56} // Adjust as per your needs
      />
      <h5 className="text-white text-lg font-medium">x</h5>
    </div>
  );
};

export default Logo;
