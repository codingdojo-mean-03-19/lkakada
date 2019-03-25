const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const session = require('express-session');
const sessionConfig = {
    secret: 'thisissecretforever',
    resave: false,
    saveUninitialized: true,
    name: 'session',
    cookie: { maxAge: 1000 * 60 * 60 }
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('views')));
app.use(session(sessionConfig));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/people/:arg', (req, res) => {
    let apiCall;

    if (req.params.arg == 'next') {
        apiCall = axios.get(req.session.next);
    } else if (req.params.arg == 'prev') {
        apiCall = axios.get(req.session.previous);
    } else {
        apiCall = axios.get('https://swapi.co/api/people');
        console.log('default apiCall returns: ', apiCall)
    }
    apiCall
        .then(data => {
            req.session.category = '/people';
            req.session.next = data.data.next;
            req.session.previous = data.data.previous;
            res.json(data.data);
        })
        .catch(error => {
            res.json(error);
        })
});
app.get('/planets/:arg', (req, res) => {
    let apiCall;
    if (req.params.arg == 'next') {
        apiCall = axios.get(req.session.next);
    } else if (req.params.arg == 'prev') {
        apiCall = axios.get(req.session.previous);
    } else {
        apiCall = axios.get('https://swapi.co/api/planets');
        console.log('default apiCall returns: ', apiCall)
    }
    apiCall
        .then(data => {
            req.session.category = '/planets';
            req.session.next = data.data.next;
            req.session.previous = data.data.previous;
            res.json(data.data);
        })
        .catch(error => {
            res.json(error);
        })
});

app.get('/next', (req, res) => {
    res.redirect(req.session.category + '/next');
});
app.get('/prev', (req, res) => {
    res.redirect(req.session.category + '/prev');
});

app.get('/all', (request, response) => {
    response.redirect(request.session.category + '/0');
});

app.get('/all/people', (req, res) => {
    getAll("people")
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});
app.get('/all/planets', (req, res) => {
    getAll("planets")
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});
function getAll(apiEle) {
    let results = [];
    let page = 1;

    const getListAll = (page) => {
        return axios.get(`http://swapi.co/api/${apiEle}?page=${page}`)
            .then(response => {
                results = results.concat(response.data).results;
                page++;
                if (response.data.next !== null) {
                    return getListAll(page);
                } else {
                    return results;
                }
            })
            .catch(error => {
                return error;
            })
    }
    return getListAll(page);
};
app.listen(port, () => {
    console.log(`Listenning on port ${port}...`);
});