sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
	"sap/ui/demo/walkthrough/controller/HelloDialog",
	"sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, Device) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
	  metadata : {
		 manifest: "json"
      },
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
               name : "World"
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
         
        // set device model
		var oDeviceModel = new JSONModel(Device);
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");
         
         // set dialog
		 this._helloDialog = new HelloDialog(this.getRootControl());
		 // create the views based on the url/hash
		 this.getRouter().initialize();
      },
      
		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

	  exit : function() {
			this._helloDialog.destroy();
			delete this._helloDialog;
	  },

	  openHelloDialog : function () {
			this._helloDialog.open();
	  }
   });
});