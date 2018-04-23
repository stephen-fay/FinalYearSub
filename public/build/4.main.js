webpackJsonp([4],{

/***/ 1060:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_equipment__ = __webpack_require__(1075);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEquipmentPageModule", function() { return AddEquipmentPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddEquipmentPageModule = (function () {
    function AddEquipmentPageModule() {
    }
    return AddEquipmentPageModule;
}());
AddEquipmentPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_equipment__["a" /* AddEquipmentPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_equipment__["a" /* AddEquipmentPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__add_equipment__["a" /* AddEquipmentPage */]
        ]
    })
], AddEquipmentPageModule);

//# sourceMappingURL=add-equipment.module.js.map

/***/ }),

/***/ 1075:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEquipmentPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AddEquipmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddEquipmentPage = (function () {
    function AddEquipmentPage(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.addEquipmentForm = this.formBuilder.group({
            SerialNumber: [''],
            unitId: [''],
            Pad1ExpDate: [''],
            Pad2ExpDate: [''],
            BatteryExpDate: [''],
        });
    }
    AddEquipmentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddEquipmentPage');
    };
    return AddEquipmentPage;
}());
AddEquipmentPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-add-equipment',template:/*ion-inline-start:"C:\Users\Stephen Fay\Desktop\fyp backup\12.12.17\CommunityResponse\src\pages\add-equipment\add-equipment.html"*/'<!--\n  Generated template for the AddEquipmentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>add-equipment</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <form [formGroup]="addEquipmentForm" >\n\n\n   <ion-item>\n     <ion-label stacked>SerialNumber</ion-label>\n     <ion-input formControlName="SerialNumber" type="SerialNumber" placeholder="Unit Serial Number"></ion-input>\n   </ion-item>\n\n\n\n   <button ion-button block type="submit" >\n     Submit\n   </button>\n\n </form>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Stephen Fay\Desktop\fyp backup\12.12.17\CommunityResponse\src\pages\add-equipment\add-equipment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]])
], AddEquipmentPage);

//# sourceMappingURL=add-equipment.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map