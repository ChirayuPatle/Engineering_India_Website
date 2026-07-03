"use client";

import {
  teamMembers,
  coreCommittee,
  Devlopers,
  departmentalCoordinators,
} from "@/team-info";

export default function DebugTeamPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="mb-8 text-3xl font-bold">Team Data Debug</h1>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Core Committee (first 3 members)
          </h2>
          <div className="space-y-4">
            {coreCommittee.slice(0, 3).map((member, index) => (
              <div key={index} className="rounded-lg bg-gray-800 p-4">
                <p>
                  <strong>Name:</strong> {member.name}
                </p>
                <p>
                  <strong>Position:</strong> {member.position}
                </p>
                <p>
                  <strong>Image:</strong> {member.image}
                </p>
                <p>
                  <strong>LinkedIn:</strong> {member.linkedin || "None"}
                </p>
                <p>
                  <strong>Email:</strong> {member.Email || "None"}
                </p>
                <img
                  src={member.image}
                  alt={member.name}
                  className="mt-2 h-20 w-20 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Team Members (first 3)
          </h2>
          <div className="space-y-4">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div key={index} className="rounded-lg bg-gray-800 p-4">
                <p>
                  <strong>Name:</strong> {member.name}
                </p>
                <p>
                  <strong>Position:</strong> {member.position}
                </p>
                <p>
                  <strong>Image:</strong> {member.image}
                </p>
                <img
                  src={member.image}
                  alt={member.name}
                  className="mt-2 h-20 w-20 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Departmental Coordinators (first 3)
          </h2>
          <div className="space-y-4">
            {departmentalCoordinators.slice(0, 3).map((member, index) => (
              <div key={index} className="rounded-lg bg-gray-800 p-4">
                <p>
                  <strong>Name:</strong> {member.name}
                </p>
                <p>
                  <strong>Department:</strong> {member.department}
                </p>
                <p>
                  <strong>Image:</strong> {member.image}
                </p>
                <img
                  src={member.image}
                  alt={member.name}
                  className="mt-2 h-20 w-20 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Developers (first 3)</h2>
          <div className="space-y-4">
            {Devlopers.slice(0, 3).map((member, index) => (
              <div key={index} className="rounded-lg bg-gray-800 p-4">
                <p>
                  <strong>Name:</strong> {member.name}
                </p>
                <p>
                  <strong>Position:</strong> {member.position}
                </p>
                <p>
                  <strong>Image:</strong> {member.image}
                </p>
                <img
                  src={member.image}
                  alt={member.name}
                  className="mt-2 h-20 w-20 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
