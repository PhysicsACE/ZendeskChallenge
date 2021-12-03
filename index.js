const cors = require('cors')
//set up express server
const express = require('express')
const http = require('http')
const https = require('https')
const path = require('path')
const socketio = require('socket.io')
const tickets = require('./tickets.json')
const axios = require('axios').default

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(cors())




io.on('connection', socket =>{

    socket.on('fetchData', async () => {


        // var config = {
        //     method: 'get',
        //     url: 'https://zccparthzendeskchallenge.zendesk.com/api/v2/requests.json',
        //     headers: { 
        //     'Authorization': 'Basic YW1pbnBhcnRoMzY5QGdtYWlsLmNvbTpQYWNlMTkyODM3IQ==', 
        //     'Cookie': '__cfruid=649a9872ba15adc01dea0a2312a3bcd7b72a7d06-1638288748'
        //     }
        // };

        // var config = {
        //     method: 'get',
        //     url: 'https://zccparthzendeskchallenge.zendesk.com/api/v2/tickets.json',
        //     headers: { 
        //       'Authorization': 'Basic YW1pbnBhcnRoMzY5QGdtYWlsLmNvbTpQYWNlMTkyODM3IQ==', 
        //       'Cookie': '__cfruid=266f4bc4692cc4fbc88a7167f9d96466e32cc87e-1638388272'
        //     }
        // };
        
        // axios(config)
        // .then(function (response) {
        //     var flag = false
        //     var page = 1
        //     const tickets = response.data.tickets
        //     if (response.data.next_page) {
        //         flag = true
        //         page += 1
        //     }

        //     // console.log(tickets)
        // for (var i = 0; i < tickets.length; i++) {
        //     d[counter].push(tickets[i])
        //     if (accumulator == 24){
        //         accumulator = 0
        //         counter += 1
        //         d[counter] = []
        //     } else {
        //         accumulator += 1
        //     }
        // }
        // socket.emit('retreiveData', {d})
        // })
        // .catch(function (error) {
        //     console.log(error.message)
        // });

        const fetchTickets = (tickets, page) => {

            var counter = 1
            var accumulator = 0
            var d = {}
            d[counter] = []

            var config = {
                method: 'get',
                url: 'https://zccparthzendeskchallenge.zendesk.com/api/v2/tickets.json?page=' + page,
                headers: { 
                  'Authorization': 'Basic YW1pbnBhcnRoMzY5QGdtYWlsLmNvbTpQYWNlMTkyODM3IQ==', 
                  'Cookie': '__cfruid=266f4bc4692cc4fbc88a7167f9d96466e32cc87e-1638388272'
                }
            };
        
            axios(config)
            .then(function (response) {
                tickets.push(...response.data.tickets)
                if (page > 1) {
                    console.log(response.data.next_page)
                }
                if (response.data.next_page) {
                    fetchTickets(tickets, page + 1)
                } else {
                    for (var i = 0; i < tickets.length; i++) {
                        d[counter].push(tickets[i])
                        if (accumulator == 24){
                            accumulator = 0
                            counter += 1
                            d[counter] = []
                        } else {
                            accumulator += 1
                        }
                    }
                    socket.emit('retreiveData', {d})
                }
            })
            .catch(function (error) {
                var e = error.message
                socket.emit('retreiveError', {e})
            });
        }

        var tickets = fetchTickets([], 1)

    })
      
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))