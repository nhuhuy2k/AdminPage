const view = {};

view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'loginPage':

            document.getElementById('app').innerHTML += component.loginPage;
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                };
                controller.login(data);
            });
            break;
        case 'homePage':
            document.getElementById('app').innerHTML += component.homePage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar)
            model.getProductsData();

            break;
        case 'productPage':
            document.getElementById('app').innerHTML += component.productPage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar)
            view.showProductList();
            view.searchByName();

            break;
        case 'addProduct':
            document.getElementById('app').innerHTML += component.addProduct;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar)
            view.loadOptionCategory();
            document.getElementById('addBtn').addEventListener('click', () => {
                view.addProduct();
            });
            break;
        case 'orderPage':
            document.getElementById('app').innerHTML += component.orderPage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar);
            model.getOrdersData();
            view.searchByName();
            break;

        case 'reportPage':
            document.getElementById('app').innerHTML += component.reportPage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar);
            view.getDateRange();
            break;

        case 'customerPage':
            document.getElementById('app').innerHTML += component.customerPage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar);
            model.getUsersData();
            view.searchByName();
            break;

        case 'categoryPage':
            document.getElementById('app').innerHTML += component.categoryPage;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar);
            view.showCategoryList();
            break;

        case 'addCategory':
            document.getElementById('app').innerHTML += component.addCategory;
            document.getElementById('dashBoard').insertAdjacentHTML('afterbegin', component.sideBar);
            document.getElementById('addBtn').addEventListener('click', () => {
                view.addCategory();
            });
            break;
    }
};

// function này 
view.showDashBoard = (data) => {
    const productCardNumber = document.getElementById('productCardNumber');
    const userCardNumber = document.getElementById('userCardNumber');
    const orderCardNumber = document.getElementById('orderCardNumber');
    const orderTable = document.getElementById('orders_tbody');
    let ordersData = data;
    productCardNumber.innerHTML = model.productsData.length;
    userCardNumber.innerHTML = model.usersData.length;
    orderCardNumber.innerHTML = ordersData.length;
    orderTable.innerHTML = '';
    for (let i = 0; i < 5; i++) {

        orderTable.innerHTML += view.htmlOrderList(ordersData[i], i);
        view.setStatusOrder(ordersData[i], i)
    }
};





// ==================================================================================================================================================


//function của Product==========================================================================================================================

view.showProductList = async () => {
    const data = await model.getProductsData();
    const itemTbody = document.getElementById('item_tbody');
    const status = document.getElementsByClassName('switch');
    itemTbody.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        itemTbody.innerHTML += view.htmlProductList(data[i], i);
        if (data[i].status) {
            status[i].insertAdjacentHTML('afterbegin', `<input class="inputStatus" onclick="model.updateStatus('products','${data[i].id}',false)" type="checkbox" checked>`);
        } else {
            status[i].insertAdjacentHTML('afterbegin', `<input class="inputStatus" onclick="model.updateStatus('products','${data[i].id}',true)" type="checkbox" >`);
        }
    };
};

view.htmlProductList = (data, i) => {
    html = `
    <tr>
        <td>${i + 1}</td>
        <td data-label="Name">${data.id}</td>
        <td data-label="ID"> ${data.name}</td>
        <td data-label="Quantity">${data.availableQuantity}</td>
        <td data-label="Price">${data.price}$</td>
        <td data-label="Status">    
        <label class="switch"> 
            <span class="slider"></span>
        </label>
        </td>
        <td data-label="Detail" class="right__iconTable" onclick="view.showProduct(${i},'view')"><img src="assets/eye.png" alt=""></td>
        <td data-label="Edit" class="right__iconTable" onclick="view.showProduct(${i},'update')"><img src="assets/icon-edit.svg" alt=""></td>
        <td data-label="Delete" class="right__iconTable" onclick="view.removeProduct('${data.id}')"><img src="assets/icon-trash-black.svg" alt=""></td>
    </tr>`;
    return html;
};

// function này check toàn vẹn tham chiếu ( nếu 1 sp có trong 1 order thì sẽ k đc delete )
view.removeProduct = async (id) => {
    let dataOrders = await model.getOrdersData();
    let flag = true;
    console.log(dataOrders);
    for (let order of dataOrders) {
        for (let i = 0; i < order.items.length; i++) {
            if (order.items[i].id == id) {
                flag = false;
                console.log('Cant Delete This Item');
            }
        }
    }
    if (flag) {
        model.removeItem('orders', id)
    } else {
        alert("Can't Delete This Item");
    }
};


//function này load ra list các category hiện có.
view.loadOptionCategory = async () => {
    const optionCategory = document.getElementById('optionCategory');
    const data = await model.getCollectionData('categories');
    console.log(data);
    for (let item of data) {
        optionCategory.innerHTML += `<option value="${item.brand}">${item.brand}</option>`;
    }
}

view.addProduct = async () => {
    let files = document.querySelector("#photo").files;
    const addProductForm = document.getElementById('addProductForm');
    let option = document.getElementsByTagName("option");
    const data = {
        name: addProductForm.name.value,
        price: addProductForm.price.value,
        color: addProductForm.color.value,
        availableQuantity: addProductForm.quantity.value,
        detail: {
            rearCam: addProductForm.rearCam.value,
            fontCam: addProductForm.fontCam.value,
            ram: addProductForm.ram.value,
            capacity: addProductForm.category.value,
            os: addProductForm.os.value,
            chip: addProductForm.chip.value,
            display: addProductForm.display.value,
            battery: addProductForm.battery.value,
            inTheBox: addProductForm.inTheBox.value,
            releaseDate: addProductForm.releaseDate.value,
        },
        video: addProductForm.video.value,
        des: addProductForm.des.value,
        status: true,
        createAt: new Date().toISOString()
    };

    for (let i = 0; i < option.length; i++) {
        if (option[i].selected == true) {
            if (option[i].value != '') {
                data.category = option[i].value;
                view.setErrorMessage('category-error', '')
            } else {
                view.setErrorMessage('category-error', 'Please choose the Category of Item!')
            }
        };
    }

    // if (files.length >= 3) {
    //     if (controller.validateForm(data)) {
    view.loadingScreen('block')
    let img = await model.uploadImgToFirestorage(files);
    view.loadingScreen('none')
    data.img = [...img];
    model.addItem('products', data);
    // }
    // } else {
    //     view.setErrorMessage('img-error', 'Choose at least 4 Images')
    // }
};



// function nay show ra popup cua Detail san pham
view.showProduct = (index, option) => {
    let productsData = model.productsData;
    const mainInformation = document.getElementById('mainInformation');
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const closeBtn = document.getElementById('closeBtn');
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    if (option == 'view') {
        mainInformation.innerHTML = view.htmlDetailProduct(productsData[index]);
    } else if (option == 'update') {
        mainInformation.innerHTML = view.htmlUpdateProductForm(productsData[index]);
        view.loadOptionCategory();

        view.listenEventUpdate(index, 'product');
    }
};

view.updateProduct = async (data) => {
    let files = document.querySelector("#photo").files;
    const updateForm = document.getElementById('updateForm');
    let option = document.getElementsByTagName("option");

    const dataToUpdate = {
        name: updateForm.name.value,
        price: updateForm.price.value,
        color: updateForm.color.value,
        availableQuantity: updateForm.quantity.value,
        detail: {
            rearCam: updateForm.rearCam.value,
            fontCam: updateForm.fontCam.value,
            ram: updateForm.ram.value,
            capacity: updateForm.capacity.value,
            os: updateForm.os.value,
            chip: updateForm.chip.value,
            display: updateForm.display.value,
            battery: updateForm.battery.value,
            inTheBox: updateForm.inTheBox.value,
            releaseDate: updateForm.releaseDate.value,
        },
        video: updateForm.video.value,
        des: updateForm.des.value
    };
    for (let i = 0; i < option.length; i++) {
        if (option[i].selected == true) {
            if (option[i].value != '') {
                dataToUpdate.category = option[i].value;
                view.setErrorMessage('category-error', '')
            } else {
                view.setErrorMessage('category-error', 'Please choose the Category of Item!')
            }
        };
    }

    // if (controller.validateForm(dataToUpdate)) {
    if (files.length > 1 && files.length < 3) {
        console.log('2');
        view.setErrorMessage('img-error', 'Choose at least 4 Images');
    } else if (files.length == 0) {
        dataToUpdate.img = [...data.img];
        console.log('3');
    } else {
        console.log('4');
        view.loadingScreen('block');
        let img = await model.uploadImgToFirestorage(files);
        view.loadingScreen('none');
        dataToUpdate.img = [...img];
    }
    // }

    console.log('5');
    model.update(data.id, dataToUpdate, 'products')
};

view.htmlDetailProduct = (data) => {
    html = `
    <div class="img_pro">
        <div class="img-slider">

            <div class="img-slides">
                <div id="img-0"> <img src="${data.img[0]}"> </div>
                <div id="img-1"><img src="${data.img[1]}" ></div>
                <div id="img-2"><img src="${data.img[2]}" ></div>
                <div id="img-3"><img src="${data.img[3]}" ></div>
            </div>

            <a href="#img-0"> <img src="${data.img[0]}"></a>
            <a href="#img-1"> <img src="${data.img[1]}"></a>
            <a href="#img-2"> <img src="${data.img[2]}"></a>
            <a href="#img-3"> <img src="${data.img[3]}"></a>
        </div>
    </div>
    <div class="main_infor">
        <ul class="parameter">
            <li>
                <div>
                    <h2 style="color:red;">${data.name}</h2>
                </div>
            </li>
            <li>
                <label for="title"><b>Font Camera:</b></label>
                <div>
                    ${data.detail.fontCam}
                </div>
            </li>
            <li>
                <label for="title"><b>Rear Camera:</b></label>
                <div >
                    ${data.detail.rearCam}
                </div>
            </li>
            <li>
                <label for="title"><b>Ram:</b></label>
                <div>
                    ${data.detail.ram}
                </div>
            </li>
            <li>
                <label for="title"><b>Capacity:</b></label>
                <div>
                    ${data.detail.capacity}
                </div>
            </li>
            <li>
                <label for="title"><b>Os:</b></label>
                <div>
                    ${data.detail.os}
                </div>
            </li>
            <li>
                <label for="title"><b>Chip:</b></label>
                <div>
                    ${data.detail.chip}
                </div>
            </li>
            <li>
                <label for="title"><b>Display:</b></label>
                <div>
                    ${data.detail.display}
                </div>
            </li>
            <li>
                <label for="title"><b>Battery:</b></label>
                <div>
                    ${data.detail.battery}
                </div>
            </li>
            <li>
                <label for="title"><b>InTheBox:</b></label>
                <div>
                    ${data.detail.inTheBox}
                </div>
            </li>
            <li>
                <label for="title"><b>Release Date:</b></label>
                <div>
                    ${data.detail.releaseDate}
                </div>
            </li>
            
        </ul>
    </div>
    <div class="tbl-pro-detail" >
        <table>
            <thead>
                <tr>
                    <th class="radius-tl" style="width:30%;">ID</th>
                    <th style="width:20%;">Category</th>
                    <th style="width:17%;">Color</th>
                    <th style="width:28%;">Price</th>
                    <th class="radius-tr" style="width:15%;">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${data.id}</td>
                    <td>${data.category}</td>
                    <td>${data.color}</td>
                    <td>${data.price}$</td>
                    <td>${data.availableQuantity}</td>
                </tr>
            </body>
        </table>
    </div>
    <div class="des-pro-detail">
        <b >Description:</b>
        <textarea cols="30" rows="10" > ${data.des}</textarea>
    </div>
    <div class="video">
    <b>Video introduction product:</b>
           <div>${data.video} </div> 
    </div>`;
    return html
};

view.htmlUpdateProductForm = (data) => {
    const html = ` 
    <form id="updateForm">
    <div class="add-pro">
    <div class="row-pro">
        <label for=""><b>Name:</b> </label>
        <span><input type="text" style="width: 210px;"value="${data.name}" ></span>
        <div class="error" id="name-error"></div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for="Color"><b>Category:</b></label>
            <select style="width:180px" name="category" id="optionCategory">
                <option>${data.category}</option>
                <!-- JS CODE  -->
            </select>
            <div class="error" id="category-error"></div>
        </div>
        <div class="col-pro ma-20">
            <label for="Color"><b>Corlor:</b></label>
            <select style="width:180px">
                <option value="">${data.color}</option>
                <option value=""> Black </option>
                <option value=""> Blue </option>
                <option value=""> Pink </option>
                <option value=""> Red </option>
            </select>
            <div class="error" id="price-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Quantity:</b> </label>
            <span><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type = "number" maxlength="6" style="width:100px;" value="${data.availableQuantity}"></span>
            <div class="error" id="availableQuantity-error"></div>
        </div>
        <div class="col-pro ma-20">
            <label for=""><b>Price:</b> </label>
            <span><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type = "number" maxlength="10" style="width:100px;" value="${data.price}"></span>
            <div class="error" id="price-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <label for=""><b>Description:</b> </label>
        <div class="text-des">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>FontCamera:</b> </label>
            <span><input type="text" placeholder="" style="width: 236px;"
            value="${data.detail.fontCam}"></span>
            <div class="error" id="fontCam-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>RearCamera:</b> </label>
            <span><input type="text" placeholder="" style="width: 236px;"
            value="${data.detail.rearCam}"></span>
            <div class="error" id="rearCam-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Ram:</b> </label>
            <span><input type="text" placeholder="" style="width: 150px;"
            value="${data.detail.ram}"></span>
            <div class="error" id="ram-error"></div>
        </div>
        <div class="col-pro ma-20">
            <label for="" style="margin-left:20px"><b>Capacity:</b> </label>
            <span><input type="text" placeholder="" style="width: 120px;"
            value="${data.detail.capacity}"></span>
            <div class="error" id="os-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Os:</b> </label>
            <span><input type="text" style="width:160px" name="os" placeholder="OS" value="${data.detail.os}"></span>
            <div class="error" id="os-error"></div>
        </div>
        <div class="col-pro ma-20">
            <label for="" style="margin-left:23px"><b>Battery:</b> </label>
            <span><input type="text" placeholder="" style="width: 135px;"
            value="${data.detail.battery}"></span>
            <div class="error" id="battery-error"></div>
        </div>
    </div>

    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Display:</b> </label>
            <span><input type="text" placeholder="" style="width: 160px;"
            value="${data.detail.display}"></span>
            <div class="error" id="display-error"></div>
        </div>
    </div>

    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Chip:</b> </label>
            <span><input type="text" placeholder="" style="width: 395px;"
            value="${data.detail.chip}"></span>
            <div class="error" id="chip-error"></div>
         </div>
    </div>

    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>In The Box:</b> </label>
            <span><input type="text" placeholder="" style="width: 345px;"
            value="${data.detail.inTheBox}"></span>
            <div class="error" id="inTheBox-error"></div>
        </div>
    </div>
    <div class="row-pro" >
        <div class="col-pro">
            <label for=""><b>Image</b> </label>
            <span><input type="file" placeholder=""  required></span>
            <div class="error" id="img-error"></div>
        </div>
        
    </div>
    <div class="row-pro" >
        <div class="col-pro">
            <label for=""><b>Video</b> </label>
            <span><input type="file" placeholder="" required></span>
            <div class="error" id="video-error"></div>
        </div>
    </div>
    <div class="row-pro">
        <div class="col-pro">
            <label for=""><b>Release Date:</b> </label>
            <span><input type="date" placeholder="" style="width: 150px;"
            value="${data.detail.releaseDate}"></span>
            <div class="error" id="releaseDate-error"></div>
        </div>
    </div>
</div>
    </form>
    <button id="addBtn" class="btn" style="margin-top:20px;" disabled >Update</button>`;

    return html;
};

//ORDER======================================================================================

// function cua order
view.showOrderList = (data) => {
    let comfirmBtn = document.getElementById('comfirmBtn');
    const orderTable = document.getElementById('orders_tbody');
    orderTable.innerHTML = ``;
    for (let i = 0; i < data.length; i++) {
        orderTable.innerHTML += view.htmlOrderList(data[i], i);
        view.setStatusOrder(data[i], i)
        //đoạn này set status của order

    };
};

view.htmlOrderList = (data, i) => {
    let html = `
    <tr>
        <td>${i + 1}</td>
        <td>${data.id}</td>
        <td data-label="Email">${data.email}</td> 
        <td data-label="Quantity">${getQuantity(data)}</td>
        <td data-label="Created">${formatDate(data.createAt)}</td>
        <td data-label="Total">${data.total}$</td>
        <td class="orderStatus" data-label="Status">${data.status.toUpperCase()}</td>
        <td class="orderConfirm right__confirm" data-label="Payment" >
            <a href="" class="right__iconTable"><img src="assets/icon-check.svg" alt=""></a>
            <a href="" class="right__iconTable"><img src="assets/icon-x.svg" alt=""></a>
        </td>
        <td data-label="Detail" class="right__iconTable" onclick="view.showOrder(${i},'view')"><img src="assets/eye.png" alt=""></td>
        <td data-label="Edit" class="right__iconTable" onclick="view.showOrder(${i},'update')"><img src="assets/icon-edit.svg" alt=""></td>
        <td data-label="Delete" class="right__iconTable" onclick="model.removeItem('orders','${data.id}')"><img src="assets/icon-trash-black.svg" alt=""></td>
    </tr>`;
    return html;
};

view.htmlDetailOrder = (data) => {
    html = `
    <div class="order_detail">
        <table width="100%">
            <tr>
                <th width="200px">Order ID</th>
                <td>${data.id}</td>
            </tr>
            <tr>
                <th>Customer Name</th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>${data.phone}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${data.email}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>${data.address}, ${data.city}</td>
            </tr>
            <tr>
                <th height="150px">Note</th>
                <td>${data.note}</td>
            </tr>
        </table>
        <div class="donhang">
            <table width="100%">
                <thead>
                    <tr>
                        <th width="200px">Product ID</th>
                        <th>Product Name</th>
                        <th width="120px">Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id ="tbody_itemOrder">
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td rowspan="4" colspan="4">Grand Total</td>
                        <td>${data.total} $</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="tinhtrang">
            <table width="100%">
                <tr>
                    <th width="200px">Created At</th>
                    <td>${formatDate(data.createAt)}</td>
                </tr>
                <tr>
                    <th>Payment Method</th>
                    <td>${data.methodPayment.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>${data.status.toUpperCase()}</td>
                </tr>
            </table>
        </div>
    </div>
 `;
    return html;
};

// function đoạn này show ra trạng thái của đơn hàng ở dashboard
view.setStatusOrder = (data, i) => {
    let orderConfirm = document.getElementsByClassName('orderConfirm');
    if (data.status == 'confirm') {
        orderConfirm[i].innerHTML = `<a  class="right__iconTable"><img src="assets/icon-check.svg" alt=""></a>`;
        orderConfirm[i].style.backgroundColor = '#8BF556';
    } else if (data.status == 'cancel') {
        orderConfirm[i].innerHTML = `<a  class="right__iconTable"><img src="assets/icon-x.svg" alt=""></a>`;
        orderConfirm[i].style.backgroundColor = '#F27C94';
    } else if (data.status == 'wait') {
        orderConfirm[i].innerHTML = `
        <a class="comfirmBtn right__iconTable" onclick="model.updateStatusOrder('${data.id}','confirm')"><img src="assets/icon-check.svg" alt=""></a>
        <a class="comfirmBtn right__iconTable" onclick="model.updateStatusOrder('${data.id}','cancel')"><img src="assets/icon-x.svg" alt=""></a>`;
    }
};

// đoạn này là popup của Detail Order
view.showOrder = (index, option) => {
    let data = model.ordersData;
    let dataItems = data[index].items
    const mainInformation = document.getElementById('mainInformation');
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const closeBtn = document.getElementById('closeBtn');
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    if (option == 'view') {
        mainInformation.innerHTML = view.htmlDetailOrder(data[index]);
        const tbody_itemOrder = document.getElementById('tbody_itemOrder');
        for (let i = 0; i < dataItems.length; i++) {
            tbody_itemOrder.innerHTML += `
            <tr>
                <td data-label="Product ID">${dataItems[i].id}</td>
                <td data-label="Product Name">${dataItems[i].name}</td>
                <td data-label="Quantity">${dataItems[i].inCart}</td>
                <td data-label="Price">${dataItems[i].price}</td>
                <td data-label="Pay">${dataItems[i].inCart * dataItems[i].price} $</td>
            </tr>`;
        }
    } else if (option == 'update') {
        mainInformation.innerHTML = view.htmlInputOrder(data[index]);
        view.setOptionStatus(data[index].status);
        view.listenEventUpdate(index, 'order');
    }
};

// function này set trạng thái hiện tại của đơn hàng trong Detail Order 
view.setOptionStatus = (status) => {
    let option = document.getElementsByTagName("option");
    for (let i = 0; i < option.length; i++) {
        if (option[i].value == status) {
            option[i].defaultSelected = true;
        }
    };
};

view.htmlInputOrder = (data) => {
    html = `
    <form id="updateForm">
        <div class="right__inputWrapper">
            <label for="p_name">Name</label>
            <input type="text" name="name" placeholder="Name" value="${data.name}">
            <div class="error" id="name-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Phone</label>
            <input type="text" name="phone" placeholder="Category" value="${data.phone}">
            <div class="error" id="phone-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Email</label>
            <input type="text" name="email" placeholder="Email" value="${data.email}">
            <div class="error" id="email-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="category">Address</label>
            <input type="text" name="address" placeholder="Address" value="${data.address}">
            <div class="error" id="address-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Note</label>
            <input type="text" name="note" placeholder="Note" value="${data.note}">
            <div class="error" id="note-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Status</label>
            <select id="statusDetailOrder" >
                <option value="wait">Wait</option>
                <option value="confirm" >Confirm</option>
                <option value="cancel">Cancel</option>
            </select>
            <div class="error" id="status-error"></div>
        </div>
    </form>
    <button id="addBtn" class="btn" disabled >Update</button>
 `;
    return html;
};

//function này lắng nghe sự kiện nút update đc ấn hay chưa
view.listenEventUpdate = (index, collection) => {
    let productsData = model.productsData;
    let ordersData = model.ordersData;
    let customersData = model.usersData
    const addBtn = document.getElementById('addBtn');
    let updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('change', () => {

        // đoạn này modify nút update
        addBtn.disabled = false;

        addBtn.addEventListener('click', () => {
            addBtn.disabled = true;
            if (collection == 'product') {
                view.updateProduct(productsData[index]);
            } else if (collection == 'order') {
                view.updateOrder(ordersData[index]);
            } else if (collection == 'customer') {
                view.updateCustomer(customersData[index])
            }

        });
        addBtn.disabled = false;
    });
};

// function này lấy các giá trị input từ UpdateForm 
view.updateOrder = (data) => {
    const updateForm = document.getElementById('updateForm');
    let option = document.getElementsByTagName("option");

    const dataToUpdate = {
        name: updateForm.name.value,
        phone: updateForm.phone.value,
        email: updateForm.email.value,
        note: updateForm.note.value,
        address: updateForm.address.value,
    };


    // đoạn này chạy vògn for để xem ng dùng chọn option nào
    for (let i = 0; i < option.length; i++) {
        if (option[i].selected == true) {
            dataToUpdate.status = option[i].value;
        };
    }
    console.log(dataToUpdate);
    if (controller.validateForm(dataToUpdate)) {
        model.update(data.id, dataToUpdate, 'orders')
    }

};

//CUSTOMER===================================================================================================================

// function này show ra danh sách khách hàng
view.showCustomerList = (data) => {

    const itemTbody = document.getElementById('customer_tbody');
    const status = document.getElementsByClassName('switch');
    itemTbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        itemTbody.innerHTML += view.htmlCustomerList(data[i], i);
        if (data[i].status) {
            status[i].insertAdjacentHTML('afterbegin', `<input class="inputStatus" type="checkbox" onclick="model.updateStatus('users','${data[i].id}',false)" checked>`);
        } else {
            status[i].insertAdjacentHTML('afterbegin', `<input class="inputStatus" type="checkbox" onclick="model.updateStatus('users','${data[i].id}',true)">`);
        }
    };
};

view.showCustomer = async (index, option) => {
    let data = model.usersData;
    const mainInformation = document.getElementById('mainInformation');
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const closeBtn = document.getElementById('closeBtn');
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    if (option == 'view') {
        mainInformation.innerHTML = view.htmlDetailCustomer(data[index]);
        const itemOrder = document.getElementById('tbody_itemOrder');
        const dataOrderOfCustomer = await model.getOrdersDatabyId(data[index].email);

        for (let i = 0; i < dataOrderOfCustomer.length; i++) {
            itemOrder.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td data-label="">${dataOrderOfCustomer[i].id}</td>
                <td data-label="">${dataOrderOfCustomer[i].createAt}</td>
                <td data-label="">${dataOrderOfCustomer[i].status}</td>
                <td data-label="">${dataOrderOfCustomer[i].total} $</td>
            </tr>`;
        }
    } else if (option == 'update') {
        mainInformation.innerHTML = view.htmlInputCustomer(data[index]);
        let optionGender = document.getElementById('optionGender');
        console.log(data[index].gender);
        if (data[index].gender == 'male') {
            optionGender.innerHTML = `
            <option value="male" selected >Male</option>
            <option value="female" >Female</option>`
        } else {
            optionGender.innerHTML = `
            <option value="male" >Male</option>
            <option value="female" selected>Female</option>`
        }
        view.listenEventUpdate(index, 'customer');
    }
};

view.removeCustomer = (collection, id) => {
    let data = model.usersData;
    for (let item of data) {
        if (item.id == id) {
            if (!item.createdOrders) {
                if (confirm('Do You Want Remove This User?')) {
                    model.removeItem(collection, id)
                }
            } else {
                alert("Can't Remove this User!")
            }
        }
    }
};

view.htmlCustomerList = (data, i) => {
    html = `
    <tr>
        <td>${i + 1}</td>
        <td data-label="">${data.id}</td>
        <td data-label="">${data.name}</td>
        <td data-label="">${data.createdOrders}</td>
        <td data-label="">${data.memberShip} point</td>
        <td data-label="">    
            <label class="switch">
                <span class="slider"></span>
            </label>
        </td>
        <td data-label="Detail" class="right__iconTable" onclick="view.showCustomer(${i},'view')"><img src="assets/eye.png" alt=""></td>
        <td data-label="Edit" class="right__iconTable" onclick="view.showCustomer(${i},'update')"><img src="assets/icon-edit.svg" alt=""></td>
        <td data-label="Delete" class="right__iconTable" onclick="view.removeCustomer('users','${data.id}')"><img src="assets/icon-trash-black.svg" alt=""></td>
    </tr>`;
    return html;
};

view.htmlInputCustomer = (data) => {
    html = `
    <form id="updateForm">
        <div class="right__inputWrapper">
            <label for="p_name">Name</label>
            <input type="text" style="width:30%;" name="name" placeholder="Name" value="${data.name}" required>
            <div class="error" id="name-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Date of Birth</label>
            <input type="date" style="width:20%;" name="dob" value ="${data.dob}" >
            <div class="error" id="dob-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Gender</label>
            <select name="category" id="optionGender" style="width:15%;">
                <!-- JS CODE-->
            </select>
            <div class="error" id="gender-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="category">Phone</label>
            <input type="text" style="width:16%;" name="phone" placeholder="Phone" value="${data.phone}">
            <div class="error" id="phone-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Address</label>
            <input type="text" style="width:60%;" name="address" placeholder="Address" value="${data.address}">
            <div class="error" id="address-error"></div>
        </div>
        <div class="right__inputWrapper">
            <label for="title">Password</label>
            <input type="password" style="width:15%;" name="password" placeholder="Password" value="${data.password}">
            <div class="error" id="password-error"></div>
        </div>
    </form>
    <button id="addBtn" style="margin-left: 15%" class="btn" disabled >Update</button>`;
    return html
};

view.htmlDetailCustomer = (data) => {
    html = `
        <div>
        <img style="width:300px; height:300px; border-radius:50%; margin: 0 0 20px 30%;" src="${data.avatar}" alt="">
        </div>
        <div class="customer-info">
            <div class="customer-detail">
                <h1>${data.email}</h1>
            </div>
            <div class="customer-detail">
                <label><b>Name: </b></label><span>${data.name}</span>
            </div>
            <div class="customer-detail">
                <label><b>Date of Birth: </b></label><span>${data.dob}</span>
            </div>
            <div class="customer-detail">
                <label> <b>Gender:</b></label><span>${data.gender}</span>
            </div>
            <div class="customer-detail">
                <label> <b>Phone:</b> </label> <span class="price">${data.phone}$</span>
            </div>
            <div class="customer-detail">
                <label><b> Address: </b></label><span>${data.address}, ${data.city}</span>
            </div>
            <div class="customer-detail">
                <label><b> MemberShip: </b></label><span>${data.memberShip} Point</span>
            </div>
            <div class="customer-detail">
                <label><b> Orders: </b></label>
                <div class="donhang">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th width="200px">Order ID</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id ="tbody_itemOrder">
                            <!--JS CODE  -->    
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>`;
    return html;
};

view.updateCustomer = (data) => {
    const updateForm = document.getElementById('updateForm');
    let option = document.getElementsByTagName("option");

    const dataToUpdate = {
        name: updateForm.name.value,
        dob: updateForm.dob.value,
        phone: updateForm.phone.value,
        address: updateForm.address.value,
        password: updateForm.password.value
    };


    for (let i = 0; i < option.length; i++) {
        if (option[i].selected == true) {
            if (option[i].value != '') {
                dataToUpdate.gender = option[i].value;
                view.setErrorMessage('gender-error', '')
            } else {
                view.setErrorMessage('gender-error', 'Please choose the Gender of Customer!')
            }
        };
    }
    if (view.checkInvalidDate(updateForm.dob.value)) {
        if (controller.validateForm(dataToUpdate)) {
            model.update(data.id, dataToUpdate, 'users');
        }
    }
};
// ==========================================================================================================================

//SEARCH=====================================================================================================================
view.searchByName = () => {
    const inputSearch = document.getElementById('inputSearch');
    inputSearch.addEventListener('input', () => {
        if (model.currentLocationScreen == 'productPage') {
            view.filterProduct(inputSearch.value);
        } else if (model.currentLocationScreen == 'orderPage') {
            view.filterOrder(inputSearch.value);
        }
    })
};

// function này filter keyvalue và trả về sản phẩm có tên hoặc category có chứa kí tự trùng với keyvalue
view.filterProduct = (keyValue) => {
    // lọc theo tên và category
    let data = model.productsData;
    let filterData = data.filter(item => {
        return item.name.toLowerCase().includes(keyValue.toLowerCase()) || item.category.toLowerCase().includes(keyValue.toLowerCase()) || item.id.toLowerCase().includes(keyValue.toLowerCase())
    })
    //sắp xếp alphabet
    filterData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    view.showProductList(filterData);
};

// tương tự cái trên
view.filterOrder = (keyValue) => {
    // lọc theo tên và category
    let data = model.ordersData;
    let filterData = data.filter(item => {
        return item.name.toLowerCase().includes(keyValue.toLowerCase()) || item.id.toLowerCase().includes(keyValue.toLowerCase()) || item.email.toLowerCase().includes(keyValue.toLowerCase())
    })
    //sắp xếp alphabet
    filterData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    view.showOrderList(filterData);
};
// ================================================================================================================================

//CATEGORY=========================================================================================================================

view.showCategoryList = async () => {
    const category_tbody = document.getElementById('category_tbody');
    const data = await model.getCollectionData('categories');
    // console.log(data.length);
    category_tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        category_tbody.innerHTML += view.htmlCategoryList(data[i], i)
    }
};

view.htmlCategoryList = (data, i) => {
    html = `
    <tr>
        <td>${i + 1}</td>
        <td data-label="">${data.id}</td>
        <td data-label="">${data.brand}</td>
        <td data-label="">${data.des}</td>
        <td data-label=""><img src="${data.logo}" alt=""></td>
        <td data-label="Edit" class="right__iconTable" onclick="view.showCustomer(${i},'update')"><img src="assets/icon-edit.svg" alt=""></td>
        <td data-label="Delete" class="right__iconTable" onclick="view.removeCategory('categories', '${data.id}','${data.brand}')"><img src="assets/icon-trash-black.svg" alt=""></td>
    </tr>`;
    return html;
};

view.removeCategory = async (collection, id, brand) => {
    //console.log(collection,id,brand);
    let flag = true;
    let dataProducts = await model.getProductsData();
    for (let data of dataProducts) {
        if (data.category.toLowerCase() == brand.toLowerCase()) {
            flag = false
        }
    }
    if (flag) {
        model.removeItem(collection, id);
    } else {
        alert("Can't Delete This Item!")
    }
};

view.addCategory = async () => {
    let files = document.querySelector("#photo").files;
    const addCategoryForm = document.getElementById('addCategoryForm');
    let dataToAdd = {
        brand: addCategoryForm.brand.value,
        des: addCategoryForm.des.value
    };
    if (controller.validateForm(dataToAdd)) {
        if (await view.checkDuplicateBrand(dataToAdd.brand)) {
            if (files.length != 0) {
                if (confirm('Do You Want Add This Item To Collection?')) {
                    view.loadingScreen('block')
                    let logo = await model.uploadImgToFirestorage(files);
                    dataToAdd.logo = logo;
                    model.addItem('categories', dataToAdd);
                    view.loadingScreen('none');
                    window.location.reload();
                    alert('Add Successful')
                }
            } else {
                view.setErrorMessage('img-error', 'Please Choose 1 Image');
            }
        }
    }
};

// function này check xem tên brand đã tồn tại chưa
view.checkDuplicateBrand = async (inputBrand) => {
    const dataCategory = await model.getCollectionData('categories');
    let flag = true
    for (let data of dataCategory) {
        if (data.brand.toLowerCase() === inputBrand.toLowerCase()) {
            alert('This Brand has already!');
            flag = false;
        }
    }
    return flag;
};

//=================================================================================================================================

// REPORT PAGE=====================================================================================================================

//function này chờ sự kiện click ở màn hình ( vào component tìm)
view.getDateRange = () => {
    let startDate = document.getElementById('strDate').value;
    let endDate = document.getElementById('endDate').value;
    view.showReportPage(startDate, endDate);
    view.loadChart(startDate, endDate);
};

// function show ra trang report
view.showReportPage = async (startDate, endDate) => {
    const dataOrders = await model.getOrdersData();
    let dataRangeByDate = [];
    const topPerformProduct_tbody = document.getElementById('topPerformProduct_tbody')
    const chart = document.getElementById('chart');

    // lấy ra các order trong khảong tgian
    for (let i = 0; i < dataOrders.length; i++) {
        if (formatDate(dataOrders[i].createAt) >= startDate && formatDate(dataOrders[i].createAt) <= endDate) {
            //console.log(formatDate(dataOrders[i].createAt));
            dataRangeByDate.push(dataOrders[i])
        }
    }

    let totalRevenue = view.totalRevenueOrder(dataRangeByDate);
    let dataTopPerformProduct = view.getDataTopPerformProduct(dataRangeByDate);

    document.getElementById('orderNumber').innerText = dataRangeByDate.length;
    document.getElementById('totalRevenueNumber').innerText = `$ ${totalRevenue}`;
    document.getElementById('shipCostNumber').innerText = `$ ${dataRangeByDate.length * 3}`;
    document.getElementById('totalProfitNumber').innerText = `$ ${totalRevenue - dataRangeByDate.length * 3}`;
    document.getElementById('averageNumber').innerText = `$ ${Math.floor(totalRevenue / dataRangeByDate.length)}`;
    //console.log(dataTopPerformProduct);
    topPerformProduct_tbody.innerHTML = '';
    for (let data of dataTopPerformProduct) {
        topPerformProduct_tbody.innerHTML += view.htmlItemTopPerformProduct(data, totalRevenue);
    }
};

//func này load ra cái biểu đồ
view.loadChart = async (startDate, endDate) => {

    let rangeDateValue = view.rangeDate(startDate, endDate)
    console.log(rangeDateValue);
    let dataOrders = await model.getOrdersData();
    dataOrders.sort((a, b) => (a.createAt > b.createAt) ? 1 : ((b.createAt > a.createAt) ? -1 : 0));

    let rangeRevenue = [];
    let i = -1;
    for (let date of rangeDateValue) {
        i++
        for (let createDate of dataOrders) {
            if (date == formatDate(createDate.createAt)) {
                total = view.getOrderTotalbyDay(formatDate(createDate.createAt))
                rangeRevenue[i] = total;
            }
        }
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...rangeDateValue],
            datasets: [{
                label: 'The Line Chart Represents the Revenue',
                data: [...rangeRevenue],
                borderWidth: 1,
                backgroundColor: ['rgba(255,99,132,0.2)'],
                borderColor: ['rgba(255,99,132,1)']

            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return '$ ' + value;
                        }
                    }



                }]
            }
        }
    });
};

// đoạn này tạo bước nhảy giữa các ngày
view.rangeDate = (startDate, endDate) => {
    let listDate = [];
    let dateMove = new Date(startDate);
    let strDate = startDate;
    let jump = 1;
    while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + jump);
    };
    return listDate;
};
//function này tính tổng giá trị order trong 1 ngày
view.getOrderTotalbyDay = (date) => {
    let dataOrders = model.ordersData;
    let orderInDay = [];
    let total = 0;

    for (let data of dataOrders) {
        if (formatDate(data.createAt) == date) {
            orderInDay.push(data)
        }
    }
    for (let order of orderInDay) {
        total += Number(order.total)
    }
    return total;
};

// html của bảng top sản phẩm
view.htmlItemTopPerformProduct = (data, totalRevenue) => {
    let total = data.inCart * data.price;
    let margin = (total / totalRevenue * 100);
    html = `
    <tr>
        <td data-label="">${data.name}</td>
        <td data-label="">$ ${total}</td>
        <td data-label="">${margin.toFixed(2)} %</td>
    </tr>
    `;
    return html;
};

// fucntion này xử lí để lọc ra những sản phẩm đã đc mua trong khoảng tgian chỉ định
view.getDataTopPerformProduct = (dataRangeByDate) => {
    let dataProductTopPerform = [];
    let unique = [];
    let flag = {};
    // vòng for này để lấy tất cả sp có trong các order
    for (let i = 0; i < dataRangeByDate.length; i++) {
        //console.log(dataRangeByDate[i].items);
        for (let j = 0; j < dataRangeByDate[i].items.length; j++) {
            //console.log(dataRangeByDate[i].items[j]);
            dataProductTopPerform.push(dataRangeByDate[i].items[j]);
        }
    }
    // đoạn này lọc ra sp trùng
    dataProductTopPerform.forEach(elm => {
        if (!flag[elm.id]) {
            flag[elm.id] = true;
            unique.push(elm);
        }
        else {
            unique.forEach(item => {
                if (item.id === elm.id) {
                    item.inCart = item.inCart + elm.inCart;
                }
            })
        }
    });
    return unique.sort((a, b) => (a.name > b.name ? 1 : ((b.name < a.name) ? -1 : 0)))
};

//function tính tổng doanh thu từ các order
view.totalRevenueOrder = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i].total);
    }
    return total;
};

// ================================================================================================================================

// function này set Màn hình hiện tại
view.setScreenBtn = (value) => {
    localStorage.setItem('currentLocationScreen', value);
    location.reload();
};

// function này k cần chú thích
view.signOutButton = () => {
    if (confirm('Are you sure?')) {
        firebase.auth().signOut();
        view.setScreenBtn('loginPage')
        localStorage.removeItem('currentLocationScreen');
    }
};

// đoạn này in ra lỗi mỗi khi đoạn input có vấn đề
view.setErrorMessage = (elementId, content) => {
    console.log(elementId);
    document.getElementById(elementId).innerText = content;
};

// function này copy trên mạng
function formatDate(input) {
    var date = new Date(input);
    return [
        date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)
    ].join('-');
};

// function này tính tổng hóa đơn
function getQuantity(data) {
    let total = 0;
    for (let i = 0; i < data.items.length; i++) {
        total = total + data.items[i].inCart;
    }
    return total;
};

// function này bắt lỗi xem ng dùng có nhập sai ngày ( giá trị nhập vào lớn hơn thời điểm hiện tại)
view.checkInvalidDate = (inputDate) => {
    let inpDate = new Date(inputDate);
    let currDate = new Date();
    if (inpDate.setHours(0, 0, 0, 0) >= currDate.setHours(0, 0, 0, 0)) {
        return view.setErrorMessage('dob-error', 'Invalid Date')
    } else {
        return true
    }
};

view.loadingScreen = (value) => {
    document.getElementById('loading').style.display = value;
};