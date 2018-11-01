// Requires
const http = require('http');
const fs = require('fs')


const options =  {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/people',
    method: 'GET',
}

const req = http.request(options, (response) => {
    console.log(response.statusCode);
    let body = '';
    response.on('data', (data) => {
        body += data;
    })
    response.on('end', () => {
        body = JSON.parse(body);
        // Write file of northcoder objects
        const northcoders = body.people.filter(person => person.job.workplace = 'northcoders')
        fs.writeFile(`northcodersRaw.txt`,JSON.stringify(northcoders), () => {} )

        // Get array of usernames
        const ncUsernames = northcoders.reduce((acc, northcoder) => {
            acc.push(northcoder.username);
            return acc;
        }, [])
        
        // Request user interests
        // ncUsernames.forEach(user => {
        //     const userOptions = {
        //     hostname: 'nc-leaks.herokuapp.com',
        //     path: `/api/people/${user}/interests`,
        //     method: 'GET',
        //     }

        //     const userReq = http.request(userOptions, (response) => {
        //         let bodyInterests = ''
        //         response.on('data', data => {
        //             bodyInterests += data;
        //         })
        //         response.on('end', ()=> {
        //             bodyInterests = JSON.parse(bodyInterests);
        //             console.log(JSON.stringify(bodyInterests))
        //             fs.writeFile('ncInterests.txt', JSON.stringify(bodyInterests), () => {});

        //         })

        //     })
        //     userReq.end();

        // })
        let bodyInterests = '';
        let counter = 0;
        ncUsernames.forEach(user => {
            const userOptions = {
            hostname: 'nc-leaks.herokuapp.com',
            path: `/api/people/${user}/interests`,
            method: 'GET',
            }

            const userReq = http.request(userOptions, (response) => {
                response.on('data', data => {
                    bodyInterests += data;
                })
                response.on('end', ()=> {
                    counter++
                    if (counter === ncUsernames.length) {
                        // console.log(typeof bodyInterests === 'string')
                        bodyInterests = JSON.parse(bodyInterests);
                        console.log(bodyInterests)   
                        // console.log(JSON.stringify(bodyInterests))
                        // fs.writeFile('ncInterests.txt', JSON.stringify(bodyInterests), () => {});
                    }
                })

            })
            userReq.end();

        })
        
    });
    response.on('error', (error) => {
        console.log(error);
    })
})

req.end();


