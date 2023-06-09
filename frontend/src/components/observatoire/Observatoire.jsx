import Titles from "@components/utils/titles";

export default function Observatoire() {
  return (
    <>
      <section className="w-[90vw] mt-10 flex flex-col items-center">
        <Titles size="text-4xl" color="text-white" text="L'observatoire" />
        <p className="font-exo2 text-white opacity-60 text-justify text-sm pt-2">
          Depuis 1985, l'Association accueille le public dans le but de promouvoir
          l'astronomie amateur. Situés en plein coeur de la ville de Saint Jean Le
          Blanc, nous vous proposons de découvrir le ciel au travers de nos
          différentes activités...
        </p>
      </section>
    </>
  );
}
