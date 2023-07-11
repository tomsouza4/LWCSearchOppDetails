public with sharing class FilteredTableControllerProduct2 {
    @AuraEnabled(cacheable=true)
    public static List<PricebookEntry> getProducts(
        String productName,
        String productCode,
        String productListPrice,
        String productDescription,
        String productFamily
    ) {
        String query;
        System.debug('productListPrice value: ' + productListPrice);

        // For the query notation this is using ternary if statement 
        String condition = (String.isNotBlank(productName)
            ? 'Product2.Name LIKE \'' + '%' + productName + '%\''
            : '');

        condition += (String.isNotBlank(productCode)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Product2.ProductCode LIKE \'' +
              '%' +
              productCode +
              '%\''
            : '');

        condition += (String.isNotBlank(productListPrice)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' UnitPrice = ' +
              productListPrice  
            : '');

        condition += (String.isNotBlank(productDescription)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Product2.Description LIKE \'' +
              '%' +
              productDescription +
              '%\''
            : '');

        condition += (String.isNotBlank(productFamily)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Product2.Family LIKE \'' +
              '%' +
              productFamily +
              '%\''
            : '');

        System.debug('condition ' + condition);
        if (String.isNotBlank(condition)) {
            query =
                'SELECT Product2.Name,Product2.ProductCode,UnitPrice,Product2.Description,Product2.Family ' + 
                ' FROM PricebookEntry WHERE ' +
                condition +
                ' AND pricebook2.isStandard = true ORDER BY Product2.Name';
                System.debug('Query: ' + query);
        } else {
            query = 'SELECT Product2.Name,Product2.ProductCode,UnitPrice,Product2.Description,Product2.Family ' +
                    ' FROM PricebookEntry WHERE pricebook2.isStandard = true ORDER BY Product2.Name LIMIT 200';
        }

        return Database.query(query);
    }
}
