import Image from "../../assets/logo/logo.png";
import EnterPointImage from "../../assets/enter_point/enter_point_image.jpg";

export default function EnterPoint() {
  return (
    <header className="w-[90vw] mt-10 flex flex-col items-center bg-red-400">
      <img
        className="w-[50vw]"
        src={Image}
        alt="logo observatoire de saint jean le blanc"
      />
      <h1>Observatoire de Saint Jean Le Blanc</h1>
      <h2>Association loi 1901 pour la promotion de l'astronomie amateur</h2>
      <img
        className="my-5 rounded-xl"
        src={EnterPointImage}
        alt="observatoire"
      />
    </header>
  );
}
