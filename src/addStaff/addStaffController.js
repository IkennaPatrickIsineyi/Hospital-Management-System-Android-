import jsPDF from 'jspdf'


export const genIdCard = (idCardRef, setStates, navigate) => {
    const doc = new jsPDF({
        format: 'a4',
        unit: 'px'
    });
    doc.html(idCardRef.current, {

    }).then((val) => {
        console.log('created');
        doc.save('staffIdCard');
        setStates({ showModal: false })
        navigate('/home', { replace: true })
    })
}


export const formProcessor = (event, states, setStates, url) => {
    event.preventDefault();
    if (states.firstName && states.lastName && states.designation && states.employmentDate &&
        states.phone && states.email && states.birthday && states.address && states.picture) {

        setStates({ blockView: true })

        const formData = new FormData();
        const content = {
            'firstname': states.firstName, 'lastname': states.lastName, 'email': states.email,
            'designation': states.designation, 'dateemployed': states.employmentDate,
            'phonenumber': states.phone, 'birthday': states.birthday, 'address': states.address,
            'image': states.picture
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/createAccount', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ blockView: false, showBanner: 2 })
                }
                else if (body.respCode === 1) {
                    // successful
                    setStates({ blockView: false, feedBack: body.data, showModal: true })
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
