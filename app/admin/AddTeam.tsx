"use client"
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Tournament, fetchTournamentNames } from "./fetchTournamnet_name";



function AddTeam() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [coach, setCoach] = useState("");
  const [manager, setManager] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentNames, setTournamentNames] = useState<Tournament[]>([]);

  useEffect(() => {
   fetchTournamentNames().then((tournaments) => {
    if(tournaments != undefined)
      setTournamentNames(tournaments);
   })
    
  }, []);

  const handleSubmit = async () => {
    if (!name || !address || !email || !website || !coach || !manager || !tournamentName) {
      alert('Please fill all fields');
      return;
    }

    try {
      const { data, error } = await supabase.from('Team').insert([{
        name,
        address,
        email,
        website,
        coach,
        manager,
        tournament_name: tournamentName,
      }]);

      console.log('data:', data);
      console.log('error:', error);

      if (error) {
        console.log(error);
        alert("Failed to add team. Please try again later.");
        return;
      }

      alert('Team added successfully!');
      setName('');
      setAddress('');
      setEmail('');
      setWebsite('');
      setCoach('');
      setManager('');
      setTournamentName('');
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="font-bold text-lg mb-4">Add Team to Tournament</h2>
      <form className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Team Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter team name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="address"
          >
            Team Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Enter team address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Team Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter team email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="website"
          >
            Team Website
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="website"
            type="text"
            placeholder="Enter team website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <label className="block text-gray-700 font-bold mb-2" htmlFor="coach">
            Team Coach
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coach"
            type="text"
            placeholder="Enter team coach"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          />

          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="manager"
          >
            Team Manager
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="manager"
            type="text"
            placeholder="Enter team manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="tournament_name"
          >
            Tournament
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tournament_name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
          >
            <option value="">Select a tournament</option>
            {tournamentNames.map((tournament) => (
              <option key={tournament.name} value={tournament.name}>
                {tournament.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Add Team
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeam;
