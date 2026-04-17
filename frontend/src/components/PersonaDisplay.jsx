import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personaStore from "../store/personaStore";
import axios from "axios";

import exampleUser from "../assets/example-user.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GridLoader from "react-spinners/GridLoader";

const PersonaDisplay = () => {
  const { details, personas } = personaStore();
  const navigate = useNavigate();

  const [currentPersona, setCurrentPersona] = useState(0);
  const [navIndex, setNavIndex] = useState(0);

  const personaQuery = useQuery({
    queryKey: ["persona"],
    // refetchOnMount: true,
    queryFn: async () => {
      try {
        if (!details.brandName) {
          navigate("/persona/details");
          throw new Error("Brand details not available");
        }
        console.log("Details available", details);
        const request = {
          url: "http://localhost:4500/persona",
          method: "POST",
          data: {
            ...details,
            numResponse: 3,
          },
        };

        const { data } = await axios(request);
        const personas = data.result;

        for (let i = 0; i < personas.length; i++) {
          const item = personas[i];
          let tempGender = item?.gender?.toLowerCase();

          const profileRes = await axios.get(
            `https://randomuser.me/api/?gender=${tempGender}`
          );
          personas[i].profile_pic = profileRes.data.results[0].picture.large;
        }
        personaStore.setState({ personas });

        console.log(personas);

        return { success: true };
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (Array.isArray(personas)) {
      setCurrentPersona(personas[navIndex]);

      console.log(personas[navIndex]);
    }
  }, [personas, navIndex]);

  console.log(personaQuery.status)


  if (personaQuery.status === "error") {
    return navigate("/persona/details");
  }

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

  const handleNavigation = (type) => {
    if (type === "next") {
      setNavIndex((prev) => prev + 1);
    }

    if (type === "back") {
      setNavIndex((prev) => prev - 1);
    }
  };

  return (
    personaQuery.status === "success" && currentPersona && (
      <div className="flex justify-around items-center h-full mt-10 pb-20">
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
        <div className="flex justify-center">
          <div
            style={{ width: 1050, minHeight: 450 }}
            className="great-shadow w-full flex"
          >
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
              <div className="flex flex-col gap-2 mt-4">
                <div className="px-4 py-1 rounded border border-neutral-200">
                  {currentPersona?.age && (
                    <p className="text-sm">
                      <b>Age:</b> {currentPersona?.age}
                    </p>
                  )}

                  <p className="text-sm">
                    <b>Location:</b> {currentPersona?.location}
                  </p>
                </div>

                <div className="px-4 py-1 rounded border border-neutral-200">
                  {currentPersona?.occupation && (
                    <p className="text-sm">
                      <b>Occupation:</b> {currentPersona?.occupation}
                    </p>
                  )}

                  {currentPersona?.industry && (
                    <p className="text-sm">
                      <b>Industry:</b> {currentPersona?.industry}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <div className="flex-col gap-0.5 text-sm">
                  <p className="font-bold">Education</p>
                  <p>{currentPersona?.background?.education}</p>
                </div>
                <div className="flex-col gap-0.5 text-sm">
                  <p className="font-bold">Work Enviroment</p>
                  <p>{currentPersona?.background?.work_environment}</p>
                </div>
                <div className="flex-col gap-0.5 text-sm">
                  <p className="font-bold">Income</p>
                  <p>{currentPersona?.background?.income}</p>
                </div>
                <div className="mt-6 text-sm">
                  <p className="font-bold">Hobbies and interests</p>
                  <p>{currentPersona?.hobbies?.personal_interests}</p>
                  <p className="mt-4">
                    <b>Work Related:</b> {currentPersona?.hobbies?.work_related}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-6 overflow-hidden">
              <div className="flex">
                <div className="basis-2/3 pl-4 border-r">
                  <h3 className="text-lg font-bold mb-3">Goals</h3>

                  <div className="flex flex-col gap-0 mb-2">
                    <h5 className="text-neutral-700">Primary Goal</h5>
                    <p className="text-sm text-neutral-500">
                      {currentPersona?.professional_goal?.primary_goal}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0">
                    <h5 className="text-neutral-700">Secondary Goal</h5>
                    <p className="text-sm text-neutral-500">
                      {currentPersona?.professional_goal?.secondary_goal}
                    </p>
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="text-base font-bold text-neutral-600 mb-3">
                    Communication Channels
                  </h3>
                  <ul>
                    {currentPersona?.communication_channel?.map(
                      (channel, cid) => (
                        <li
                          key={`chan-${cid}`}
                          className="text-sm text-neutral-600 mb-1"
                        >
                          {channel}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold mb-3">Pain Points</h3>

                <div className="flex flex-col">
                  {currentPersona?.pain_points?.map((point, index) => (
                    <p className="text-sm text-neutral-600 mb-1">
                      <b>
                        {index + 1}) {point?.title}
                      </b>{" "}
                      - {point?.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold mb-3">
                  Why will {currentPersona?.name} use {details?.brandName}?
                </h3>

                <div className="flex flex-col">
                  {currentPersona?.usecase_product?.map((point, index) => (
                    <p className="text-sm text-neutral-600 mb-1">
                      <b>
                        {index + 1}) {point?.title}
                      </b>{" "}
                      - {point?.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold mb-3">
                  Features {currentPersona?.name} like:
                </h3>

                <div className="flex flex-col">
                  {currentPersona?.features_needed?.map((point, index) => (
                    <p className="text-sm text-neutral-600 mb-1">
                      <b>
                        {index + 1}) {point?.feature}
                      </b>{" "}
                      - {point?.description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
