
$(document).ready(function(){
	
	$("#Login").click(function(){
		displayName();
		});		
		
	$("#fRegisterbtn").click(function(){
		validate();
	
		});	
		
	$("#AdminRightBtn").click(function(){	
		location.href = "AddProduct.html";
		});	
		
	$("#AdminLeftBtn").click(function(){
		location.href = "AddVendor.html";	
		});	
		
	$("#fVendorSavebtn").click(function(){
	
	    
		createVendorTable();
	
		});	
		
	$("#fProductSavebtn").click(function(){
		
		createProductTable();
	
		});	

	$("#viewlist").on('click', 'li', function(){
		 var text = $(this).text();
 		 var value = splitMethod(text);
 		 getVendorid(value);
 		 window.location.href = "ProductList.html";	

	});
	
	$("#productlist").on('click', 'li', function(){
		
		location.href = "Product.html";
		 var text = $(this).text();
 		 var value = splitMethod(text);
 		 localStorage.setItem("ProductName",value);
	
	});
	
	$("#Edit").click(function(){
			EnableTextBox();
		});	
		
	$("#Update").click(function(){
		UpdateDetails();
	});	
	
	$("#MyCartRightBtn").click(function(){
		createMyCartTable();
		});	
	
	

});	

var db = openDatabase('Register', '1.0', 'Test DB', 2 * 1024 * 1024);

function createTableandInsert(value1,value2,value3,value4,value5,value6)
{
		db.transaction(function (tx) 
		{
	   		tx.executeSql('CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY ASC ,UserName,Email,Password,ReTypePassword,Address,PhoneNumber)');
			tx.executeSql('SELECT * FROM User WHERE Email=?', 
			 [value2],
			 function(tx, results)
			 {
			   var len = results.rows.length;
			   if(len == 0)
			   {
			       tx.executeSql("INSERT INTO User (UserName,Email,Password,ReTypePassword,Address,PhoneNumber) VALUES (?, ?, ?, ?, ?,?)", 
			   		[ value1, value2, value3,value4,value5,value6]);
			   		}                     
	            },null
			   );
		});
}


function validate()
{
	var emailvalidate = true;
	var pswdvalidate = true;
	var validate = true;
    
	var value1 = $("#fUserName").val();
	var value2 = $("#fEmail").val();
	var value3 = $("#fPassword").val();
	var value4 = $("#fReTypePassword").val();
	var value5 = $("#fAddress").val();
	var value6 = $("#fPhoneNumber").val();
	if(!validateEmail(value2))
	{
		emailvalidate = false;
	}
	if (value3 == "" || value4 == "" || value5 == "" || value6 == "")
	{
		validate = false;
        alert("Please enter All Required Field");
            
    }
    if(value3 != value4)
    {
    	alert("Passwords doesn't match");
    	pswdvalidate = false;
    }
	 if((emailvalidate)&& (validate) && (pswdvalidate)){
		createTableandInsert(value1,value2,value3,value4,value5,value6);
		}

}


function displayName(){
	var value = $("#fLoginEmail").val();
	var value3 = $("#fLoginPassword").val();
	db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM User WHERE Email=?', 
			 [value],
			 function(tx, results)
                 {
                   var len = results.rows.length;
                   if(len!=0)
                   {
	                   var value2 = results.rows.item(0).Email;
					   var value4 = results.rows.item(0).Password;
					   var first_string  = value.localeCompare(value2);
					   var second_string = value3.localeCompare(value4);
	              		
	               		if ((first_string == 0) && (second_string == 0)) 
	               		{
	               			if((value2 == "admin@admin.com") && (value4 == "admin"))
	               			{
	                        		location.href = "Welcome.html";
							}
							else
							{
								location.href = "Welcome.html";
							}
							
							localStorage.setItem("Name", results.rows.item(0).UserName);
	               			localStorage.setItem("Email", results.rows.item(0).Email);
	               			localStorage.setItem("Address", results.rows.item(0).Address);
							localStorage.setItem("PhoneNumber", results.rows.item(0).PhoneNumber);
	
	                     }
	                     
	                  else{
							document.write("Invalid Email or Password");
	                   }
                   }

                 },null
   );
});
}


function displaydetails()
{
    $('#fMyProfileName').prop('readonly', true); 
    $('#fMyProfileAddress').prop('readonly', true);
    $('#fMyProfilePhoneNumber').prop('readonly', true);
    $('#fMyProfileEmail').prop('readonly', true);
	if (typeof(Storage) !== "undefined") {
		$("#fMyProfileName").val(localStorage.getItem("Name"));
		$("#fMyProfileEmail").val(localStorage.getItem("Email"));
		$("#fMyProfileAddress").val(localStorage.getItem("Address"));
		$("#fMyProfilePhoneNumber").val(localStorage.getItem("PhoneNumber"));
    	}
		
}


function EnableTextBox()
{
	$('#fMyProfileName').prop('readonly', false); 
    $('#fMyProfileAddress').prop('readonly', false);
    $('#fMyProfilePhoneNumber').prop('readonly', false);
	
}


function UpdateDetails()
{
	var value1 = $("#fMyProfileName").val();
	var value2 = $("#fMyProfileAddress").val();
	var value3 = $("#fMyProfilePhoneNumber").val();
	var value4 = $("#fMyProfileEmail").val();
 alert(value1);
     db.transaction(function (tx) {
        tx.executeSql("UPDATE User SET UserName = ?, Address = ?,PhoneNumber = ? WHERE Email =?", 
        [value1, value2,value3,value4]);
    });

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email))
    {
    	 alert("Please enter valid email address");
    	 return false;
    }
    return true;
}

function createVendorTable()
{
	var Vendor      = $("#fVendor").val();
	var Address     = $("#fVendorAddress").val();
	var PhoneNumber = $("#fVendorPhoneNumber").val();
	var VendorImage      = $('#DefaultImageVendorDropdown option:selected').text();

	
	 db.transaction(function (tx) 
		{
			tx.executeSql('CREATE TABLE IF NOT EXISTS VendorList(Vendorid INTEGER PRIMARY KEY ASC ,Vendor,Address,PhoneNumber,ImageName)');
			tx.executeSql('SELECT * FROM VendorList WHERE Vendor=?', 
			 [Vendor],
			 function(tx, results)
			 {
			 	var len = results.rows.length;
			 	if(len==0)
			 	{
	          		tx.executeSql("INSERT INTO VendorList (Vendor,Address,PhoneNumber,ImageName) VALUES (?, ?, ?,?)", 
			   		[ Vendor, Address, PhoneNumber,VendorImage]);
		   	}
             },null
		);       
});
}


function createProductTable()
{
	var Vendor = $('#VendorDropdown option:selected').text();
	var ProductName = $("#fProductName").val();
	var Description = $("#fProductDescription").val();
	var Quantity    = $("#fProductQuantity").val();
	var ProductImage      = $('#DefaultImageProductDropdown option:selected').text();

	db.transaction(function (tx) 
	 {
		tx.executeSql('CREATE TABLE IF NOT EXISTS ProductList(Productid INTEGER PRIMARY KEY ASC ,Vendorid, ProductName,Description,Quantity,ProductImageName)');
		tx.executeSql('SELECT Vendorid FROM VendorList WHERE Vendor=?', 
		 [Vendor],
		 function(tx, results)
		 {
		 	var len = results.rows.length;
    		var id  = results.rows.item(0).Vendorid;
		 	if(len!=0)
		 	{
	 			tx.executeSql("INSERT INTO ProductList (Vendorid, ProductName,Description,Quantity,ProductImageName) VALUES (?, ?, ?, ?, ?)", 
	   			[id,ProductName, Description, Quantity, ProductImage]);
	   		}
	   		else
	   		{
	   			alert("Please Add the Vendor");
			}
         },null
	);       
    });
}

function displayProductDetails()
{
	var vendorid = eval(localStorage.getItem('VENDORID'));
	db.transaction(function (tx) 
	 {
		 tx.executeSql('SELECT ProductName,Description,Quantity,ProductImageName FROM ProductList WHERE Vendorid=?', 
		 [vendorid],
		 function(tx, results)
		 {
		    var pdtlistlen = results.rows.length;
		    if(pdtlistlen != 0)
		    {
			   for(i=0 ;i<pdtlistlen;i++)
	           {
			 		$('#productlist').append('<li><a href='+ "#" + '"><img src="' + "images/" + results.rows.item(i).ProductImageName + ".jpg" + '" /><h2>' 
			 		+ results.rows.item(i).ProductName + '</h2>\n<p>' + results.rows.item(i).Description + '</p>\n<p>'
			 		+ results.rows.item(i).Quantity+'</p></li>');
			 		$('#productlist').listview('refresh');
			 	}
		 	}
		 	
		 		
         },null
	);
    });
    
}



function displayVendorDetails()
{
	db.transaction(function (tx) 
	 {
		 tx.executeSql('SELECT Vendor,Address,PhoneNumber,ImageName FROM VendorList', 
		 [],
		 function(tx, results)
		 {
		    var vendorlistlen = results.rows.length;
		    if(vendorlistlen!=0)
		    {
			    for(i=0;i<vendorlistlen;i++)
	            {
	            	var pageURL = $(location).attr("href");
					var htmlpage = pageURL.substr(pageURL.lastIndexOf('/') + 1);
		            if( htmlpage == "AddProduct.html")
			    	{
						$('#VendorDropdown').append($('<option >', {
						    value: i + 1,
						    text: results.rows.item(i).Vendor
						}));
						$('#VendorDropdown').val($('#VendorDropdown').text());
			    	}
			    	else
			    	{
				 		$('#viewlist').append('<li><a href='+ "#" + '"><img src="' + "images/" + results.rows.item(i).ImageName + ".jpg" + '" /><h2>' 
				 		+ results.rows.item(i).Vendor + '</h2>\n<p>' + results.rows.item(i).Address + '</p></li>');
				 		$('#viewlist').listview('refresh');
					
			 			}
		 			}
	 			}
	 		
        	 },null
		);
    });
    
}

function splitMethod(text)
{ 
	 var value = text.split("\n");
	 return value[0];
}

function displayProduct()
{
	var value = localStorage.getItem("ProductName"); 
	db.transaction(function (tx) 
	 {
 		 tx.executeSql('SELECT ProductName,Description,Quantity,ProductImageName FROM ProductList WHERE ProductName = ?', 
		 [value],
		 function(tx, results)
		 {
		 	var len = results.rows.length;
		 	if(len!=0)
		 	{
		 		var productname = results.rows.item(0).ProductName;
		 		if(productname == value)
		 		{
					$("#imgid").attr("src","images/" + results.rows.item(0).ProductImageName + ".jpg");
					$("#ProductName").val(results.rows.item(0).ProductName);
					$("#Description").val(results.rows.item(0).Description);
					$("#Quantity").val(results.rows.item(0).Quantity);
		 		}
		 	}
		  },null
	);
    });
}



function getVendorid(vendorname)
{
	var vendorid = " ";
	db.transaction(function (tx) 
	 {
		 tx.executeSql('SELECT Vendorid FROM VendorList WHERE Vendor=?', 
		 [vendorname],
		 function(tx, results)
		 {
		 	var len = results.rows.length;
		 	if(len!=0)
		 	{
			    vendorid = results.rows.item(0).Vendorid; 
			     localStorage.setItem("VENDORID",vendorid);
		   }
		 
         },null
	);
    });
    
}


function createMyCartTable(productname)
{
	var userid = localStorage.getItem("Email");
	var productName = $("#ProductName").val();
	var description = $("#Description").val();
	var quantity    = $("#Quantity").val();
	var image = $('#imgid').attr('src');
	
	db.transaction(function (tx) 
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS MyCart(Cartid INTEGER PRIMARY KEY ASC ,Userid,ProductName,Description,ImageName)');
		tx.executeSql('SELECT Cartid FROM MyCart WHERE ProductName =? and Userid=?', 
		 [productName,userid],
		 function(tx, results)
		 {
		 	var len = results.rows.length;
		 	if(len==0)
		 	{
		 		if(quantity)
		 		{
          			tx.executeSql("INSERT INTO MyCart(Userid, ProductName, Description, ImageName) VALUES (?, ?, ?, ?)", 
		   			[ userid, productName, description, image]);
		   		}
		   		else{
		   			alert("Sorry Limited Stock");
		   		}
		   		
	   		}
	   		updateMyCart(quantity,productName);
         },null
	);       
});
}

function displayCartDetails()
{
	var userid = localStorage.getItem("Email");
	db.transaction(function (tx) 
	 {
		 tx.executeSql('SELECT * FROM MyCart WHERE Userid=?', 
		 [userid],
		 function(tx, results)
		 {
		    var cartlistlen = results.rows.length;
		    if(cartlistlen != 0)
		    {
			   for(i=0 ;i<cartlistlen;i++)
	           {
			 		$('#mycartlist').append('<li><a href='+ "#" + '"><img src="' + results.rows.item(i).ImageName + '" /><h2>' 
			 		+ results.rows.item(i).ProductName + '</h2>\n<p>' + results.rows.item(i).Description + 
			 		'</p>\n<button style="float:right;width:100px" class="ui-btn" id="DeleteMyCart">' + "Delete" + '</button></li>');
			 		$('#mycartlist').listview('refresh');
			 	}
		 	}
		 	
		 		
         },null
	);
    });
}

function updateMyCart(quantity,productname)
{
	db.transaction(function(tx) {
	if(quantity > 0)
	{
		tx.executeSql("UPDATE ProductList SET Quantity=? WHERE ProductName=?", [quantity -1, productname]);
	}
	});
}

function DeleteMyCart(productname,userid)
{
	db.transaction(function(tx) {
	tx.executeSql("DELETE FROM MyCart WHERE ProductName=? AND Userid=?", [productname, userid]);
	});
   location.reload();
}

function show_error_message(message, delay) {
    $.mobile.loading('show',
                     { theme: "z", text: (message || 'ERROR'),
                       textonly: true, textVisible: true });
    setTimeout(function() {
        $.mobile.loading('hide');
    }, ((delay && delay > 0) ? delay : 1000));
}










