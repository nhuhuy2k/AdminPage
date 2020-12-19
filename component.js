const component = {};
component.loginPage = `
<div class="login-container">
<section>
<div class="container" >
    <div  class="login_form">
        <h1>Sign In</h1>
        <form id="login-form" action="">
            <div class="input-wrapper">
                <input type="text" placeholder="Email..." name="email">
                <div class="error" id="email-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="password" placeholder="Password..." name="password">
                <div class="error" id="password-error"></div>
            </div>
            
            <input type="submit"  value="Login">
        </form>
    </div>
</div>
</section>
</div>
`;

component.sideBar = `
<div class="left">
    <span lass="left__icon">
        <span></span>
        <span></span>
        <span></span>
    </span>
    <div class="left__content">
        <div class="left__logo" onclick="view.setScreenBtn('homePage')"><img src="IMG/logoshopbill.png" style="width:210px; height:80px;"> </div>
        <div class="left__profile">
            <div class="left__image"><img src="assets/goku.jfif" alt=""></div>
            <p class="left__name">Supper Saya</p>
        </div>
        <ul class="left__menu">

            <li class=" dropdown">
                <div class="dropbtn" onclick="view.setScreenBtn('homePage')"></i>DashBoard</div>

            </li>
            <li class=" dropdown">
                <div class="dropbtn" onclick="view.setScreenBtn('productPage')">Product<img class="left__iconDown" src="assets/arrow-down.svg" alt=""></div>
                <div class=" dropdown-content">
                    <a onclick="view.setScreenBtn('addProduct')" href="">Add Product</a>
                </div>
            </li>
            <li class=" dropdown">
                <div class="dropbtn" onclick="view.setScreenBtn('categoryPage')">Category<img
                        class="left__iconDown" src="assets/arrow-down.svg" alt=""></div>
                <div class=" dropdown-content">
                    <a onclick="view.setScreenBtn('addCategory')" href="">Add Category</a>
                </div>
            </li>

            <li class=" dropdown">
                <div class="dropbtn" onclick="view.setScreenBtn('customerPage')">Customer</div>
            </li>

            <li class=" dropdown">
                <div class="dropbtn" onclick="view.setScreenBtn('orderPage')">Order<img class="left__iconDown"
                        src="assets/arrow-down.svg" alt=""></div>
                <div class=" dropdown-content">
                    <a onclick="view.setScreenBtn('reportPage')" href="">View Report</a>
                </div>
            </li>
            <li class=" dropdown">
                <div class="dropbtn" onclick="view.signOutButton()">LogOut</div>
            </li>
        </ul>
    </div>
    </div>
    <!-- div Loading -->
    <div id="loading" style=" display: none;">
    <div class="overLay"></div>
    <div class="loader"></div>
</div>
`;

component.homePage = `
    <div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">Dashboard</div>
                    
                    <div class="right__cards">
                        <a class="right__card" onclick="view.setScreenBtn('productPage')"     href="" >
                            <div class="right__cardTitle">Products</div>
                            <div id="productCardNumber" class="right__cardNumber">0</div>
                            <div class="right__cardDesc">View detail <img src="assets/arrow-right.svg" alt=""></div>
                        </a>
                        <a class="right__card" href="" onclick="view.setScreenBtn('customerPage')">
                            <div class="right__cardTitle">Customer</div>
                            <div id="userCardNumber" class="right__cardNumber">0</div>
                            <div class="right__cardDesc">View detail<img src="assets/arrow-right.svg" alt=""></div>
                        </a>                          
                        <a class="right__card" href="" onclick="view.setScreenBtn('orderPage')">
                            <div class="right__cardTitle">Order</div>
                            <div id="orderCardNumber" class="right__cardNumber">0</div>
                            <div class="right__cardDesc">View Detail<img src="assets/arrow-right.svg" alt=""></div>
                        </a>
                    </div>
                    <div class="right__table">
                        <p class="right__tableTitle">New order</p>
                        <div class="right__tableWrapper">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Quantity</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Confirm</th>
                                        <th>View</th>
                                        <th>Edit</th> 
                                        <th>Delete</th> 
                                    </tr>
                                </thead>
                                <tbody id="orders_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                        <a onclick="view.setScreenBtn('orderPage')" class="right__tableMore"><p>View all order</p> <img src="assets/arrow-right-black.svg" alt=""></a>
                    </div>
                </div>
                <!-- div Update, div này bị bẩn -->
                <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <div class="right__title">Edit Product Information<span id="closeBtn" class="close">&times;</span></div>
                            
                            <div class="right">
                                <div class="right__content">
                                    <div id="mainInformation" class="information">
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

component.productPage = `
<div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">View product</div>
                    <div class="right__table">
                        <div class="topnav">
                            <form>
                                <input type="search" placeholder="Search...">
                                <button type="button"><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                        <div class="right__tableWrapper">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th width="230px">Product ID</th>
                                        <th width="180px">Product Name</th>
                                        <th width="100px">Quantity</th>
                                        <th width="150px">Price</th>
                                        <th>Status</th>
                                        <th width="70px">Detail</th>
                                        <th width="70px">Edit</th>
                                        <th width="70px">Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="item_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <!-- div Update, div này bị ẩn -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <div class="right__title">Edit Product Information <span id="closeBtn" class="close">&times;</span></div>
                    
                    <div class="right">
                        <div class="right__content">
                            <div id="mainInformation" class="information">
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
`;

component.addProduct = `
<div class="wrapper">
            <div id="dashBoard" class="dashboard">
                <div class="right">
                    <div class="right__content">
                        <div class="right__title">Add Product</div>
                        <div class="right__formWrapper">
                            <form id="addProductForm"  action="" method="POST" >
                            <div class="add-pro">
                                <div class="row-pro">
                                    <label for=""><b>Name:</b> </label>
                                    <span><input type="text" placeholder="" style="width: 210px;" required></span>
                                </div>
                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for="Color"><b>Category:</b></label>
                                        <select style="width:180px">
                                            <option value="">-- Choose a category -- </option>
                                            <option value=""> Nokia </option>
                                            <option value=""> Xiaomi </option>
                                            <option value=""> Realme </option>
                                            <option value=""> Apple </option>
                                            <option value=""> Oppo </option>
                                            <option value=""> Samsung </option>
                                        </select>
                                    </div>
                                    <div class="col-pro ma-20">
                                        <label for="Color"><b>Corlor:</b></label>
                                        <select style="width:180px">
                                            <option value="">-- Choose a color --</option>
                                            <option value=""> Black </option>
                                            <option value=""> Blue </option>
                                            <option value=""> Pink </option>
                                            <option value=""> Red </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Quantity:</b> </label>
                                        <span><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                        type = "number" maxlength="6" style="width:100px;" required></span>
                                    </div>
                                    <div class="col-pro ma-20">
                                        <label for=""><b>Price:</b> </label>
                                        <span><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                        type = "number" maxlength="10" style="width:100px;" required></span>
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
                                                required></span>
                                    </div>
                                    <div class="col-pro ma-20">
                                        <label for=""><b>RearCamera:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 236px;"
                                                required></span>
                                    </div>
                                </div>
                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Ram:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 150px;"
                                            required></span>
                                    </div>
                                    <div class="col-pro ma-20">
                                        <label for="" style="margin-left:20px"><b>Capacity:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 120px;"
                                                required></span>
                                    </div>
                                </div>
                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Os:</b> </label>
                                        <span><input type="text" style="width:160px" name="os" placeholder="" required></span>
                                    </div>
                                    <div class="col-pro ma-20">
                                        <label for="" style="margin-left:23px"><b>Battery:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 135px;"
                                                required></span>
                                    </div>
                                </div>

                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Display:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 250px;"
                                                required></span>
                                    </div>
                                </div>

                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Chip:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 395px;"
                                                required></span>
                                     </div>
                                </div>

                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>In The Box:</b> </label>
                                        <span><input type="text" placeholder="" style="width: 345px;"
                                                required></span>
                                    </div>
                                </div>
                                <div class="row-pro" >
                                    <div class="col-pro">
                                        <label for=""><b>Image</b> </label>
                                        <span><input type="file" placeholder=""  required></span>
                                    </div>
                                    <div class="col-pro">
                                        <label for="" style="margin-left:50px;"><b>Video</b> </label>
                                        <span><input type="file" placeholder="" required></span>
                                    </div>
                                </div>
                                <div class="row-pro">
                                    <div class="col-pro">
                                        <label for=""><b>Release Date:</b> </label>
                                        <span><input type="date" placeholder="" style="width: 150px;"
                                                required></span>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <button id="addBtn" class="btn" style="margin-top:30px;">Add</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>`;

component.orderPage = `
<div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">View Order</div>
                    <div class="right__table">
                        <div class="topnav">
                            <form>
                                <input type="search" placeholder="Search...">
                                <button type="button"><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                        <div class="right__tableWrapper">
                        <div class="right__tableWrapper">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>ID</th>
                                        <th>Created by Email</th>
                                        <th>Quantity</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Confirm</th>
                                        <th>View</th>
                                        <th>Edit</th> 
                                        <th>Delete</th> 
                                    </tr>
                                </thead>
                                <tbody id="orders_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    <!-- div Update, div này bị bẩn -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="right__title">Edit Product Information <span id="closeBtn" class="close">&times;</span></div>
                
                <div class="right">
                    <div class="right__content">
                        <div id="mainInformation" class="information">
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- div Loading -->
    <div id="loading" style=" display: none;">
        <div class="overLay"></div>
        <div class="loader"></div>
    </div>
</div>
`;

component.customerPage = `
<div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">View Customer</div>
                    <div class="right__table">
                        <div class="topnav">
                            <form>
                                <input type="search" placeholder="Search...">
                                <button type="button"><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                        <div class="right__tableWrapper">
                        <div class="right__tableWrapper">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Orders</th>
                                        <th>MemberShip</th>
                                        <th>Banned</th>
                                        <th>View</th>
                                        <th>Edit</th>
                                        <th>Delete</th> 
                                    </tr>
                                </thead>
                                <tbody id="customer_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    <!-- div Update, div này bị bẩn -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="right__title">Edit Product Information <span id="closeBtn" class="close">&times;</span></div>
                
                <div class="right">
                    <div class="right__content">
                        <div id="mainInformation" class="information">
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- div Loading -->
    <div id="loading" style=" display: none;">
        <div class="overLay"></div>
        <div class="loader"></div>
    </div>
</div>
`;

component.categoryPage = `
<div class="wrapper">
    <div id="dashBoard" class="dashboard">
        <div class="right">
            <div class="right__content">
                <div class="right__title">View Category</div>
                <div class="right__table">
                    <div class="topnav">
                        <form>
                            <input type="search" placeholder="Search...">
                            <button type="button"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                    <div class="right__tableWrapper">
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Category ID</th>
                                    <th>Brand Name</th>
                                    <th>DesCription</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody id="category_tbody">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- div Update, div này bị ẩn -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="right__title">Edit Product Information<span id="closeBtn" class="close">&times;</span></div>
                
                <div class="right">
                    <div class="right__content">
                        <div id="mainInformation" class="information">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

component.addCategory = `
<div class="wrapper">
    <div id="dashBoard" class="dashboard">
        <div class="right">
            <div class="right__content">
                <div class="right__title">Add Category</div>
                <div class="right__formWrapper">
                    <form id="addCategoryForm"  >
                        <div class="right__inputWrapper">
                            <label for="p_category">Brand Name:</label>
                            <input type="text" name="brand" placeholder="Brand Name" style="width:20%;" required>
                            <div class="error" id="brand-error"></div>
                        </div>
                        <div class="right__inputWrapper">
                            <label for="title">Description:</label>
                            <textarea cols="30" rows="5" style="width:60%;" placeholder="Desc... " required></textarea>
                            <div class="error" id="des-error"></div>
                        </div>
                        <div class="right__inputWrapper">
                            <label for="image">Select Image: </label>
                            <input id="photo" type="file" style="width:35%;" name="img" >
                            <div class="error" id="img-error"></div>
                        </div>
                    </form>
                    <button id="addBtn"  class="btn" >Add</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

component.reportPage = `
    <div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">Sales Summary</div>
                    <div class="right__cards">
                        <a class="right__card">
                            <div class="right__cardTitle">Total Orders</div>
                            <div id="orderNumber" class="right__cardNumber">$ 0</div>
                        </a>
                        <a class="right__card">
                            <div class="right__cardTitle">Revenue Total</div>
                            <div id="totalRevenueNumber" class="right__cardNumber">$ 0</div>
                        </a>
                        <a class="right__card">
                            <div class="right__cardTitle">Shipping Cost</div>
                            <div id="shipCostNumber" class="right__cardNumber">$ 0</div>
                        </a>
                        <a class="right__card">
                            <div class="right__cardTitle">Total Profit</div>
                            <div id="totalProfitNumber" class="right__cardNumber">$ 0</div>
                        </a>
                        <a class="right__card">
                            <div class="right__cardTitle">Average Order Size</div>
                            <div id="averageNumber" class="right__cardNumber">$ 0</div>
                        </a>
                    </div>

                    <div class="right_side">
                        <div id="rangeMonths" class="rangeMonths">
                            <h2>DATE RANGE</h2>
                            <div class="str-date">
                                <h4 for="strDate"> START DATE</h4>
                                <input id="strDate" type="date" value="2020-11-01">
                            </div>
                            <div class="end-date">
                                <h4 for="endDate"> END DATE</h4>
                                <input id="endDate" type="date" value="2020-11-30">
                            </div>
                            <button id="viewDateRangeBtn" class="btn" onclick="view.getDateRange()">View</button>
                        </div>
                        <div id="topPerformProduct" class="topPerformProduct">
                            <h2>TOP PERFORM PRODUCT</h2>
                            <table >
                                <thead>
                                    <tr>
                                        <th style="width: 200px;">Product Name</th>
                                        <th style="width: 100px;">Profit</th>
                                        <th style="width: 100px;">Margin</th>
                                    </tr>
                                </thead>
                                <tbody id="topPerformProduct_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    
                    <div class="right__table" style="height:600px;width:900px;">
                        <canvas id="myChart" width="450" height="380"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

component.viewAdminPage = `
<div class="wrapper">
        <div id="dashBoard" class="dashboard">
            <div class="right">
                <div class="right__content">
                    <div class="right__title">View Admin Account</div>
                    <div class="right__table">
                        <div class="topnav">
                            <form>
                                <input id="inputSearch" type="text" placeholder="Search...">
                                <button id="btnSearch" >Search</button>
                            </form>
                        </div>
                        <div class="right__tableWrapper">
                        <div class="right__tableWrapper">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Banned</th>
                                        <th>View</th>
                                        <th>Edit</th>
                                        <th>Delete</th> 
                                    </tr>
                                </thead>
                                <tbody id="adminAccount_tbody">
                                    
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    <!-- div Update, div này bị bẩn -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="right__title">Edit Product Information<span id="closeBtn" class="close">&times;</span></div>
                
                <div class="right">
                    <div class="right__content">
                        <div id="mainInformation" class="information">
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- div Loading -->
    <div id="loading" style=" display: none;">
        <div class="overLay"></div>
        <div class="loader"></div>
    </div>
</div>
`;

