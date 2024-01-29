
# FilteredTable LWC Component

## Overview

This Lightning Web Component (LWC) dynamically renders a table of product records with extensive filtering and search capabilities. Users can filter products based on various criteria, including:

- Product Name
- Product Code
- List Price
- Description
- Product Family
The component also supports a general search functionality that filters across multiple fields simultaneously.

## Key Features
- Data Fetching: Efficiently retrieves product data using an Apex wire adapter (getProducts).
- Filtering: Enables users to filter products based on specific criteria using input fields and a picklist for Product Family.
- Search: Allows users to perform a general search across multiple fields using a dedicated search bar.
- Navigation: Supports navigation to individual product record pages using the NavigationMixin.
- Error Handling: Displays informative toast messages in case of errors.
- User Experience: Provides a responsive and intuitive filtering and search experience.

## Implementation Details
- Apex Controller: Leverages an Apex controller class (FilteredTableControllerProduct2) to fetch and filter product data on the server-side.
- Wire Adapters: Uses wire adapters to connect to Apex methods and retrieve data asynchronously.
- Picklist Values: Fetches picklist values for the Product Family field using getPicklistValues.
- Data Manipulation: Filters and searches product data on the client-side using JavaScript methods.
- Navigation: Uses the NavigationMixin to navigate to product record pages.

## Usage
- Import the FilteredTable component into your Lightning page or app.
- Optionally, provide initial filter values using the component's attributes (e.g., productName, productCode).
- Interact with the filtering and search controls to refine the displayed product list.
- Click on a product row to navigate to its record page.
