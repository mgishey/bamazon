# bamazonCustomer.js
A CLI app using MySQL and node.js to create an application similar to the type used behind the counter at auto parts stores.  In this case we are dealing with motorcycles and their accessories.

## Step by Step Instructions
1. Open a terminal
2. Type the command `node bamazonCustomer.js` at prompt to start the application.

    **Example 1:** In this example the user requests more units of a product than there are in inventory.  The user is notified than there is not enough product and the application ends.

    ![bam-not-in-stock](/images/bam-not-in-stock.png)

    **Example 2** Here the user requests a product in which inventory is sufficent to handle the number of units requested. The existing stock is depleted by the number of units the customer requested.  The database is updated to reflect this change in stock. The customer is then presented with the total price.

    ![bam-in-stock](/images/bam-in-stock.png)

# bamazonManager.js
Another CLI app that lets a manager of the store:
* View products for sale.
* View low inventory (anything under 5 units).
* Add to inventory.
* Add a new product.

## Step by Step Instructions
1. Open a terminal.
2. Type the command `node bamazonManager.js`.

    **Example 1:** In this example the manager selects the menu option `View Products For Sale` and is presented with the items in the products table.

    **Example 2:** After displaying the products, the manager uses the `View Low Inventory` menu option and is presenting with a listing of all products with under 5 units in stock

    ![bam-mgr-1](/images/bam-mgr-1.png)

    **Example 3:** 

    ![bam-mgr-2](/images/bam-mgr-2.png)

    **Example 4:**

    ![bam-mgr-3](/images/bam-mgr-3.png)


## Tecnologies Used

* Javascript
* Nodejs
* mySQL
* Git
* Github