let initialState = {
    contacts: [{
        fname: 'Naveen',
        lname: 'sundar',
        phone: '8940073123',
        email: 'naveennvrgup@gmail.com'
    }, {
        fname: 'Sangeeth',
        lname: 'soundar',
        phone: '1654465464',
        email: 'sangeeth@gmail.com'
    },{
        fname: 'Naveen',
        lname: 'sundar',
        phone: '8940073123',
        email: 'naveennvrgup@gmail.com'
    }, {
        fname: 'Sangeeth',
        lname: 'soundar',
        phone: '1654465464',
        email: 'sangeeth@gmail.com'
    },{
        fname: 'Naveen',
        lname: 'sundar',
        phone: '8940073123',
        email: 'naveennvrgup@gmail.com'
    }, {
        fname: 'Sangeeth',
        lname: 'soundar',
        phone: '1654465464',
        email: 'sangeeth@gmail.com'
    },],
    nfname: '',
    nlname: '',
    nphone: '',
    nemail: ''
}

export default (state = initialState, action) => {
    let contacts
    switch (action.type) {
        case 'addContact':
            contacts = [...state.contacts]
            contacts.push({
                fname: state.nfname,
                lname: state.nlname,
                email: state.nemail,
                phone: state.nphone,
            })
            return {
                ...state,
                contacts,
                nfname: '',
                nlname: '',
                nemail: '',
                nphone: '',
            }
        case 'editContact':
            contacts = [...state.contacts]
            contacts[action.id] = {
                fname: state.nfname,
                lname: state.nlname,
                email: state.nemail,
                phone: state.nphone,
            }
            return {
                ...state,
                contacts,
                nfname: '',
                nlname: '',
                nemail: '',
                nphone: '',
            }
        case 'deleteContact':
            contacts = [...state.contacts]
            contacts = contacts.filter((ele, i) => i !== action.id)
            return {
                ...state,
                contacts
            }
        case 'updaten':
            return {
                ...state,
                [action.name]: action.value
            }

        default:
            return state;
    }
}