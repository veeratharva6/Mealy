if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded',ready);
}
else
{
    ready();
}

function openCart()
{
    document.getElementById("Cart").style.display = "block";
    updateCart();
}

function closeCart()
{
    document.getElementById("Cart").style.display = "none";
}

function ready()
{
    var removeItemButton = document.getElementsByClassName('remove');
    for(var i = 0; i<removeItemButton.length; i++)
    {
        var button = removeItemButton[i];
        button.addEventListener('click', function(event){
            var clicked = event.target;
            clicked.parentElement.parentElement.remove();
            updateCart();
        });
    }

    var quantities = document.getElementsByClassName('quantity');
    for (var i = 0; i < quantities.length; i++)
    {
        var quantity = quantities[i];
        quantity.addEventListener('change', changed);
    }

    var addCartA = document.getElementsByClassName('add-to-cart');
    for(var i = 0; i < addCartA.length; i++)
    {
        var addCart = addCartA[i];
        addCart.addEventListener('click', addToCartClicked);
    }
}

function changed(event)
{
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0)
    {
        input.value = 1;
    }
    else if (input.value > 20)
    {
        input.value = 20;
        alert('20 Is the maximum item amount');
    }
    updateCart();
}

function addToCartClicked(event)
{
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('buy-title')[0].innerText;
    var priceString = shopItem.getElementsByClassName('buy-price')[0].innerText;
    var price = parseFloat(priceString.replace('$',''));
    addToCart(title,price);
    updateCart();
}

function addToCart(title,price)
{
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cartItem');
    var cartItems = document.getElementsByClassName('cart-popup')[0];
    var cartItemNames = cartItems.getElementsByClassName('buy-title');

    for(var i = 0; i < cartItemNames.length; i++)
    {
        if (title == (cartItemNames[i].textContent.trim()))
        {
            if(cartItemNames[i].parentElement.getElementsByClassName('quantity')[0].value<20)
            {
                cartItemNames[i].parentElement.getElementsByClassName('quantity')[0].value++;
            }
            else
            {
                alert('20 Is the maximum item amount');
            }
            return;
        }
    }
    var cartRowContents = `
        <tr class = "cartItem">
            <td style="text-align: center;" class = "buy-title">
                ${title}
            </td>
            <td style="text-align: center;">
                <input type="number" id="quantity" name="quantity" min="1" max="20" class = "quantity" value="1">
            </td>
            <td style="text-align: center;" class = "price">
                $${price}
            </td>
            <td style="text-align: center;">
                <button class = "remove">
                    Remove
                </button>
            </td>
        </tr>`
    cartRow.innerHTML = cartRowContents;
    cartItems.lastChild.insertBefore(cartRow, cartItems.lastChild.childNodes[2]);
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', function(event){
        var clicked = event.target;
        clicked.parentElement.parentElement.remove();
        updateCart();
    });
    var quantity = cartRow.getElementsByClassName('quantity')[0];
    quantity.addEventListener('change', changed);
}

function updateCart()
{
    var cartItems = document.getElementsByClassName('cart-popup')[0];
    var rows = cartItems.getElementsByClassName('cartItem');
    var total = 0;
    var items = 0;
    for(var i = 0; i < rows.length; i++)
    {
        var row = rows[i];
        var priceString = row.getElementsByClassName('price')[0];
        var price = parseFloat(priceString.innerText.replace('$',''));
        var quantity = row.getElementsByClassName('quantity')[0].value;
        total += price*quantity;
        items += quantity*1;
        console.log(items);
    }
    document.getElementsByClassName('price-total')[0].innerText = 'Total: $' + Math.round(total * 100)/100;
    document.getElementsByClassName('number')[0].innerText = items;
}
