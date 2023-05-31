document.addEventListener('DOMContentLoaded', function() {
  displayCartItems();
  const cart = localStorage.getItem('cart');
});

const finalizarCompraBtn = document.getElementById('finalizar-compra');

function addCarrinho(productName, price, image) {
  if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({ productName, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    const cart = [{ productName, price, image }];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  alert('Produto adicionado ao carrinho!');
}

function displayCartItems() {
  let cart = localStorage.getItem('cart');

  if (cart) {
    cart = JSON.parse(cart);
    const cartList = document.getElementById('cart-list');
    let totalPrice = 0;

    cart.forEach(function(item) {
      const li = document.createElement('li');
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.productName;
      const name = document.createElement('h3');
      name.textContent = item.productName;
      const price = document.createElement('span');
      price.textContent = 'R$ ' + item.price.toFixed(2);
      li.appendChild(image);
      li.appendChild(name);
      li.appendChild(price);
      cartList.appendChild(li);

      totalPrice += item.price;
    });

    const totalDiv = document.getElementById('total-price');
    totalDiv.textContent = 'Total: R$ ' + totalPrice.toFixed(2);
  }
}

function finalizarCompra() {
  const cpf = document.getElementById('cpf').value;
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const endereco = document.getElementById('endereco').value;
  const cep = document.getElementById('cep').value;
  const numero = document.getElementById('numero').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const produtosSelecionados = JSON.parse(localStorage.getItem('cart'));

  if (cpf && nome && email && endereco && cep && numero && bairro && cidade && produtosSelecionados && produtosSelecionados.length > 0) {
    const dadosCliente = {
      cpf,
      nome,
      email,
      endereco,
      cep,
      numero,
      bairro,
      cidade,
      produtosSelecionados
    };

    localStorage.setItem('dadosCliente', JSON.stringify(dadosCliente));

    alert('Compra Finalizada');
    localStorage.removeItem('cart');
    location.href = 'fincompra.html'; // Redireciona para a página fincompra.html
  } else {
    alert('Por favor, preencha todos os campos e adicione produtos ao carrinho antes de finalizar a compra.');
  }
}

function addCarrinho(productName, price, image) {
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const existingItem = cart.find(item => item.productName === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = { productName, price, image, quantity: 1 };
    cart.push(newItem);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produto adicionado ao carrinho!');
  displayCartItems();
}

function displayCartItems() {
  let cart = localStorage.getItem('cart');

  if (cart) {
    cart = JSON.parse(cart);
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpa a lista antes de recriá-la
    let totalPrice = 0;

    cart.forEach(function(item) {
      const li = document.createElement('li');
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.productName;
      const name = document.createElement('h3');
      name.textContent = item.productName;
      const quantity = document.createElement('span');
      quantity.textContent = 'Quantidade: ' + item.quantity;
      const price = document.createElement('span');
      price.textContent = 'R$ ' + (item.price * item.quantity).toFixed(2);
      const incrementBtn = document.createElement('button');
      incrementBtn.textContent = '+';
      incrementBtn.addEventListener('click', function() {
        incrementQuantity(cart.indexOf(item));
      });
      const decrementBtn = document.createElement('button');
      decrementBtn.textContent = '-';
      decrementBtn.addEventListener('click', function() {
        decrementQuantity(cart.indexOf(item));
      });

      li.appendChild(image);
      li.appendChild(name);
      li.appendChild(quantity);
      li.appendChild(price);
      li.appendChild(incrementBtn);
      li.appendChild(decrementBtn);
      cartList.appendChild(li);

      totalPrice += item.price * item.quantity;
    });
    
    const totalDiv = document.getElementById('total-price');
    totalDiv.textContent = 'Total: R$ ' + totalPrice.toFixed(2);
  }
}

function incrementQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart[index].quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

function decrementQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
  }
}

function limparCarrinho() {
  localStorage.removeItem('cart');
  location.reload();
}


function preencherDadosCliente() {
  const cpf = document.getElementById('cpf').value;
  const dadosCliente = JSON.parse(localStorage.getItem('dadosCliente'));

  if (dadosCliente && dadosCliente.cpf === cpf) {
    document.getElementById('nome').value = dadosCliente.nome;
    document.getElementById('email').value = dadosCliente.email;
    document.getElementById('endereco').value = dadosCliente.endereco;
    document.getElementById('cep').value = dadosCliente.cep;
    document.getElementById('numero').value = dadosCliente.numero;
    document.getElementById('bairro').value = dadosCliente.bairro;
    document.getElementById('cidade').value = dadosCliente.cidade;
  } else {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
  }
}

document.getElementById('cpf').addEventListener('change', preencherDadosCliente);
