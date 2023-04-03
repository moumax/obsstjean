import { useNavigate } from "react-router-dom";
import UsersAdministration from "../../components/administration/UsersAdministration";
import EventsAdministration from "../../components/administration/EventsAdministration";

import Button from "../../components/assets/Button";

export default function Administration() {
  const navigate = useNavigate();

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <EventsAdministration />
      <UsersAdministration />
      <div className="self-end py-4">
        <Button
          label="Retour"
          paddingX="px-1"
          paddingY="py-2"
          bgprimary="bg-blue-600"
          onClick={() => navigate("/")}
        />
      </div>
    </section>
  );
}
