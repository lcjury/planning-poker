import React from "react";
import { Link } from "react-router-dom";

export const Login = () => (
  <div className="mx-auto flex justify-center items-center w-1/3">
    <div class="border-teal-500 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg text-center">
      <Link
        className="block bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mb-2"
        to={"/session/new"}
      >
        Nueva sesion
      </Link>

      <Link
        className="block bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
        to={"/session/join"}
      >
        Unirme a una sesion
      </Link>
    </div>
  </div>
);
