<script lang="ts">
    const links = {
        home: "/",
        about: "/about",
        tasks: {
            ethereumLinkPrediction: "/tasks/ethereum-link-prediction",
            washTradingAddressDetection: "/tasks/wash-trading-address-detection",
            matchingLinkPrediction: "/tasks/matching-link-prediction",
        },
        github: import.meta.env.PUBLIC_GITHUB_URL,
        discord: "javascript:void(0)",
        youtube: "javascript:void(0)",
    };
</script>

<header
    class="sticky top-0 z-40 flex-none w-full mx-auto bg-gray-200 border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
>
    <nav class="">
        <div
            class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        >
            <a href={links.home} class="flex items-center">
                <img src="/favicon.png" class="h-8 mr-3" alt="ETGraph Logo">
                <span
                    class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >ETGraph</span
                >
            </a>
            <button
                data-collapse-toggle="navbar-dropdown"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-dropdown"
                aria-expanded="false"
            >
                <span class="sr-only">Open main menu</span>
                <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                    <li>
                        <a
                            href={links.home}
                            class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                            aria-current="page">Home</a
                        >
                    </li>
                    <li>
                        <button
                            id="dropdownNavbarLink"
                            data-dropdown-toggle="dropdownNavbar"
                            class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                            >Tasks <svg
                                class="w-2.5 h-2.5 ml-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg></button
                        >
                        <!-- Dropdown menu -->
                        <div
                            id="dropdownNavbar"
                            class="z-10 hidden font-normal divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-50 dark:bg-gray-700 dark:divide-gray-600"
                        >
                            <ul
                                class="py-2 text-sm text-gray-700 dark:text-gray-400"
                                aria-labelledby="dropdownLargeButton"
                            >
                                <li>
                                    <a
                                        href={links.tasks.ethereumLinkPrediction}
                                        class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >Ethereum Link Prediction</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href={links.tasks.washTradingAddressDetection}
                                        class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >Wash-trading Address Detection</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href={links.tasks.matchingLinkPrediction}
                                        class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >Matching Link Prediction</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a
                            href={links.about}
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >About</a
                        >
                    </li>
                    <li class="flex items-center">
                        <a
                            href={links.github}
                            data-tooltip-target="tooltip-github"
                            class="block py-2 pl-3 pr-4 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                            <svg
                                class="w-[1.1rem] h-[1.1rem]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">View on Github</span>
                        </a>
                        <div
                            id="tooltip-github"
                            role="tooltip"
                            class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip opacity-0 invisible"
                            data-popper-placement="top"
                            style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(719.333px, -59.3333px, 0px);"
                        >
                            View on Github
                            <div
                                class="tooltip-arrow"
                                data-popper-arrow=""
                                style="position: absolute; left: 0px; transform: translate3d(59.3333px, 0px, 0px);"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
