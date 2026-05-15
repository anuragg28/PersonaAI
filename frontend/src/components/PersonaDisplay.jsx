import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personaStore from "../store/personaStore";
import axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GridLoader from "react-spinners/GridLoader";

const PersonaDisplay = () => {
  const { details, personas } = personaStore();
  const navigate = useNavigate();

  const [currentPersona, setCurrentPersona] = useState(null);
  const [navIndex, setNavIndex] = useState(0);

  // ✅ HANDLE REDIRECT SAFELY
  useEffect(() => {
    if (!details?.brandName) {
      navigate("/persona/details");
    }
  }, [details, navigate]);

  // ✅ SAFE QUERY
  const personaQuery = useQuery({
    queryKey: ["persona"],
    enabled: !!details?.brandName, // 🔥 only run when details exist
    queryFn: async () => {
      console.log("API CALL STARTED 🔥");

      const request = {
        url: "http://localhost:4500/persona",
        method: "POST",
        data: {
          ...details,
          numResponse: 3,
        },
      };

      const { data } = await axios(request);
      const personasData = data.result;

      // add profile pics
      for (let i = 0; i < personasData.length; i++) {
        const item = personasData[i];
        let tempGender = item?.gender?.toLowerCase();

        const profileRes = await axios.get(
          `https://randomuser.me/api/?gender=${tempGender}`
        );

        personasData[i].profile_pic =
          profileRes.data.results[0].picture.large;
      }

      personaStore.setState({ personas: personasData });

      return { success: true };
    },
  });

  // ✅ SET CURRENT PERSONA
  useEffect(() => {
    if (Array.isArray(personas) && personas.length > 0) {
      setCurrentPersona(personas[navIndex]);
    }
  }, [personas, navIndex]);

  console.log("QUERY STATUS:", personaQuery.status);

  // ❌ ERROR STATE
  if (personaQuery.status === "error") {
    return <p className="text-center mt-10">Something went wrong</p>;
  }

  // ⏳ LOADING
  if (personaQuery.status === "pending" || !currentPersona) {
    return (
      <div className="pt-16 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <GridLoader color="#2563EB" size={20} />
          <h2 className="text-base text-center font-bold">
            Generating Personas...
          </h2>
        </div>
      </div>
    );
  }

  // 🔁 NAVIGATION
  const handleNavigation = (type) => {
    if (type === "next" && navIndex < personas.length - 1) {
      setNavIndex((prev) => prev + 1);
    }

    if (type === "back" && navIndex > 0) {
      setNavIndex((prev) => prev - 1);
    }
  };

  return (
    personaQuery.status === "success" &&
    currentPersona && (
      <div className="flex justify-around items-center h-full mt-10 pb-20">
        {/* BACK BUTTON */}
        <div>
          {navIndex > 0 && (
            <div
              onClick={() => handleNavigation("back")}
              className="cursor-pointer rounded-full bg-gray-50 hover:bg-gray-200 p-4"
            >
              <ArrowBackIcon style={{ fontSize: 34 }} />
            </div>
          )}
        </div>

        {/* MAIN CARD */}
        <div className="flex justify-center">
          <div
            style={{ width: 1050, minHeight: 450 }}
            className="great-shadow w-full flex"
          >
            {/* LEFT */}
            <div className="px-4 py-6 w-1/3 border-r">
              <div className="flex justify-center">
                <img
                  src={currentPersona?.profile_pic}
                  style={{ width: 150, height: 150 }}
                  className="rounded-lg"
                />
              </div>

              <h2 className="text-xl text-center font-bold mt-3">
                {currentPersona.name}
              </h2>

              <div className="mt-4 text-sm">
                <p><b>Age:</b> {currentPersona?.age}</p>
                <p><b>Location:</b> {currentPersona?.location}</p>
                <p><b>Occupation:</b> {currentPersona?.occupation}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-bold mb-3">Goals</h3>
              <p>{currentPersona?.professional_goal?.primary_goal}</p>

              <h3 className="text-lg font-bold mt-5">Pain Points</h3>
              {currentPersona?.pain_points?.map((p, i) => (
                <p key={i}>{p?.title} - {p?.description}</p>
              ))}
            </div>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div>
          {navIndex < personas.length - 1 && (
            <div
              onClick={() => handleNavigation("next")}
              className="cursor-pointer rounded-full bg-gray-50 hover:bg-gray-200 p-4 rotate-180"
            >
              <ArrowBackIcon style={{ fontSize: 34 }} />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PersonaDisplay;