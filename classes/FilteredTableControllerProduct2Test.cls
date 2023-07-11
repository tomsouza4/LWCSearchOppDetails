@isTest 
private class FilteredTableControllerProduct2Test {
@TestSetup
static void makeData(){
 
    Product2 product = new Product2(
        Name = 'Laptop X200',
        ProductCode = 'GC1060',
        Description = 'Desc',
        Family = 'NewFamily'       
    );
    insert product;

    //Instantiate the Pricebook2 record with StandardPricebookId
    Pricebook2 standardPricebook = new Pricebook2(
        Id = Test.getStandardPricebookId(),
        IsActive = true
    );
    
    //Execute an update DML on the Pricebook2 record, to make IsStandard to true
    Update standardPricebook;
 
    //Query for the Pricebook2 record, to check IsStandard field
    standardPricebook = [SELECT Id, IsStandard FROM Pricebook2 WHERE Id = :standardPricebook.Id];
    //It should return true
    System.assertEquals(true, standardPricebook.IsStandard, 'isStandard Pricebook');
     
     
    //Create the PricebookEntry
    PricebookEntry standardPrice = new PricebookEntry(
        Pricebook2Id = standardPricebook.Id,
        Product2Id = product.Id,
        UnitPrice = 10000,
        IsActive = true
    );
    insert standardPrice;
}
    @IsTest
    static void testGetProductsWithConditionals(){
        
        List <PricebookEntry> pricebookEntries = FilteredTableControllerProduct2.getProducts('Laptop X200','GC1060','10000','Desc','NewFamily');
        System.debug('pricebookEntries: ' + pricebookEntries);
        system.assertNotEquals(0, pricebookEntries.size(), 'We expect the method returns results');
    }
    @IsTest
    static void testGetProductsWithoutConditionals(){
        
        List <PricebookEntry> pricebookEntries = FilteredTableControllerProduct2.getProducts('','','','','');
        System.debug('pricebookEntries: ' + pricebookEntries);
        system.assertNotEquals(0, pricebookEntries.size(), 'We expect the method returns results');
    }
}
