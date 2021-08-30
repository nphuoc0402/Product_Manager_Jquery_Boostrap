let products = [];
let brands = ["IPhone","Nokia","SamSung","XiaoMi","Vertu","BlackBerry"];
const key = "data-mobile";
const defaultPagesize = 10;
const defaultPageindex = 1;

let submit = document.getElementById("submit");
submit.addEventListener("click",addproduct);

let cancel = document.getElementById("cancel");
cancel.addEventListener("click",cancelAll);

let pagesize = document.getElementById("pagesize");
pagesize.addEventListener("change",changePagesize);


class Product {
  constructor(name, brand) {
    this.name = name;
    this.brand = brand;
  }
}
function init() {
  if (window.localStorage.getItem(key) == null) {
  let product1 = new Product("IPhone XS Max", "IPhone");
  let product2 = new Product("SamSung Galaxy A50", "SamSung");
  products = [product1, product2];
  setLocalStorage(key,products)
}else{
  getLocalStorage();
}
}
function showProduct(data, pagesize, pageindex) {
  let tbproduct = document.getElementById("tbproduct");
  let option = document.getElementById("brand");
  option.innerHTML = "";
  for(let i = 0; i < brands.length; i++){
    option.innerHTML += `<option value="${brands[i]}" >${brands[i]}</option> `;
  }
  tbproduct.innerHTML = "";
  let list = data.slice((pageindex -1)* pagesize, pageindex * pagesize);
  for (let i = list.length - 1; i >= 0 ; i--) {
    tbproduct.innerHTML += `<tr id="tr_${i}">
                              <td>${i + (pageindex -1)* pagesize +1  }</td>
                              <td>${list[i].name}</td>
                              <td>${list[i].brand}</td>
                              <td> <a href="javascript:;"  id="show" class="btn btn-outline-success "  onclick="editProduct(${i})"><i class="fa fa-edit"> Edit</i></a></td>  
                              <td> <a href="javascript:;" class="btn btn-danger" onclick="removeProduct(${i})">Delete</a></td>
                          </tr>
                          `;
  }
}
function setLocalStorage(key,data){
    window.localStorage.setItem(key,JSON.stringify(data));
}

function getLocalStorage(){
  products= JSON.parse(window.localStorage.getItem(key));
}

function addproduct() {
  let productName = document.getElementById("name").value;
  let productBrand = document.getElementById("brand").value;
  if (productName == "" || productBrand == "")  {

    if(isNullOrEmpty(productName) || isNullOrEmpty(productBrand)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product name is required!',
      })
    }
  } else {
    let product = new Product(productName, productBrand) ;
    Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
});
  products.push(product);
  setLocalStorage(key, products);
  showProduct(products, defaultPagesize, defaultPageindex);
    clearData();
  }

}

function changeIndex(index){
  let pagesize = parseInt(document.getElementById('pagesize').value);
  buildPaging(products, pagesize, index);
  showProduct(products, pagesize, index);
}

function buildPaging(products, pagesize, pageindex){
  let totalPages = Math.ceil(products.length/pagesize);
  let paging = document.getElementById('paging');
  paging.innerHTML = "";
  for(let i=1; i<= totalPages; i++){
      paging.innerHTML += `<li><button 	 class='btn btn-primary ${pageindex == i ? 'active' : ''}' 
                                              onclick="changeIndex(${i})">${i}</button></li>`;
  }
}



function changePagesize(){
  let pagesize = parseInt(document.getElementById('pagesize').value);
  buildPaging(products,pagesize, defaultPageindex);
  showProduct(products, pagesize, defaultPageindex);
}
   

function editProduct(i){
  document.getElementById("submit").classList.add("class","d-none");
  document.getElementById("update").classList.remove("d-none");
  document.getElementById("cancel").removeAttribute("disabled");
  product = JSON.parse( localStorage.getItem(key))[i];
  document.getElementById("name").value = product.name;
  document.getElementById("brand").value = product.brand;
  document.getElementById("update").value = i;
}

function updateProduct(i){
  products[i].name = document.getElementById("name").value;
  products[i].brand = document.getElementById("brand").value;
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
});
  setLocalStorage(key,products);
  cancelAll();
  clearData();
  showProduct(products, defaultPagesize, defaultPageindex);
}

function cancelAll(){
  document.getElementById("submit").classList.remove("d-none");
  document.getElementById("update").classList.add("d-none");
  document.getElementById("cancel").setAttribute("disabled", true);
  clearData();
}

function removeProduct(i){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
if (result.isConfirmed) {
Swal.fire(
  'Deleted!',
  'Your file has been deleted.',
  'success'
 
)
products.splice(i, 1);
setLocalStorage(key, products);
showProduct(products, defaultPagesize, defaultPageindex);
}
})

}

function isNullOrEmpty(str) {
  return str == null || str.trim() == "";
}

function clearData(){
  document.getElementById("name").value = "";
}

function documentReady() {
  init();
  showProduct(products, defaultPagesize, defaultPageindex);
  buildPaging(products,defaultPagesize, defaultPageindex);
}

documentReady();
