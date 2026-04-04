"use client";

import { teamMembers, coreCommittee, Devlopers, departmentalCoordinators } from "@/team-info";

export default function DebugTeamPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Team Data Debug</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Committee (first 3 members)</h2>
          <div className="space-y-4">
            {coreCommittee.slice(0, 3).map((member, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Image:</strong> {member.image}</p>
                <p><strong>LinkedIn:</strong> {member.linkedin || "None"}</p>
                <p><strong>Email:</strong> {member.Email || "None"}</p>
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Team Members (first 3)</h2>
          <div className="space-y-4">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Image:</strong> {member.image}</p>
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Departmental Coordinators (first 3)</h2>
          <div className="space-y-4">
            {departmentalCoordinators.slice(0, 3).map((member, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Department:</strong> {member.department}</p>
                <p><strong>Image:</strong> {member.image}</p>
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Developers (first 3)</h2>
          <div className="space-y-4">
            {Devlopers.slice(0, 3).map((member, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Image:</strong> {member.image}</p>
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
