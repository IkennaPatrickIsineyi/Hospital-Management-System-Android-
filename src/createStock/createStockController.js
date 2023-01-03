
export const formProcessor = (event, url, states, setStates) => {
    event.preventDefault();
    if (states.stockName && states.description && Number(states.price)) {
        setStates({ blockView: true })
        const formData = new FormData();
        const content = {
            'name': states.stockName,
            'description': states.description,
            'price': states.price
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/createStock', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ showBanner: 2, blockView: false })
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    setStates({
                        showBanner: 1, blockView: false,
                        price: '', description: '', stockName: ''
                    })
                }
                else {
                    //failed
                    setStates({ blockView: false, showBanner: 2 })
                    return
                }
            });

        }, (err) => {
            setStates({ showBanner: 4, blockView: false });
        });
    }
    else {
        setStates({ showBanner: 5 })
        return
    }
}
