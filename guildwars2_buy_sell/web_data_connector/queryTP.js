(function () {

    // DEFINE THE TRADING POST INFORMATION TABLE
    var myConnector = tableau.makeConnector();

    // Define schema
    myConnector.getSchema = function (schemaCallback) {

        // Price information table
        var price_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "buyprice",
            alias: "Buy Price",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "buyquantity",
            alias: "Buy Quantity",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sellprice",
            alias: "Sell Price",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sellquantity",
            alias: "Sell Quantity",
            dataType: tableau.dataTypeEnum.int
        }];
        
        var priceSchema = {
            id: "gw2PriceFeed",
            alias: "Current buy/sell prices",
            columns: price_cols
        };

        // Items information table
        var item_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "name",
            alias: "Item Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            alias: "Item Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "img_url",
            alias: "Image URL",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "baseval",
            alias: "Base Value",
            dataType: tableau.dataTypeEnum.int
        }];

        var itemSchema = {
            id: "gw2ItemFeed",
            alias: "Information on items",
            columns: item_cols
        };
    
        schemaCallback([priceSchema, itemSchema]);
    };
    
    // How to get the data
    myConnector.getData = function(table, doneCallback) {

        // initialize the table data
        var tableData = [];
        var api_url = "https://api.guildwars2.com/v2/";

        // Price query
        if (table.tableInfo.id == "gw2PriceFeed") {
            // Get the price information
            $.getJSON(api_url+"commerce/prices?ids="+tableau.connectionData, function(resp) {

                // Iterate over the JSON object
                for (var i = 0, len = resp.length; i < len; i++) {
                    tableData.push({
                        "id":           resp[i].id,
                        "buyprice":     resp[i].buys.unit_price,
                        "buyquantity":  resp[i].buys.quantity,
                        "sellprice":    resp[i].sells.unit_price,
                        "sellquantity": resp[i].sells.quantity
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        }

        if (table.tableInfo.id == "gw2ItemFeed") {
            $.getJSON(api_url+"items?ids="+tableau.connectionData, function(resp) {
        
                // Iterate over the JSON object
                for (var i = 0, len = resp.length; i < len; i++) {
                    tableData.push(data = {
                        "id":          resp[i].id,
                        "name":        resp[i].name,
                        "description": resp[i].description,
                        "img_url":     resp[i].icon,
                        "baseval":     resp[i].vendor_value
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        }

    };

    tableau.registerConnector(myConnector);
})();

// Tier 1 button
$(document).ready(function () {
    $("#tier1Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 1 Feed";
        tableau.connectionData = "19697,19718,19719,19723,24290,24342,24346,24272,24352,24284,24296,24278";
        tableau.submit();
    });
});

// Tier 2 button
$(document).ready(function () {
    $("#tier2Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 2 Feed";
        tableau.connectionData = "19699,19703,19739,19728,19726,24291,24343,24347,24273,24353,24285,24297,24279";
        tableau.submit();
    });
});

// Tier 3 button
$(document).ready(function () {
    $("#tier3Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 3 Feed";
        tableau.connectionData = "19698,19741,19730,19727,24292,24344,24348,24274,24354,24286,24298,24280";
        tableau.submit();
    });
});

// Tier 4 button
$(document).ready(function () {
    $("#tier4Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 4 Feed";
        tableau.connectionData = "19702,19743,19731,19724,24293,24345,24349,24275,24355,24287,24363,24281";
        tableau.submit();
    });
});

// Tier 5 button
$(document).ready(function () {
    $("#tier5Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 5 Feed";
        tableau.connectionData = "19700,19748,19729,19722,24294,24341,24350,24276,24356,24288,24299,24282";
        tableau.submit();
    });
});

// Tier 6 button
$(document).ready(function () {
    $("#tier6Button").click(function () {
        tableau.connectionName = "GW2 Trading Post Tier 6 Feed";
        tableau.connectionData = "19701,19745,19732,19725,24295,24358,24351,24277,24357,24289,24300,24283";
        tableau.submit();
    });
});
