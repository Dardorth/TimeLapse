const express = require('express');
const router = express.Router();
const Statistic = require('../models/statistic');
const Sale = require('../models/sale');

// Rutas admin
router.get('/panelControl', (req, res) => {
    res.render('admin/panelControl');
});
router.get('/usuariosRegistrados', (req, res) => {
    res.render('admin/usuariosRegistrados');
});
router.get('/ganancias', async (req, res) => {

    const stats = await Statistic.find({});
    const totalSales = stats[0].toObject().total_sales;
    const totalEarnings = stats[0].toObject().total_earnings;
    const soldProducts = stats[0].toObject().total_sold_products;
    
    const sales = await Sale.find({'year':2021});
    const sales_per_month = monthSales(sales);

/*

    const id = stats[0].toObject()._id;
    const totalBuy = 2.99;
    const totalPurchased = 1;
    const products = ['60d6ce7753fd06781cc22daf','60d6cfa654c56d1820a6c5da']

    //GUARDAR VENTA
    await new Sale({
        total_buy: 6.99,
        total_purchased: 2,
        products:products
    }).save()

    //GUARDAR/ACUTALIZAR ESTADISTICAS
    await Statistic.findOneAndUpdate(
        {_id: id},
        {
            $inc: {'total_sales' : 1, 'total_earnings': 2.99},
            $push: {
                'records': 
                {                
                    total_buy: totalBuy,
                    total_purchased: totalPurchased
                }
            }
        }
        ).exec();*/
    
    res.render('admin/ganancias',{totalSales,totalEarnings,soldProducts,sales_per_month});
});
router.get('/administrarCursos', (req, res) => {
    res.render('admin/administrarCursos');
});



function monthSales(sales){
    sales_per_months = {
        enero:0,
        febrero:0,
        marzo:0,
        abril:0,
        mayo:0,
        junio:0,
        julio:0,
        agosto:0,
        septiembre:0,
        octubre:0,
        noviembre:0,
        diciembre:0
    }

    sales.forEach(sale => {
        month = sale.month + 1;

        switch(month){
            case 1:
                sales_per_months.enero += sale.total_purchased;
            break;
            case 2:
                sales_per_months.febrero += sale.total_purchased;
            break;
            case 3:
                sales_per_months.marzo += sale.total_purchased;
            break;
            case 4:
                sales_per_months.abril += sale.total_purchased;
            break;
            case 5:
                sales_per_months.mayo += sale.total_purchased;
            break;
            case 6:
                sales_per_months.junio += sale.total_purchased;
            break;
            case 7:
                sales_per_months.julio += sale.total_purchased;
            break;
            case 8:
                sales_per_months.agosto += sale.total_purchased;
            break;
            case 9:
                sales_per_months.septiembre += sale.total_purchased;
            break;
            case 10:
                sales_per_months.octubre += sale.total_purchased;
            break;
            case 11:
                sales_per_months.noviembre += sale.total_purchased;
            break;
            case 12:
                sales_per_months.diciembre += sale.total_purchased;
            break;
        }

    });
    return sales_per_months;
}

module.exports = router;