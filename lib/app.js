require("dotenv").config();
// const Web3 = require("web3");
// const web3 = new Web3(process.env.ROPSTEN_URL);

// const Contract = require('web3.eth-contract');
// const ABI = Contract.options.jsonInterface;
// const CONTRACT_ADDRESS = '';

// // token *is* an (instance of an) ERC20 contract:
// const token = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

const { App } = require("@slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/hellobot", async ({ ack, payload, context }) => {
  try {
    // Acknowledge the command request
    await ack();

    // // Here is the Ethereum code:
    // // User account creation:
    // const privateKey = web3.eth.accounts.hashMessage(payLoad.user_id);
    // const newAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
    // console.log(newAccount);

    // // Initial deposit of tokens:
    // const newAddress = newAccount.address.
    // const send = await token.methods.transfer(newAddress, 500);
    // console.log(send);

    // // Account balance retrieval:
    // const userBalance = await token.methods.balanceOf(newAddress);
    // console.log(userBalance);

    // Here is the Slack response code:
    const result = await app.client.chat.postMessage({
      // type: 'shortcut',
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hello again <@${payload.user_id}>`,
            // text: `Hello again <@${payload.user_id}>, this channel is managed by contract with signature ${bb}
            // Your account public address is ${newAddress} use this account to recieve funds.
            // Your current balance is ${userBalance}`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click me!",
            },
            action_id: "button_abc",
          },
        },
      ],
      bolly: "gotcha",
      // Text in the notification
      text: "Message from Test App",
    });
  } catch (error) {
    console.error(error);
  }
});

app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${message.user}>!`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
            },
            action_id: "button_click",
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });
  } catch (error) {
    error;
  }
});

// app.command("/checkbalance", async ({ ack, payload, context }) => {
//   try {
//     // Acknowledge the command request
//     await ack();

//     // Here is the Ethereum code:
//     // Retrieval of user account balance -- does this need to access an event as well as a function, so that we get a notification?:
//     const userAddress = payLoad.user_id; // will this work, given that we hashed the user_id into a privateKey on account creation?
//     const userBalance = await token.methods.balanceOf(userAddress);
//     console.log(userBalance);

//     // Here is the Slack response code:
//     const result = await app.client.chat.postMessage({
//       // type: 'shortcut',
//       token: context.botToken,
//       // Channel to send message to
//       channel: payload.channel_id,
//       // Include a button in the message (or whatever blocks you want!)
//       blocks: [
//         {
//           type: "section",
//           text: {
//             type: "mrkdwn",
//             text: `Hello again <@${payload.user_id}>.`,
//             text: `Hello again <@${payload.user_id}>.
//             Your current balance is ${userBalance}`,
//           },
//           accessory: {
//             type: "button",
//             text: {
//               type: "plain_text",
//               text: "Click me!",
//             },
//             action_id: "button_abc",
//           },
//         },
//       ],
//       bolly: "gotcha",
//       // Text in the notification
//       text: "Message from Test App",
//     });

//   } catch (error) {
//     console.error(error);
//   }
// });

// Code for event listener
app.event("message.im", async ({ event, client, context }) => {
  await ack(); // does this send an empty 'HTTP 200 OK' response?
  try {
    // // Here is the Ethereum code:
    // // This code may take some time to run and receive response, so we might need to send different response type:
    // // https://api.slack.com/interactivity/handling#responses //e.g. a POST to a response_url with a message payload once Eth-data retrieved
    // // webhooks?
    // // Transfer of funds based on user activity:
    // const userAddress = client.event.user; // will this work, given that we hashed the user_id into a privateKey on account creation?
    // const send = await token.methods.transfer(userAddress, 20);
    // console.log(send);

    // // Check new user balance:
    // const userBalance = await token.methods.balanceOf(userAddress);
    // console.log(userBalance);

    const result = await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        callback_id: "home_view",

        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              response_type: "ephemeral", // or "in_channel"
              text: "*Welcome to your _App's Home_* :tada:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3880);

  console.log("⚡️ Bolt app is running!");
})();
