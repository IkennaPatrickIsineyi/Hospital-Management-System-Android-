
export const loggedIn = (payload, navigate, setAppState, users) => {
    setAppState({ loggedIn: true, username: payload.data.staffId });
    navigate(users[payload.data.user], { replace: true, state: { requiredData: payload.data } })
}


export const callEntry = (callback, designation, selectedDesignation, url, setAppState, navigate) => {
    console.log('callEntry ', designation, selectedDesignation);
    if (designation === selectedDesignation || designation === undefined || designation === null) {
        fetch(`${url}/ad`, {
            method: 'get',
            credentials: 'include'
        }).then(response => {
            response.json().then((body) => {
                console.log('responded...');
                if (response.status !== 200) {
                    throw Error(body.message);
                }
                else if (body.respCode === 0) {
                    //error occurred
                    console.log('error occurred');
                }
                else {
                    //no issue server issues
                    console.log()
                    console.log("success...");
                    callback(body);
                }

            });
        }, (err) => {
            navigate(-1);
        });
    }
    else {
        callback({ respCode: 2 });
    }
};
