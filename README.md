# twitter-x_automate_accepting_message_requests
Automate accepting all message requests on your Twitter account. Useful for automated accounts that need to accept multiple group requests at the same time.

## STEPS 
1. Navigate to: https://x.com/messages/requests
2. Open DevTools (usually by right-clicking on the page and selecting "Inspect" or pressing `Ctrl+Shift+I` or `Cmd+Option+I`), navigate to the "Network" tab, and refresh the page.
3. Look for any request in the "Network" tab (e.g., to fetch message requests) and check the request headers for the Bearer token. It should look like this: 
4. Copy the Bearer token.
5. Open the console (usually by clicking on the "Console" tab in DevTools) and paste the script provided in this repository.
6. Replace the placeholder `BEARER_TOKEN` in the script (line 32) with the Bearer token you copied in step 4.
7. Press `Enter` to run the script.
8. The console will print out how many requests were accepted.
9. If there are more requests still visible on the screen after running the script, you can run the function again by typing `main();` in the console and pressing `Enter`.

Remember to handle any potential rate limits or restrictions imposed by Twitter's API or terms of service when using automation scripts like this.
