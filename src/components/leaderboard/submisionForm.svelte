<script lang="ts">
    import { onMount } from "svelte";
    import { Modal } from "flowbite";
    import type { ModalOptions } from "flowbite";

    export let leaderboardName:
        | "ethereum-link-prediction_with-twitter"
        | "ethereum-link-prediction_without-twitter"
        | "matching-link-prediction"
        | "wash-trading-address-detection_with-twitter"
        | "wash-trading-address-detection_without-twitter";

    let hcaptchaWidgetID: string;

    let modal: Modal;

    onMount(() => {
        const modelTargetEl = document.getElementById(
            `submission-modal_${leaderboardName}`
        );
        const modalOptions: ModalOptions = {
            placement: "center",
            backdrop: "dynamic",
            backdropClasses:
                "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
            closable: true,
        };
        modal = new Modal(modelTargetEl, modalOptions);

        if (hcaptcha.render) {
            hcaptchaWidgetID = hcaptcha.render(
                `form-hcaptcha_${leaderboardName}`,
                {
                    sitekey: import.meta.env.PUBLIC_HCAPTCHA_SITEKEY,
                }
            );
        }
    });

    const formDataEmpty = {
        method: "",
        testAucRoc: 0,
        testPrecision: 0,
        testRecall: 0,
        testF1: 0,
        name: "",
        email: "",
        references: "",
    };

    let formData = {
        ...formDataEmpty,
    };

    const handleSubmit = async () => {
        try {
            const hCaptchaResponse = hcaptcha.getResponse(hcaptchaWidgetID);
            if (!hCaptchaResponse) throw new Error("hCaptcha failed");
            const submitRes = await fetch("/api/submit-response", {
                method: "POST",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    leaderboard: leaderboardName,
                    ...formData,
                    hCaptchaResponse,
                }),
            });
            console.log("Details: ", formData);
            formData = {
                ...formDataEmpty,
            };
            hcaptcha.reset(hcaptchaWidgetID);
        } catch (error) {
            console.error("Error in form submission:", error);
        }
    };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a target="_blank" rel="noopener noreferrer">
    <button
        on:click={() => {
            modal.show();
        }}
        type="button"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
        Submit a New Result
    </button>
</a>

<div
    id={`submission-modal_${leaderboardName}`}
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
>
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                on:click={() => {
                    modal.hide();
                }}
            >
                <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3
                    class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
                >
                    Submit a New Result
                </h3>
                <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
                    <div>
                        <label
                            for={`form-method_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Method</label
                        >
                        <input
                            type="text"
                            id={`form-method_${leaderboardName}`}
                            bind:value={formData.method}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-test-auc-roc_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Test AUC-ROC</label
                        >
                        <input
                            type="number"
                            step="any"
                            min=0
                            max=1
                            id={`form-test-auc-roc_${leaderboardName}`}
                            bind:value={formData.testAucRoc}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-test-precision_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Test Precision</label
                        >
                        <input
                            type="number"
                            step="any"
                            min=0
                            max=1
                            id={`form-test-precision_${leaderboardName}`}
                            bind:value={formData.testPrecision}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-test-recall_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Test Recall</label
                        >
                        <input
                            type="number"
                            step="any"
                            min=0
                            max=1
                            id={`form-test-recall_${leaderboardName}`}
                            bind:value={formData.testRecall}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-test-f1_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Test F1</label
                        >
                        <input
                            type="number"
                            step="any"
                            min=0
                            max=1
                            id={`form-test-f1_${leaderboardName}`}
                            bind:value={formData.testF1}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-name_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Name</label
                        >
                        <input
                            type="text"
                            id={`form-name_${leaderboardName}`}
                            bind:value={formData.name}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-email_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Email</label
                        >
                        <input
                            type="email"
                            id={`form-email_${leaderboardName}`}
                            bind:value={formData.email}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for={`form-references_${leaderboardName}`}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >References</label
                        >
                        <input
                            type="url"
                            id={`form-references_${leaderboardName}`}
                            bind:value={formData.references}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div
                        id={`form-hcaptcha_${leaderboardName}`}
                        class="h-captcha"
                        data-sitekey={import.meta.env.PUBLIC_HCAPTCHA_SITEKEY}
                    />
                    <button
                        type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Submit</button
                    >
                </form>
            </div>
        </div>
    </div>
</div>
