import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personaStore from "../store/personaStore";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

export default function QueriesDisplay() {
  const { concerns, details } = personaStore();
  const navigate = useNavigate();

  const concernQuery = useQuery({
    queryKey: ["concern"],
    queryFn: async () => {
      try {
        console.log("Details available", details);

        if (!details.brandName) {
          navigate("/persona/details");
        }

        if(concerns?.length) return {success: true}

        const request = {
          url: "http://localhost:4500/concerns",
          method: "POST",
          data: { ...details, numResponse: 6 },
        };

        const concernRes = await axios(request);
        let nconcerns = concernRes.data.result;
        nconcerns = nconcerns.sort((a, b) => b.is_highlighted - a.is_highlighted);

        console.log(nconcerns);

        personaStore.setState({ concerns: nconcerns });

        return { success: true };
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (concernQuery.status === "error") {
    return navigate("/persona/details");
  }

  console.log(concernQuery.status)

  if (concernQuery.status === "pending" || concerns.length === 0) {
    return (
      <div className="pt-16 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <GridLoader color="#2563EB" size={20} />
          <h2 className="text-base text-center font-bold">
            Generating Queries...
          </h2>
        </div>
      </div>
    );
  }

  return (
    Array.isArray(concerns) && (
      <div className="pt-16 pb-24">
        <h2 className="font-bold text-2xl text-center mb-8">
          Concerns your future customer might have{" "}
        </h2>
        <div className="flex justify-center">
          <div style={{ width: 950 }} className="min-h-96">
            {concerns.map((concern, idx) => (
              <div
                className={`flex flex-col gap-6 px-4 py-6 another-shadow rounded-xl mb-5 ${
                  concern.is_highlighted ? "bg-blue-100" : "bg-blue-50"
                }`}
              >
                <div className="border-b pb-2">
                  <h4 className="text-xl font-bold">{concern?.question}</h4>
                </div>
                <p className="text-neutral-600">
                  {" "}
                  <b>Proposed solution </b> <br /> {concern?.proposed_solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
