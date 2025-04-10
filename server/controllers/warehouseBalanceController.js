
const WarehouseBalance = require('../model//WarehouseBalance');
const IncomingProduct = require('../model//IncomingProducts');


const getAllProductsSummary = async (req, res) => {
    try {
        console.log(req);
        var page = req.body.page;
        var onPage = req.body.onPage;

        if (page === undefined) {
            onPage = 100000;
            skipParam = 0;
        } else {
            if (req.body.page == 1) {
                skipParam = 0;
            } else {
                skipParam = parseInt(page) * onPage - onPage;
            }
        }

        const incomingProductsSummary = await IncomingProduct.aggregate([
            {
                $sort: { _id: -1 } // Sort the documents in descending order based on _id
            },
            {
                $skip: skipParam // Skip documents based on the skipParam value
            },
            {
                $limit: onPage // Limit the number of documents returned based on the onPage value
            },
            {
                $group: {
                    _id: "$productIdent",
                    totalBalance: { $sum: "$balance" },
                    totalBoxCountBalance: { $sum: "$boxCountBalance" }, // Sum of boxCountBalance
                    totalQuantityBalance: { $sum: "$quantityBalance" }, // Sum of quantityBalance
                    name: { $first: "$name" },
                    dimensions: { $first: "$dimensions" }
                }
            },
            {
                $project: {
                    productIdent: "$_id",
                    totalBalance: 1,
                    totalBoxCountBalance: 1, // Include totalBoxCountBalance
                    totalQuantityBalance: 1, // Include totalQuantityBalance
                    name: 1,
                    dimensions: 1
                }
            }
        ]).exec();

        if (!incomingProductsSummary) return res.status(204).json({ 'message': 'No Warehouses lists found' });

        var jsonString = incomingProductsSummary;
        var mainObj = {
            errorCode: 0,
            jsonString
        };

        res.status(200).json(mainObj);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
	getAllProductsSummary,
}