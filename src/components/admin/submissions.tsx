import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite";
import type { DropdownOptions } from "flowbite";
import { ethers } from "ethers";

import type { BenchmarkEntry } from "../../db/benchmarks";

const Submissions = () => {
  const [displayedSubmissions, setDisplayedSubmissions] = useState<
    (
      BenchmarkEntry & {
        updateDropDownTarget: React.RefObject<HTMLDivElement> | null;
        updateDropDownTrigger: React.RefObject<HTMLButtonElement> | null;
      }
    )[]
  >([]);

  const login = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to login.");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    let tbsMessage = "";
    let signature = "";
    try {
      const signer = await provider.getSigner();
      // sign login message
      tbsMessage = JSON.stringify(
        {
          msg: "ETGraph Login",
          timestame: Date.now(),
        },
        null,
        2,
      );
      signature = await signer.signMessage(tbsMessage);
      console.log("Signature:", signature);
    } catch (error) {
      alert("Please connect to MetaMask to login.");
      return;
    }
    try {
      // login
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tbsMessage,
          signature,
        }),
      });
      if (!response.ok) {
        const data = await response.text();
        alert("Login failed: " + data);
        return;
      }
      const data = await response.json();
      console.log("JWT:", data.jwt);
      // save jwt to local storage
      localStorage.setItem("jwt", data.jwt);
      location.reload();
    } catch (error) {
      alert("Login failed");
      return;
    }
  };

  const updateDisplayedSubmissions = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      login();
      return;
    }
    // fetch submissions
    const res = await fetch("/api/admin/benchmarks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) {
      if (res.status === 403) {
        localStorage.removeItem("jwt");
        alert("Session expired. Please login again.");
        location.reload();
      }
      return;
    }
    const data = await res.json() as BenchmarkEntry[];
    setDisplayedSubmissions(data.map((result: BenchmarkEntry) => ({
      ...result,
      updateDropDownTarget: React.createRef<HTMLDivElement>(),
      updateDropDownTrigger: React.createRef<HTMLButtonElement>(),
    })));
  };

  useEffect(() => {
    // activate dropdowns
    displayedSubmissions.forEach((result) => {
      if (
        result.updateDropDownTrigger?.current &&
        result.updateDropDownTarget?.current
      ) {
        const dropDownOptions: DropdownOptions = {
          placement: "top",
          triggerType: "click",
          offsetSkidding: 0,
          offsetDistance: 10,
          delay: 300,
          ignoreClickOutsideClass: false,
        };
        new Dropdown(
          result.updateDropDownTarget.current,
          result.updateDropDownTrigger.current,
          dropDownOptions,
        );
        console.log("Dropdowns activated for", result.id);
      } else {
        console.error("Error: dropdowns not activated");
      }
    });
  }, [displayedSubmissions]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      updateDisplayedSubmissions();
    }
  }, []);

  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return (
      <div className="flex flex-col items-center justify-center">
        <button
          type="button"
          className="whitespace-nowrap inline-flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          onClick={login}
        >
          Login with MetaMask
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto min-h-fit shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-0">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Leaderboard</th>
            <th scope="col" className="px-6 py-3">Submission Time (local)</th>
            <th scope="col" className="px-6 py-3">Method</th>
            <th scope="col" className="px-6 py-3">Test AUC-ROC</th>
            <th scope="col" className="px-6 py-3">Test Precision</th>
            <th scope="col" className="px-6 py-3">Test Recall</th>
            <th scope="col" className="px-6 py-3">Test F1</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">References</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedSubmissions.map((result) => (
            <tr
              key={result.id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                {result.leaderboard}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(new Date(result.timestamp)).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {result.method}
              </td>
              <td className="px-6 py-4">
                {result.testAucRoc}
              </td>
              <td className="px-6 py-4">
                {result.testPrecision}
              </td>
              <td className="px-6 py-4">
                {result.testRecall}
              </td>
              <td className="px-6 py-4">
                {result.testF1}
              </td>
              <td className="px-6 py-4">
                {result.name}
              </td>
              <td className="px-6 py-4">
                <a
                  href={`mailto:${result.email}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {result.email}
                </a>
              </td>
              <td className="px-6 py-4">
                <a
                  href={result.references}
                  target="_blank"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Link
                </a>
              </td>
              <td className="px-6 py-4">
                {result.status}
              </td>
              <td className="px-6 py-4 flex flex-row">
                <button
                  type="button"
                  className="whitespace-nowrap inline-flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  ref={result.updateDropDownTrigger}
                >
                  Update Status{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
                <div
                  ref={result.updateDropDownTarget}
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-400 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="list-none p-0 m-0 text-sm text-gray-700 dark:text-gray-200">
                    <li className="m-0 p-0">
                      <button
                        className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          const jwt = localStorage.getItem("jwt");
                          if (!jwt) {
                            login();
                            return;
                          }
                          fetch(`/api/admin/benchmarks/${result.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${jwt}`,
                            },
                            body: JSON.stringify({
                              status: "approved",
                            }),
                          }).then((res) => {
                            if (!res.ok) {
                              if (res.status === 403) {
                                localStorage.removeItem("jwt");
                                alert("Session expired. Please login again.");
                                location.reload();
                              }
                              return;
                            }
                            updateDisplayedSubmissions();
                          });
                        }}
                      >
                        approved
                      </button>
                    </li>
                    <li className="m-0 p-0">
                      <button
                        className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          const jwt = localStorage.getItem("jwt");
                          if (!jwt) {
                            login();
                            return;
                          }
                          fetch(`/api/admin/benchmarks/${result.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${jwt}`,
                            },
                            body: JSON.stringify({
                              status: "rejected",
                            }),
                          }).then((res) => {
                            if (!res.ok) {
                              if (res.status === 403) {
                                localStorage.removeItem("jwt");
                                alert("Session expired. Please login again.");
                                location.reload();
                              }
                              return;
                            }
                            updateDisplayedSubmissions();
                          });
                        }}
                      >
                        rejected
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  onClick={async () => {
                    const jsonText = JSON.stringify(
                      {
                        method: result.method,
                        testAucRoc: result.testAucRoc,
                        testPrecision: result.testPrecision,
                        testRecall: result.testRecall,
                        testF1: result.testF1,
                        contact: {
                          name: result.name,
                          email: result.email,
                        },
                        references: result.references,
                      },
                      null,
                      2,
                    );
                    console.log(jsonText);
                    const queryOpts = {
                      name: "clipboard-write",
                      allowWithoutGesture: false,
                    };
                    const permissionStatus = await navigator.permissions.query(
                      queryOpts,
                    );
                    if (permissionStatus.state === "granted") {
                      navigator.clipboard.writeText(jsonText);
                    } else {
                      alert(
                        "Please copy the JSON from dev tools manually. Your browser does not support copying to clipboard.",
                      );
                    }
                  }}
                >
                  Copy JSON
                </button>
                <button
                  type="button"
                  className="whitespace-nowrap text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => {
                    const jwt = localStorage.getItem("jwt");
                    if (!jwt) {
                      login();
                      return;
                    }
                    fetch(`/api/admin/benchmarks/${result.id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${jwt}`,
                      },
                    }).then((res) => {
                      if (!res.ok) {
                        if (res.status === 403) {
                          localStorage.removeItem("jwt");
                          alert("Session expired. Please login again.");
                          location.reload();
                        }
                        return;
                      }
                      updateDisplayedSubmissions();
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
