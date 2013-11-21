define(["dojo/_base/declare", "dojo/_base/lang", "dojo/dom", "dojo/dom-style", "dojo/router",
	"dojo/dom-class", "dojo/dom-attr", "dojo/dom-construct", "dojo/_base/config", "dojo/sniff",
	"dojox/app/Controller"],
	function (declare, lang, dom, domStyle, router, domClass, domAttr, domConstruct, dconfig, has, Controller){
		// module:
		//		dapp/tests/nestedTestApp/controllers/CustomLogger
		// summary:
		//		A custom router controller to use dojo router to manage transitions
		//
		// To fire the router changes use:
		//		router.go("/foo/bar"); // where /foo/bar matches the route being registered
		//
		return declare(Controller, {

			constructor: function (app){
				// summary:
				//		call setupRouters() to setup the routers to handle.
				//
				// app:
				//		dojox/app application instance.
				//
				this.app = app;
				this.setupRouters();
			},

			setupRouters: function (){
				router.register("/target#P1,S1", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("P1,S1");
				}));
				router.register("/target#P1,S1,V3", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("P1,S1,V3");
				}));
				router.register("/target#V2", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("V2");
				}));
				router.register("/target#P2,S2,Ss2,V5", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("P2,S2,Ss2,V5");
				}));
				router.register("/target#P1,S1,V8", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("P1,S1,V8");
				}));
				router.register("/target#-P1,S1,V8", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("-P1,S1,V8");
				}));
				// NOTE + causes problems with router, so use X instead
				router.register("/target#P2,S2,Ss2,V5XP2,S2,Ss2,V6", lang.hitch(this, function(evt){
					evt.preventDefault();
					this.fireTransiton("P2,S2,Ss2,V5+P2,S2,Ss2,V6");
				}));

			  router.startup();
			},

			fireTransiton: function (target){
				console.log("in CustomRouter fireTransiton called for "+ target);
				var transOpts = {
					title : target,
					target : target,
					url : "#"+target
				};
				// need a domNode, so use this.app.domNode.
				this.app.transitionToView(this.app.domNode,transOpts,null);
			}
		});
	});
