const { cmd } = require("../command");
const { sleep, fetchJson } = require('../lib/functions');

// Rate-limiting tracking (in-memory store for simplicity)
const rateLimit = {};

// Helper function for validating phone number format
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+263\d{9}$/;
    return phoneRegex.test(phone);
};

// Main command handler for pairing
cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Generate pairing code for bot",
    category: "download",
    use: ".pair +263714757XXX",
    filename: __filename
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        // Check if phone number is provided and validate format
        if (!q || !isValidPhoneNumber(q)) {
            return await reply("*❌ Invalid phone number format! Please use: .pair +23714757XXX*");
        }

        // Rate limiting: Prevent spamming by limiting requests per user
        const now = Date.now();
        if (rateLimit[from] && now - rateLimit[from] < 60000) {  // 60 seconds rate limit
            return await reply("*❌ Please wait a minute before trying again.*");
        }

        // Set the rate limit for the user
        rateLimit[from] = now;

        // Inform the user that the pairing process has started
        await reply("🔄 *Starting the pairing process... Please wait.*");

        // Fetch pairing code from the external API
        const response = await fetchJson(`https://prince-mdx-session2.onrender.com/code?phone=${q}`);

        // Handle API response
        if (!response || !response.code) {
            console.error("Failed to retrieve pairing code for phone:", q, response);
            return await reply("❌ *Failed to retrieve pairing code.* Please check the phone number and try again.");
        }

        const pairingCode = response.code;

        // Send successful pairing response
        const successMessage = `✅ *PRINCE-XD PAIR COMPLETED*\n\nYour pairing code is: ${pairingCode}`;
        await reply(successMessage);

        // Optional delay before sending a second confirmation message
        await sleep(2000);

        // Send the pairing code again for confirmation
        await reply(`📱 *Pairing Code:* ${pairingCode}`);

        // Log the successful pairing attempt
        console.log(`Pairing code generated successfully for ${q}: ${pairingCode}`);

    } catch (error) {
        console.error("Error during pairing process:", error);
        await reply("❌ *An error occurred while generating the pairing code.* Please try again later.");
    }
});

