<script lang="ts">
    import { onMount } from "svelte";

    export let leaderboard:
        | "ethereum-link-prediction_with-twitter"
        | "ethereum-link-prediction_without-twitter"
        | "matching-link-prediction"
        | "wash-trading-address-detection_with-twitter"
        | "wash-trading-address-detection_without-twitter";

    let hcaptchaWidgetID: string;

    onMount(() => {
        if (hcaptcha.render) {
            hcaptchaWidgetID = hcaptcha.render(`form-hcaptcha_${leaderboard}`, {
                sitekey: import.meta.env.PUBLIC_HCAPTCHA_SITEKEY,
            });
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
                    leaderboard,
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

<div class="px-6 py-6 lg:px-8">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Submit a New Result
    </h3>
    <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        <div>
            <label
                for={`form-method_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Method</label
            >
            <input
                type="text"
                id={`form-method_${leaderboard}`}
                bind:value={formData.method}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-test-auc-roc_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Test AUC-ROC</label
            >
            <input
                type="number"
                id={`form-test-auc-roc_${leaderboard}`}
                bind:value={formData.testAucRoc}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-test-precision_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Test Precision</label
            >
            <input
                type="number"
                id={`form-test-precision_${leaderboard}`}
                bind:value={formData.testPrecision}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-test-recall_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Test Recall</label
            >
            <input
                type="number"
                id={`form-test-recall_${leaderboard}`}
                bind:value={formData.testRecall}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-test-f1_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Test F1</label
            >
            <input
                type="number"
                id={`form-test-f1_${leaderboard}`}
                bind:value={formData.testF1}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-name_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
            >
            <input
                type="text"
                id={`form-name_${leaderboard}`}
                bind:value={formData.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-email_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
            >
            <input
                type="email"
                id={`form-email_${leaderboard}`}
                bind:value={formData.email}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div>
            <label
                for={`form-references_${leaderboard}`}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >References</label
            >
            <input
                type="url"
                id={`form-references_${leaderboard}`}
                bind:value={formData.references}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <div
            id={`form-hcaptcha_${leaderboard}`}
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
