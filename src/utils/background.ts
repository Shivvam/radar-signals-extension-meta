

const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('977622655626797096');
const RESPONSE_TYPE = encodeURIComponent('code');
const REDIRECT_URI = encodeURIComponent('https://fkipongejlaaachjiaipijmmnhcacbca.chromiumapp.org');
const SCOPE = encodeURIComponent('identify guilds');
const BASE_URL = "https://radar-signal-be.herokuapp.com";

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    let endpoint_url = `${DISCORD_URI_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&nonce=${nonce}`;
    return endpoint_url;
}

const getAccessToken = async (code: string) => {
    const response = await fetch(`${BASE_URL}/authorize`, {
        method: 'POST',
        body: JSON.stringify({
            code
        })
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
}

const submitSignal = async (token:string,signalMessage: string,channelId:string) => {
    const response = await fetch(`${BASE_URL}/submitSignal`, {
        method: 'POST',
        mode : 'no-cors',
        body: JSON.stringify({
            message:signalMessage,
            channelId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const json = await response.json();
    return json;
}


const getProfile = async (token: string) => {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const json = await response.json();
    console.log(json);
    // return json
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'LOGIN') {
        chrome.identity.launchWebAuthFlow({
            url: create_auth_endpoint(),
            interactive: true
        }, function (redirect_uri) {
            console.log(redirect_uri);
            if (chrome.runtime.lastError || redirect_uri?.includes('access_denied')) {
                console.log("Could not authenticate.");
                sendResponse('fail');
            } else {
                const code = redirect_uri!.split('=')[1];
                console.log("code",code);
                getAccessToken(code).then(json => {
                    console.log(json);
                    if(json) {
                        sendResponse(json);
                    }else {
                        sendResponse('fail');
                    }
                }).catch(err => {
                    console.log(err);
                    sendResponse('fail');
                })
            }
        });
        return true;
    }

    if(request.message === 'AUTHENTICATE') {
        getProfile(request.token).then(json => {
            console.log(json);
            sendResponse('success');
        }).catch(err => {
            console.log(err);
            sendResponse('fail');
        });
        return true;
    }

    if (request.message === 'SEND_SIGNAL') { 
        submitSignal(request.token,request.signalMessage,request.channelId).then(json=>{
            console.log(json);
            sendResponse('success');
        }).catch(err => {
            console.log(err);
            sendResponse('fail');
        });
        return true;

    }
});

