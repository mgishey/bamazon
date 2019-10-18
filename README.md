# bamazon
A CLI app using MySQL and node.js to create an application similar to the type used behind the counter at auto parts stores.  In this case we are dealing with motorcycles and their accessories.

## Step by Step Instructions
1. Open a terminal
2. Type the command `node bamazonCustomer.js` at prompt to start the application.

    **Example 1:** In this example the user requests more units of a product than there are in inventory.  The user is notified than there is not enough product and the application ends

    ![bam-not-in-stock](/images/bam-not-in-stock.png)

    **Example 2** Here the user requests a product in which inventory is sufficent to handle the number of units requested. The existing stock is depleted by the number of units the customer requested.  The database is updated to reflect this change in stock. The customer is then presented with the total price.

    ![bam-in-stock](/images/bam-in-stock.png)

## Tecnologies Used

* Javascript
* Nodejs
* mySQL
* Git
* Github