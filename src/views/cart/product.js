export default function Product(target, id, product) {
    this.target = target;
    this.id = id;
    this.product = product;

    this.template = function (idx) {
        const li = document.createElement('li');
        idx % 2 ? li.classList.add('items', 'even') : li.classList.add('items');
        li.id = this.id;
        li.innerHTML = `
          <div class="infoWrap">
              <input type="checkbox" class="select-btn"/>
              <div class="cartSection">
                  <img src="./product.png" alt="" class="itemImg" />
                  <h3>${product.name}</h3>
                  <p><input type="text" class="qty" placeholder=${
                      product.quantity
                  } />x ${product.price}</p>
                  <p class="stockStatus">In Stock</p>
              </div>
              <div class="prodTotal cartSection">
                  <p>${product.price * product.quantity}</p>
              </div>
              <div class="cartSection remove-btn">
                  <a href="#" class="remove">x</a>
              </div>
          </div>
      `;
        this.setEvent(li);
        return li;
    };

    this.setEvent = function (elem) {
        const deleteBtn = elem.querySelector('.remove-btn');
        const selectInput = elem.querySelector('.select-btn');
        selectInput.addEventListener('change', this.select.bind(this));
        deleteBtn.addEventListener('click', this.del.bind(this));
    };

    this.select = function () {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            quantity.innerText =
                Number(quantity.innerText) + this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) +
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) +
                this.product.quantity * this.product.price;
        } else {
            quantity.innerText =
                Number(quantity.innerText) - this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) -
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) -
                this.product.quantity * this.product.price;
        }
    };

    this.del = function () {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            quantity.innerText =
                Number(quantity.innerText) - this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) -
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) -
                this.product.quantity * this.product.price;
        }
        const cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[this.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        this.target.removeChild(document.getElementById(this.id));
    };
}