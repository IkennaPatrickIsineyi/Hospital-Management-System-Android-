export const formProcessor = (event, url, states, setStates,
    navigate, selectedDesignation, users, setAppState) => {
    event.preventDefault();
    if (states.username && states.password) {
        setStates({ blockView: true, showBanner: 0, })
        fetch(`${url}/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'staffId': states.username,
                'password': states.password, 'designation': selectedDesignation
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            response.json().then((body) => {
                setStates({ blockView: false })
                console.log(response.status);
                if (response.status !== 200) {
                    //failed
                    console.log('failed');
                    setStates({ showBanner: 4, blockView: false })

                }
                else if (body.respCode === 0) {
                    //unknown error 
                    console.log('failed2');

                    setStates({ showBanner: 4, blockView: false })

                    //show custom error page
                    return
                }
                else if (body.respCode === 1) {
                    //login successful
                    console.log(body);
                    const user = body.data.user;
                    setStates({ ...states, showBanner: 1, blockView: false });
                    setAppState({ loggedIn: true, username: body.data.staffId });
                    navigate(users[user],
                        { replace: true, state: { requiredData: body.data } });
                    // <Entry />
                }
                else if (body.respCode === 2) {
                    //invalid login
                    setStates({ showBanner: 2, blockView: false });
                    //show custom error page
                    return
                }
                else {
                    //already logged in
                    setStates({ showBanner: 6, blockView: false })
                    return
                }
            });

        }, (err) => {
            setStates({ showBanner: 4, blockView: false });
        });
    }
    else {
        setStates({ showBanner: 2, blockView: false })
        return
    }
}
