import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Image
        src="/terms.png"
        alt="Terms and Conditions"
        width={1200}  // Ajusta si la imagen tiene otro tamaño
        height={1800} // Ajusta si la imagen tiene otro tamaño
      />
    </div>
  );
}
