const express = require('express');
const router = express.Router();
const Statistic = require('../models/statistic');
const Sale = require('../models/sale');
const Product = require('../models/product');

// Rutas admin
router.get('/panelControl', (req, res) => {
    res.render('admin/panelControl');
});
router.get('/usuariosRegistrados', (req, res) => {
    res.render('admin/usuariosRegistrados');
});
router.get('/ganancias', async (req, res) => {

    try {
        //------------- Estadisticas ----------------
    //Query para recibir las estadisticas de la Coleccion 'Statistics'
    const stats = await Statistic.find({});

    //------------- Ventas ----------------
    const año = (new Date()).getFullYear();//Año actual
    const sales = await Sale.find({'year':año});

    //Cacular las VENTAS por MES del año actual
    const sales_per_month = monthSales(sales);
    
    //------------ VENTAS POR PRODUCTOS------------
    /*
        Hubiera querido poner esto en una funcion aparte,
        pero no logre hacerlo, al final tuve que colocarlo todo
        aqui mismo
     */
    //Recibo la lista de productos que existen en la tienda
    const productNames = await Product.find({}).select('name -_id');
    //Creo un arreglo donde guardare el conteo de cuantas veces
    //se ha comprado un determinado curso.
    var sales_by_product = []

    //Recorro la lista de nombres de productos en la tienda
    for (const element of productNames) {
        //Busco en la coleccion de venta, los productos con el nombre dado.
        const query = await Sale.find({'products': element.name});
        //Determino el tamaño de el objeto recibido de la BD
        count = Object.keys(query).length
        //Hago un objeto en donde guardo el nombre del curso y las veces que se ha comprado.
        var product = {
            name: element.name,
            count: count
        }
        //Lo agrego al arreglo que se ha declarado anteriormente.
        sales_by_product.push(product);
        
    }
    res.render('admin/ganancias',{stats,sales_per_month,sales_by_product});

    } catch (error) {
        console.log(error);
    }
});
router.get('/administrarCursos', (req, res) => {
    res.render('admin/administrarCursos');
});


async function count(){
    
    const productNames = await Product.find({}).select('name -_id');
    var productCount = []

    for (const element of productNames) {
        const query = await Sale.find({'products': element.name});
        count = Object.keys(query).length
        
        var product = {
            name: element.name,
            count: count
        }
        productCount.push(product);
    }
    return productCount;
}

//Funcion para calcular las VENTAS por MES del año actual
function monthSales(sales){

    //Inicializacion de arreglo con 12 indices (12 meses)
    sales_per_months = [0,0,0,0,0,0,0,0,0,0,0,0]

    sales.forEach(sale => {
        //Suma + 1 debido a que los meses se almacenan del 0 al 11
        month = sale.month + 1;

        switch(month){
            case 1:
                sales_per_months[0] += sale.total_purchased
            break;
            case 2:
                sales_per_months[1] += sale.total_purchased
            break;
            case 3:
                sales_per_months[2] += sale.total_purchased
            break;
            case 4:
                sales_per_months[3] += sale.total_purchased
            break;
            case 5:
                sales_per_months[4] += sale.total_purchased
            break;
            case 6:
                sales_per_months[5] += sale.total_purchased
            break;
            case 7:
                sales_per_months[6] += sale.total_purchased
            break;
            case 8:
                sales_per_months[7] += sale.total_purchased
            break;
            case 9:
                sales_per_months[8] += sale.total_purchased
            break;
            case 10:
                sales_per_months[9] += sale.total_purchased
            break;
            case 11:
                sales_per_months[10] += sale.total_purchased
            break;
            case 12:
                sales_per_months[11] += sale.total_purchased
            break;
        }

    });
    return sales_per_months;
}

module.exports = router;