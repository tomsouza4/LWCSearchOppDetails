import { LightningElement, wire, api, track } from "lwc";
import getProducts from "@salesforce/apex/FilteredTableControllerProduct2.getProducts";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import { getPicklistValues } from "lightning/uiObjectInfoApi";
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
//import CODE_FIELD from "@salesforce/schema/Product2.ProductCode";

export default class FilteredTable extends NavigationMixin(LightningElement) {
    @track data;
    searchable = [];
    //wiredProductCount;
    wiredProducts;

    doneTypingInterval = 0;
    productFamilyPickListValues;
    //priorityPickListValues;

    searchAllValue;

    productName = "";
    productCode = "";
    productListPrice = "";
    productDescription = "";
    productFamily = null;
    //priority = null;

    @wire(getProducts, {
        productName: "$productName",
        productCode: "$productCode",
        productListPrice: "$productListPrice",
        productDescription: "$productDescription",
        productFamily: "$productFamily"
    })
    wiredSObjects(result, error) {
        console.log("wire getting called");
        this.wiredProducts = result;
        if (result.data) {
            //console.log("Result.data: ", result.data);
            this.searchable = this.data = result.data.map((productObj, index) => ({
                productData: { ...productObj },
                index: index + 1,
                rowIndex: index
            }));
            console.log("Result.data: ", result.data);
        } else if (result.error) {
            console.error("Error", error);
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: FAMILY_FIELD
    })
    productFamilyPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
        } else if (data) {
            //console.log("data: ", data);
            this.productFamilyPickListValues = [
                { label: "All", value: null },
                ...data.values
            ];
            console.log("this.productFamilyPickListValues: ", this.productFamilyPickListValues);
        }
    }

    handleChange(event) {
        this[event.target.name] = event.target.value;
        console.log("change: ", this[event.target.name]);
    }

    handleKeyUp(event) {
        clearTimeout(this.typingTimer);
        let value = event.target.value;
        let name = event.target.name;

        this.typingTimer = setTimeout(() => {
            this[name] = value;
        }, this.doneTypingInterval);
    }

    clearSearch() {
        this.productName = "";
        this.productCode = "";
        this.productListPrice = "";
        this.productDescription = "";
        this.productFamily = null;
        this.searchable = this.data;
        this.searchAllValue = "";
        this.searchAll();
    }

    handleSearchAll(event) {
        this.searchAllValue = event.target.value;
        this.searchAll();
    }

    searchAll() {
        let searchStr = this.searchAllValue.toLowerCase();
        console.log("searchStr: ", searchStr);
        const regex = new RegExp(
            "(^" + searchStr + ")|(." + searchStr + ")|(" + searchStr + "$)"
        );
        console.log("regex: ", regex);
        if (searchStr.length > 2) {
            this.searchable = this.data.filter((item) => {
                console.log("searchable: ", this.searchable);
                console.log("item: ", JSON.stringify(item));
                // console.log("item.productData.Product2?.ProductCode?.toLowerCase(): ", item.productData.Product2?.ProductCode?.toLowerCase());
                console.log() ;
                if (regex.test(
                    item.productData.Product2.Name.toLowerCase() +
                        " " +
                        item.productData.Product2.Name.toLowerCase()
                ) ||
                regex.test(
                    item.productData.Product2?.ProductCode?.toLowerCase() +
                        " " +
                        item.productData.Product2?.ProductCode?.toLowerCase()
                ) ||
                regex.test(
                    item.productData.UnitPrice +
                        " " +
                        item.productData.UnitPrice                
                ) ||
                regex.test(
                    item.productData.Product2?.Description?.toLowerCase() +
                        " " +
                        item.productData.Product2?.Description?.toLowerCase()
                    ) ||
                regex.test(
                    item.productData.Product2?.Family?.toLowerCase() +
                        " " +
                        item.productData.Product2?.Family?.toLowerCase()
                ) 
                ) {
                    return item;
                }
            });
        } else if (this.productName.length <= 2) {
            this.searchable = this.data;
            console.log("else if this.data: ", this.data);
        }
        console.log("this.searchable: ",this.searchable);
    }

    handleNavigate(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id
            }
        });
    }
}
