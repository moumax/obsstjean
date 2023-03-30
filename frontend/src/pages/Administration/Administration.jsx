import UsersAdministration from "../../components/administration/UsersAdministration";
import EventsAdministration from "../../components/administration/EventsAdministration";

export default function Administration() {
  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center ">
      <EventsAdministration />
      <UsersAdministration />
    </section>
  );
}
