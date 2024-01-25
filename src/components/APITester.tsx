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
    <div className="container mx-auto my-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          API URL:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Request Method:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          {/* Add other HTTP methods as needed */}
        </select>
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSendRequest}
      >
        Send Request
      </button>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Response:
        </label>
        <pre className="bg-gray-200 p-4 rounded">{response}</pre>
      </div>
    </div>
  );
};

export default APITester;
