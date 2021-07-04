const express = require('express');
const router = express.Router();
var paypal = require('paypal-rest-sdk');
const Statistic = require('../models/statistic');
const Sale = require('../models/sale');
const Product = require('../models/product');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AX-gTpukjf6rA7qN7yMDSKFXvsUHo2Fu4uYaKO_C2ZNEM17peJjxmGlwBSgf_YX04ICXFso3YnoTslgl',
    'client_secret': 'EG6dwbc6tIFg2YBwa315oX5CBMtAzIAkj6o4g3spCJAKC9I7zZCbdwRgKuEMmYmAOz2NRyZp8fBrO7tK'
});

router.post('/pay', async (req, res) => {

    var items = [];
    var pPrice = 0;

    for(let i = 0;i < req.body.name.length;i++){
        var itbms = parseFloat(req.body.price[i]) * 0.07;
        var pPrice = parseFloat(req.body.price[i]) + itbms;
        items.push(
            {
                "name": req.body.name[i],
                "sku": "item",
                "price": Math.round(pPrice * 100) / 100,
                "currency": "USD",
                "quantity": 1
            }
        )
    }
    console.log(items)

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/carrito"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": req.body.priceTotal
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });

});


router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    //console.log(req)

    const execute_payment_json = {
      "payer_id": payerId
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {

        const totalAmount = payment.transactions[0].amount.total;
        const total_purchased = payment.transactions[0].item_list.items.length;
        
        const items = payment.transactions[0].item_list.items;
        const productsNames = []

        for(let i = 0; i < total_purchased;i++){
            productsNames.push(items[i].name)
        }
        
        console.log(totalAmount)
        console.log(total_purchased)
        console.log(productsNames)
        
    try {
        //GUARDAR NUEVA VENTA
        await new Sale({
            total_buy: totalAmount,
            total_purchased: total_purchased,
            products:productsNames
        }).save()

        //ACUTALIZAR ESTADISTICAS
        const stats = await Statistic.find({});
        const id = stats[0].toObject()._id;
        
        await Statistic.findOneAndUpdate(
            {_id: id},
            {
                $inc: {
                    'total_sales' : 1, 
                    'total_earnings': totalAmount, 
                        'total_sold_products': total_purchased
                }
            }).exec();
        
    } catch (error) {
        console.log(error)
    }
        
        res.send(JSON.stringify(payment.transactions));

          //Aqui va el render de la pagina
      }
  });
    
})


router.get('/cancel', (req, res) => {
    res.render('carrito.ejs');
})

module.exports = router;