const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:3000'
            : 'https://alowee.twc.com');

const token = localStorage.getItem('tkn') || null;

if (!token) {
    window.location = `${ url }/login`;
}

const removeLoader = () => {
    let loader = document.querySelector('.loader');
    loader.hidden = true;
}

const getLoader = () => {
    let loader = document.querySelector('.loader');
    loader.hidden = false;
}

let socket;

const logout = () => {
    localStorage.removeItem('tkn');
    localStorage.removeItem('ur');
    localStorage.removeItem('uid');
    window.location = url;
}

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'tkn': token
        }
    });

    socket.on('connect', () => console.log('Socket Online'));
    socket.on('disconnect', () => {
        console.log('Socket Offline');
        // logout();
    });
}

const app = async() => {
    await connectSocket();
}

app();