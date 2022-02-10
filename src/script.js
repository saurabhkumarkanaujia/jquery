
$(document).ready(function(){
    display(products);

    $('#os, #brand').on("change", function(){
        selectedOS = $('#os').find('option:selected').val();
        selectedBrand = $('#brand').find('option:selected').val();
        a = filterProducts(selectedOS, selectedBrand);
        display(a);
        console.log('aa');
    });

    $('body').on("click", "#close", function(){
        var row_id = $(this).data("row_id");
        $('#'+row_id).hide();
    });

    //search bar
    $("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("table tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
    
    
});
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
var prod_to_show = [];
var selectedBrand = 'none1';
var selectedOS = 'none1';

for (var i = 0; i<products.length; i++){
    os_array.add(products[i].os)
    brand_array.add(products[i].brand)
}


//filter function
function filterProducts(selectedOS, selectedBrand){
    prod_to_show = [];
    for (i=0; i<products.length; i++){
        if ((selectedOS == products[i].os) && (selectedBrand == products[i].brand)){
            prod_to_show.push(products[i]);
        }
        else if (selectedOS == 'none1' && selectedBrand == 'none1'){
            prod_to_show = products;
        }
        else if (selectedOS == 'none1' && selectedBrand == products[i].brand){
            prod_to_show.push(products[i]);
        }
        else if (selectedOS == products[i].os && selectedBrand == 'none1'){
            prod_to_show.push(products[i]);
        }

    }
    return prod_to_show;
}



//function to render content
function display(result){
    html = '';
    html += dropDown();
    html += '<input type = "text" id = "search" >';

    html += '<table>\
    <tr>\
        <th>ID</th>\
        <th>Name</th>\
        <th>Brand</th>\
        <th>Operating System </th>\
        <th>Remove</th>\
    </tr>';

    for (var i=0; i < result.length; i++){
    html += '<tr id='+result[i].id+'>\
        <td>'+result[i].id+'</td>\
        <td>'+result[i].name+'</td>\
        <td>'+result[i].brand+'</td>\
        <td>'+result[i].os+'</td>\
        <td><a href = "#" id = "close" data-row_id='+ result[i].id +' >X</a></td>\
        </tr>'
    }
    // document.getElementById('table').innerHTML = html;
    
    html+='</table>';

    $('#wrapper').html(html);
    return 
}


//function for DropDown
function dropDown(){
    // Dropdown for OS
    var osDropdown = '<label for="os">Filter by OS:</label>\
                    <select name="os" id="os">\
                    <option value = "none1" id = "none">None</option>';
    for (var item of os_array){
        osDropdown += '<option value="'+item+'" id = "'+ item +'">'+ item +'</option>';
    }
    osDropdown+= '</select>'
    // Dropdown End
    // Dropdown for Brand
    var brandDropdown = '<label for="brand">Filter by Brand:</label>\
                    <select name="brand" id="brand">\
                    <option value = "none1">None</option>';
    for (var item of brand_array){
        brandDropdown += '<option value="'+item+'">'+ item +'</option>';
    }
    brandDropdown+= '</select>'
    // Dropdown End

    return osDropdown+brandDropdown;
}