import Image from "../../assets/logo/logo.png";
import EnterPointImage from "../../assets/enter_point/enter_point.jpg";

export default function Header() {
  return (
    <header className="w-[90vw] flex flex-col items-center">
      <div className="flex flex-col items-center mt-10 text-center">
        <img
          className="w-[50vw]"
          src={Image}
          alt="logo observatoire de saint jean le blanc"
        />
        <h1 className="text-xl font-exo2 text-transparent bg-clip-text bg-gradient-to-b from-[#fffc08] to-[#575506] pt-3">
          Observatoire de Saint Jean Le Blanc
        </h1>
        <h2 className="text-sm  font-exo2 text-white opacity-50 break-keep pt-1">
          Association loi 1901 pour la promotion de l'astronomie amateur
        </h2>
        <img
          className="my-5 rounded-xl"
          src={EnterPointImage}
          alt="observatoire"
        />
      </div>
    </header>
  );
}
