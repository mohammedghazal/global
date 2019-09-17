const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const  orders = [
{id: 1, name: 'node'},
{id: 2, name: 'Asp'},
{id: 3, name: 'C#'}
];

app.get('/api/orders', (req, res) => {
    res.send(orders);
});

app.get('/api/orders/:id', (req, res) => {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if(!order) return res.status(404).send('The order with given ID was not found');
        res.send(order);
 });

 app.post('/api/orders', (req, res) => {


    const result = validateOrder(req.body);
     if ( result.error) {
         res.status(400).send(result.error.details[0].message);
         return;
     }
    const order = {
        id: orders.length + 1,
        name: req.body.name
        };
    orders.push(order);
    res.send(order)
});

app.put('/api/orders/:id', (req, res) => {
    //look up the order
    //if doesn't exist return 404 
    if(!order) {

        res.status(404).send('The order with given ID was not found');
        return;
       }

 
    //if invalid, return 400 - bad request 
    
   const result = validateOrder(req.body);
     if ( result.error) {
         res.status(400).send(result.error.details[0].message);
         return;
     }
    

    //update order
    order.name = req.body.name;

    //return the updated order 
    res.send(order);

});



app.delete('/api/orders/:id', (req, res) => {
    //look up the order
    //if doesn't exist return 404 
    const order = orders.find(c => c.id === parseInt(req.params.id));
    if(!order) {

     res.status(404).send('The order with given ID was not found');
     return;
    }

    //delete order
    const index = orders.indexOf(order); //find the index of the order from orders array 
    orders.splice(index, 1);

    //return the same order 
    res.send(order);

});

function validateOrder(order) {
       //valdiate
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(order, schema);

};

// app.get('/api/orders/:id', (req, res) => {
//     res.send(req.params.id);
// });

//app.get('/api/orders/:year/:month', (req, res) => {
  //  res.send(req.params);
//});

app.get('/api/orders/:year/:month', (req, res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));