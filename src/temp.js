var products = [{
    "id": "100",
    "name": "iPhone 4S",
    "brand": "Apple",
    "os": "iOS"
},
{
    "id": "101",
    "name": "Moto X",
    "brand": "Motorola",
    "os": "Android"	
},
{
    "id": "102",
    "name": "iPhone 6",
    "brand": "Apple",
    "os": "iOS"
},
{
    "id": "103",
    "name": "Samsung Galaxy S",
    "brand": "Samsung",
    "os": "Android"
},
{
    "id": "104",
    "name": "Google Nexus",
    "brand": "ASUS",
    "os": "Android"
},
{
    "id": "105",
    "name": "Surface",
    "brand": "Microsoft",
    "os": "Windows"
}];
var html = '';
var os_array= new Set();
var brand_array= new Set();
var displayOS = [];
var displayBrand = [];
var prod_to_show = [];
var osDropdown = '';
var brandDropdown = '';
var os_val = 'none1';
var brand_val = 'none1';

$(document).ready(function(){
    for (var i = 0; i<products.length; i++){
        os_array.add(products[i].os)
        brand_array.add(products[i].brand)
    }
        
    display(products);
    

    $('body').on("click", "#close", function(){
        var row_id = $(this).data("row_id");
        $('#'+row_id).hide();

    });
    // Dropdown for OS
    osDropdown = '<label for="os">Filter by OS:</label>\
                    <select name="os" id="os">\
                    <option value = "none1" id = "none">None</option>';

    for (var item of os_array){
        osDropdown += '<option value="'+item+'" id = "'+ item +'">'+ item +'</option>';
    }

    osDropdown+= '</select>'

    // Dropdown for Brand
    brandDropdown = '<label for="brand">Filter by Brand:</label>\
                    <select name="brand" id="brand">\
                    <option value = "none1">None</option>';

    for (var item of brand_array){
        brandDropdown += '<option value="'+item+'">'+ item +'</option>';
    }

    brandDropdown+= '</select>'
    $('table').before(brandDropdown);
    // Dropdown End

    $('table').before(osDropdown);


    $('#os').change(function(){
        var filterValOS = $(this).val();

        for (var i=0; i<products.length; i++){
            if (products[i].os == filterValOS){
                displayOS.push(products[i]);
            }
            else if (filterValOS == 'none1'){
                displayOS = products;
            }
        }
        display(displayOS, osDropdown, brandDropdown);
    });

    $('#brand').change(function(){
        var filterValBrand = $(this).val();

        for (var i=0; i<products.length; i++){
            if (products[i].brand == filterValBrand){
                displayBrand.push(products[i]);
            }
            else if (filterValBrand == 'none1'){
                displayBrand = products;
            }
        }
        display(displayBrand, osDropdown, brandDropdown);
        
    });


    searchBar = '<input type = "text" id = "search" >';




    $('#wrapper').before(searchBar);
    $("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("table tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	  });
    

    // $('#bb').click(function(){
    //     for (var i = 0; i<displayBrand.length; i++){
    //         for (var j = 0 ; j<displayOS.length; j++){
    //             if (displayBrand[i] == displayOS[j]){
    //                 prod_to_show.push(displayOS[j]);
    //             }
    //         }
    //     }
    //     console.log(prod_to_show);
    //     display(prod_to_show);
    // });

});


function display(resultArray, osDropdown, brandDropdown){
    html = '<table>\
            <tr>\
                <th>ID</th>\
                <th>Name</th>\
                <th>Brand</th>\
                <th>Operating System </th>\
                <th>Remove</th>\
            </tr>';

    for (var i=0; i < resultArray.length; i++){
        html += '<tr id='+resultArray[i].id+'>\
        <td>'+resultArray[i].id+'</td>\
        <td>'+resultArray[i].name+'</td>\
        <td>'+resultArray[i].brand+'</td>\
        <td>'+resultArray[i].os+'</td>\
        <td><a href = "#" id = "close" data-row_id='+ resultArray[i].id +' >X</a></td>\
    </tr>'
    }
    // document.getElementById('table').innerHTML = html;
    html+='</table>';
    $('#wrapper').html(html);
    $('table').before(osDropdown);
    $('table').before(brandDropdown);

}