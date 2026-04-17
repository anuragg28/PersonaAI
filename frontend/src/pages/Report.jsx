import PersonaDisplay from "../components/PersonaDisplay";
import { Link } from "react-router-dom";

export default function Report() {
  return (
    <div className="pt-36">
      <div className="flex justify-end px-8">
        <Link to={"/persona/report/concerns"}>
          <h2 className="underline text-blue-600 cursor-pointer">
            Get Queries
          </h2>
        </Link>
      </div>
      <PersonaDisplay />
    </div>
  );
}
