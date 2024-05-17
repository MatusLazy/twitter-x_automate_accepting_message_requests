// Function to extract chat IDs from the specified element
function extractChatIDs() {
    const chatElements = document.querySelectorAll(".css-175oi2r [href^='/messages/']");
    const chatIDs = [];
    chatElements.forEach(element => {
        const href = element.getAttribute("href");
        const chatID = href.match(/\/messages\/(\w+)\/participants/);
        if (chatID && chatID.length > 1) {
            chatIDs.push(chatID[1]);
        }
    });
    return chatIDs;
}

// Function to accept invite for a given chat ID
async function accept_invite(chatID) {
    // Extract CSRF token from cookies
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {});
    const csrfToken = cookies['ct0'];

    // Generate unique client transaction ID
    const clientTransactionID = generateClientTransactionID();

    const response = await fetch(`https://x.com/i/api/1.1/dm/conversation/${chatID}/accept.json`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "authorization": "Bearer YOUR BEARER TOKEN",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=1, i",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-client-transaction-id": clientTransactionID,
            "x-csrf-token": csrfToken,
            "x-twitter-active-user": "yes",
            "x-twitter-auth-type": "OAuth2Session",
            "x-twitter-client-language": "en"
        },
        "referrer": `https://x.com/messages/${chatID}`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    // Check if request was successful
    if (response.ok) {
        console.log(`Accepted invite for chat ID: ${chatID}`);
        return true;
    } else {
        console.error(`Failed to accept invite for chat ID: ${chatID}`);
        return false;
    }
}

// Function to generate a unique client transaction ID
function generateClientTransactionID() {
    // Use a combination of timestamp and random string
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    return `${timestamp}-${randomString}`;
}

// Main function to fetch chat IDs and accept invites
async function main() {
    const chatIDs = extractChatIDs();
    let acceptedCount = 0;
    for (const chatID of chatIDs) {
        if (await accept_invite(chatID)) {
            acceptedCount++;
        }
    }
    console.log(`Total invites accepted: ${acceptedCount}`);
}

// Call the main function
main();
