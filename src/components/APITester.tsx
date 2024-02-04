// src/components/APITester.tsx

import React, { useState } from "react";

const APITester: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSendRequest = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json", // Set the content type for JSON requests
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const options: RequestInit = {
        method,
        headers,
        body: method === "POST" || method === "PATCH" ? body : undefined,
      };

      const apiResponse = await fetch(url, options);
      const data = await apiResponse.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error sending request. Check console for details.");
    }
  };

  return (
    <div className="flex justify-center  border-2  m-36 p-12 rounded-2xl">
      <div className="container ">
        <div className="flex mb-4">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2">
          Request Method:
        </label> */}
          <select
            className="shadow appearance-none border rounded w-[10%] py-4 mx-3 text-center font-bold text-white bg-blue-500 hover:bg-blue-700 leading-tight focus:outline-none focus:shadow-outline"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option className="text-white hover:bg-blue-700" value="GET">
              GET
            </option>
            <option className="text-white hover:bg-blue-700" value="POST">
              POST
            </option>
            <option className="text-white" value="PATCH">
              PATCH
            </option>
            <option className="text-white" value="DELETE">
              DELETE
            </option>
            {/* Add other HTTP methods as needed */}
          </select>
          {/* <label className="block text-gray-700 text-sm font-bold mb-2">
          API URL:
        </label> */}
          <input
            type="text"
            placeholder="Enter API URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-4 w-[10%] rounded focus:outline-none focus:shadow-outline"
            onClick={handleSendRequest}
          >
            Send
          </button>
        </div>
        {(method === "POST" || method === "PATCH") && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Request Body:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Auth Token (optional):
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Response:
          </label>
          <pre className="bg-gray-200 p-4 rounded">{response}</pre>
        </div>
      </div>
    </div>
  );
};

export default APITester;
