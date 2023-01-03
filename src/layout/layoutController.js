
export const logOut = (url, setStates, navigate, setAppState) => {
    setStates({ blockView: true })
    fetch(`${url}/logOut`, {
        method: 'get',
        credentials: 'include'
    }).then(response => {
        response.json().then((body) => {
            console.log('responded...');
            if (response.status !== 200) {
                setStates({ blockView: false })
                throw Error(body.message);
            }
            else if (body.respCode === 0) {
                //error occurred
                console.log('error occurred');
                setStates({ blockView: false })
            }
            else {
                //no issue server issues
                console.log()
                console.log("success...");
                setAppState({ loggedIn: false, username: '' });
                setStates({ blockView: false, showModal: true });
                navigate('/landing', { replace: true })
            }
        });
    }, (err) => {
        setStates({ blockView: false });
    });
};
