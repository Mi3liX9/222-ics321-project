"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";

function DeleteTournament() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    (async function () {
      const { data } = await supabase.from("Tournament").select("*");

      setTournaments(data as any);
      console.log(tournaments);
    })();
  }, []);

  const handleDelete = async () => {
    if (typeof selected === "undefined") return console.log("nothing selected");

    const { error } = await supabase
      .from("Tournament")
      .delete()
      .eq("name", selected);

    if (error) return console.log(error);

    const { data } = await supabase.from("Tournament").select("*");

    setTournaments(data as any);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="font-bold text-lg mb-4">Delete Tournament</h2>
      <form className="mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="tournament"
          >
            Tournament
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tournament"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option>Select a tournament</option>

            {tournaments.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
            {/* <option>Tournament 1</option>
            <option>Tournament 2</option>
            <option>Tournament 3</option> */}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleDelete}
          >
            Delete Tournament
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteTournament;
