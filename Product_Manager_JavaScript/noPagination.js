let products = [];
let brands = ["IPhone", "Nokia", "SamSung", "XiaoMi", "Vertu", "BlackBerry", "LG", "HUAWEI"];
const key = "data-mobile";
let submit = $("#submit");

// Retrieve the image from local storage and display it
submit.on("click", async function addproduct() {
  let tbproduct = $("#tbproduct");
  let productName = $("#name").val();
  let productBrand = $("#brand").val();
  const file = $('#fileInput')[0].files[0];
  if (productName == "" || productBrand == ""　|| file == undefined) {

    if (isNullOrEmpty(productName) || isNullOrEmpty(productBrand) || isNullOrEmpty(file)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product name and Image is required!',
      })
    }
  } else {
    let product = new Product(productName, productBrand, await toBase64(file));
    Swal.fire({
      icon: 'success',
      position: "bottom-end",
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
    products.push(product);
    setLocalStorage(key, products);
    tbproduct.append(`<tr id="tr_${products.length - 1}">
                          <td>${(products.length - 1)}</td>
                          <td>${(products[products.length - 1].name)}</td>
                          <td>${(products[products.length - 1].brand)}</td>
                          <td class="image">
                              <img src="${(products[products.length - 1].image)}">
                          </td>
                          <td> <a href="javascript:;"  id="show" class="btn btn-outline-success "  onclick="editProduct(${(products.length - 1)})"><i class="fa fa-edit"> Edit</i></a></td>  
                          <td> <a href="javascript:;" class="btn btn-danger" onclick="removeProduct(${products.length - 1})">Delete</a></td>
                          </tr>
`);
    clearData();
  }
  showProduct();
});

let cancel = $("#cancel");
cancel.on("click", function cancleAll() {
  $("#submit").removeClass("d-none");
  $("#update").addClass("d-none");
  $("#cancel").attr("disabled", true);
  clearData();
});

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

class Product {
  constructor(name, brand, image) {
    this.name = name;
    this.brand = brand;
    this.image = image;
  }
}

class Brand {
  constructor(name) {
    this.name = name;
  }
}

function init() {
  if (window.localStorage.getItem(key) == null) {
    let product1 = new Product("IPhone XS Max", "IPhone", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQDxAQEBAQFxAVEBAVDxAYGRwaGREWGBsbGxsYHTQhGBoxJxMWITIhJTUrOi4xFx8zODMsNygtLisBCgoKDg0OGxAQGysdGCAtLS0tLS0rLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIANQAoAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQYHAAIDAQj/xABSEAABAgMEAwkLBwoFAwUAAAABAgMABBEFEiExBhNBIjI0UWFxcnOyByMzUoGRkrGz0dIUJEJTdLTBFRY1YmNkk5Sh8CWCosLTQ1ThRIOEo6T/xAAbAQACAwEBAQAAAAAAAAAAAAADBAECBQYAB//EADgRAAEDAgQEBAQEBgIDAAAAAAEAAhEDIQQSMUEFUWHwE3GRwSKBobEzUtHhFDJCYnLxFZIGIzT/2gAMAwEAAhEDEQA/ALNti2HlP/IpFKS/QKfeVihlJyqPpOHMJ4sTsBIRYDZA17jz6tqlvOf0SkhIHIBHPRZkBhUwR3yaW484eko3fIEhA5hFed0LT6bRNrkbPuIWyEl99aAsglIVdSCKAAEVJrUmgoBHl5WT+bsplq8BWgvu/FEXthpCpn5FZ7CNagBU1MrU4UNJIwTS9unDWoGwUzrCPQDT+bMyJK0bi1uIWth9CAm9cSpRSoDA1CVUIoQU0IMSvRVGrk9eqmsmVLfdVxlZr+NIHVcWhEptzFeMaLMJSA66+6fGXMPH/dQDmpBKdGpU/RURs767h/qirtNdOJwzbsrJKS0GDddeKQpRVTEJqCAkVpgKkgmtMIadzrTWYcmPkU6UqdKStp5KQm8AKqSoDCtMQRTIgiAGm8NzHRGztnLv5BT06NSg+gr+K78UQfTW05aUvIYbFWxV51Tr11IqBdACsVmoHJz1pY8+/cbUrxQpXmST+EUfpNK69+Wl11KHXX3XzXEpaSAB5y56cTSZnflUVH5GZkPZ2lkw5Uy0vMqHjIUqnlW4VVPm5oZI0itLbLz38yz8MNZRtsblYKW0pUEJQBgabkAbBHVbbV1Ny9f3N4nLeqvU8t2nJWNYYRgtf6LL/i3m6isz3Q3GVqbeROoWk0UkvoqP9HLGo7pw2ic/mmvgjnpfoi7Mu/KJYpUpQSHGlKCTUJAvJJwIIAw2HkiNnQW0PqU/xmvfC7qBBIATDawImVMJfuj3zdQzaC1Gu5S+2T/REFDTl3/s7W9Mf8cQuT0WtNhV9pJbXiL6JhtKsRTMKyg0SFvD/rv/AM4PiivhH8v0VvEHNShnT1Sy4ES1pqLIKnhrUVSBtULmHlgQ91BrxJ7+ZZ+GEDdlWwlTywVX5gFL6zMoJWD4xJx54XK0Knya6pHNrmvfHvCP5foveIOanEh3RA+4lplmfccVW6kTDWwEn6PJWOs5pw614SXtBH/yGfhhfoLoouVcMxNKSld1SUNpIWReFCpVDQmlQBy1OUdtLnJNOtStMw4pTY+TEKQjvuNSsU3mIPkpmajxpBrZIurMcXOgFby3dPLasFzLVaYrurHnRTzUMWtoXpX8sGqeCA8EpWhaDuHUEb9PEeMe4gUZaDVj/JAGDPmdut3gsI1N6gv8t3OkSbuVTCkpbJJ+azJbT0HEXwnmqF4frmBdQiubGu6uSw+AscWqTTmuinlj5/0rW8LcnhLtqddW8pKWkJUVK72g4XcQRStdkfQNicBl+pb7AijLS0gXZukM7NIbS9R1xCmyopJSptut0gYKwEXkjRBQOi7jxtiVEyhaHUKeSttSVJUn5s6SDXGprWu3OLsssf4cx1SeyIqKRt1do27LTbiEtKVrGwyColKUyrxBUogXjujjFuWZ+jpfqkdlML4k2nvZHoC/zHuqEn0PKtOdbl2lvOLffAbQlRUaLJqKZUzrDHQO+bZlQ6lSHEmYStCkkFJDCsCDiDzxkhpI5Ztsz0y02l4qdmm1tqJFUlwK3JANDVI54M0atdc7b7E26lCHHy9VtN6iQiWUkYkYnDODuJykbQhMAzA7z7q6LZ4O50F9kxU0+Pn8vX6md9qIta3T3hYxFUqHnTT8Yq2fH+IsD9jP+2EDwP4o+StjPwfVGVpHiVjkh1o1LX3gnC8oXUkitMyfVEqesNxNKKSsnZdpD1fHGnULG0y6IvMagHkdiFgF75IYwuAibjcA6a7jZQFDgj1TwGZHngy2mAl4pAGQvU47yhX+kSmwVolpSWULoL+CjqFrUVqXS8Sk7lIqMTgBBP4gGk2oBrsmsMPGAM5bb/soOXknaPOI1WkGLLankvrLCkJoq9v5dxKXEpVRdwk40qM6VrUVGMVvLs3phtpQJQp5LZx+jr7vqwj1OqHgmIhMvp5IvKBWsDJQ9KOYdrlQ80Tye0gKJgS6BdQSoNXGgncJGCkqyIG6qMMB59tJ3mpiz1PUqpsslty4AaKWlKqcaTUiEG8TpnEDDlpBO+3f3+YlqvgnUWtLyJcJA6KBqmbiSokADjMQe1psOOqUVAk7a/3QRamjLzTSpiZdbDolWS4hNE53wMK4V2VOUHt90BZcBMqwGaXijWd+u0329u0rjQ7MeWD1zJheoOFO8SqSFCKihHHE67mY73MfapX2C487pymXXZSbZa1Jm2FLcTRAJKXaAqu4FWJFdopHTubjvcz9qlfu7kKnfyTlT4qbXRqR7q57CTWSlh+yb7Aiiu6HKqkrXmHn0HUzXfGXKKpihIUK+MCkggY0IORi99HhSTlgcw22D6IjvOSLTySh1CHEHNC0pUnzKBFeWDAwZSKoHQaVVO2mJlhsiXlG3luuY3a6hxKU1JxJKxgcaAkxcNjorIS4H1SOwIaTUq2xKvJaQlCENukIQlKRvDsAAB5YX6O8DlerRX0RC2Iv35I9C3091Qml8qZO0ZkvJIbmFqdZcINFJUoKIqDmDVJGYMNe5jJLmrTTNNoIYl0uXl0wKlIKQkHacSdtAMYumcsxl4XXUIWk43VISoV46EZ8sdpSUbaSEtpCQnIAAAcwAoPJEGuSzLCkUQHZgUNb6asOD9Rzb+qfNFWzONoy/Uz3tBFnaRnvDnRMVo8K2o11Voe3gmC/F9FTGfg+qdScwtlaHEXbyaEHAbKbcxjDSZ0omXLoq22U0IKVCuHPmOTbC5rcmtEmtKhQ5f8AxHdLhyCG6cV3bx5w3iMCKlQvD3NmJiNgBynQDdc+7DlxJa9zQ6JA0sAPYIR91Tir6szQHLjJ8mcSqy51hyQRLqfbZcQW7wWoDevBeFTiCBgYjykgmtEjLADDKPUtgYXEKzO6TXPywfwAKTaYmB5JrD/+oAC9oupNKWgETD0xMTEmtJCw2UPqK0oChdQlulKmlVEEkmmwJAhzToS8h0g0S6HCNtNbe88FrbNCAhoZ43cubHOFr7SkxDWBkprNnTy3bNkplanBMypCiVAa5KFiopQ1OABxphWOVtPyzMi5LNPsvOPKZupaVeACFJKlHE0G588Rp+bIABQ2q7ShUgVzOZ2nHbATk8kYlKUUrghJxx244mKOAIaHaN07/SEyKDn1BUMkgR3+6ZWY+ykvtTDoZbmGi3rKjc7oHEnLLbHdNnSFKflNvKlb0rW7Xe1rveT8Ihc7aKlLSoJF1BBukVvc8aG0hSnyWUypXVEmvjEk4q58OSFH1hmK0v8AjnOAN/omWnEywtUoxLOh9Eqzq1OgihKnCrMYEjbTAZQw7nAoiY+1Sn3VyIm6QpSlBKUhRrcQDdHIMcBEt7no3MzyTMof/wAizAg6ZPRXxdDwqDBycPdXPYPBWOgn1CD4X2FwWX6CfUIPg6yEHbPBpnqnvZmFVgcDlugnsiGltcGmeqf9mYWaP8DlugnsiFq/fqj0e/RHRkbRkLpiUo0jHeHOgr+gr+EVverajRGRZtAjyvRZOkhpLu9BX9RT8YrVkf4q2BkGbQH/ANx90N4L8VLYv8JPHmXVqbaZwW4TjXiTXiwGBOEGHRafAva5u6aUVrjTHKmGNY2l3C0406BUt1NOcU27cYZp0gSKUllgpNUnXE0ONTQpzN4x0TH1gweExp1mQ3WTzI2gLmauIw9Oq5td5abRd2mVpmwO5d6JJKJWElLu/QopVlsNPKdlYEs2zX5ycmC5NvS0mw6JdltpRbvqShKllbgG5O6oPGOApdMNk1UVKIAK1KVTlUa/jCyyLfl5edm5OfXqG3XS6wtZCG3UuBuoU4cgKLIGANSCagCEsY74jFr7LRwcOptdrI37+aM0v0UmZWXcmZGdmtawFLUytxTiHEpClKFFjcG6K5kE4UBIMboAcDRyS6Gsv10pOHnjzTHTSTYkVSkmW3X3UFuXlmrrhBUFJxCCbgFUqG04ADOhkk1qvk4VhqgwFf5EpB9UK03ktKdyjMF3Zs2UL8wFy7Cm2ltAIKAq7eaqf648sK9PNF5ZqWcmGWm2wgtlK2wBUKUElKgDiN1WsOrP0bcbXrL7awEvBspCr69Yu/VwnCoOVIQaUTj3yN5t9KGgu4EpotNVhxJu7s7ugSTeTC1dr21Sc2am0U/inL8WUNIyk3zRmj+6P5tfYLP41NpJlz9LkwXTtIgAwZ2BItpCNHpATDyk3QogG6kkUKryAK8gvViVz2iDjSL+paW3tWhBwx8U405RWI/oamjju6uqKSU4j6xs4DjwV5jFpt6V0ArKuVAGRNMtm5yh/A+OWNfTa1zfizAgSTIg5ibQJsOdwRAQ+P4ulh8a+lWqvpHKwt+JwEEXgCx+KZJ1Ohsqet6RQ2UKQAm8BUDKt5QNOIbmGugWBmvtEr9xcjfTZ0OupVRIUrdKQn6O6WaU2HI48YjNCRRU2P28p9wXCGJLf4qqGgAXsNrCfqt6mXVOCYeq8lxJFzMkTUg3vdsRNyIMnVW/o8aycsTmW2yfREMIXaPcDleqb7AhhWCLHQ1qprLvjjadH+gwn0cNZKVPG2jsphzaPgXurc7BhNo5wKU6pHZTC9fTvoj0e/qmIjaPAYysLJhKNJuDudExW8tja7fVWj7ZUWdpAO8O9BzsGKxswf4qz9nn/aQzhP5ygYkSwDzUuCY67mmCCDx3jTzUgqz5TWFW5UoJpgnl46ZZQf8AkxP1D3nVBcRxBlJ+QsqOP9rHEeo7GhvICzKLiLEDzISYCOqaZEBQxwIH4x2mpfVqpRSagEBQx4vLDCzbOaWE3w4VLSV1FQgCtAKj6W2DiuCwOuA6NQQb8xt3tEz4RStASBuEBB49zxcgwjxQiSqsFmmF4HYb5PriLvruhRP0L1fJX3RVz0zQpB5gLjMBASbyVHPFLhEQW3XUlRCagUG+UVHlx4ttImiZR95KAtbCC6AptClLCikqoCKJNR6hiaCEGlujplEhThSVKqaBZUCKgHMCmYhOs9zmyF03DaNKnVyOcMxkAAz5+l9JUZlgErSpSSQDugFnHzZc8Hiba+qdrh/6g8laYYeWsK3nSkJIAqo0r5MTSOSJpwjChNCcEJ2NlR8mFeaAU6DqgkR8/wDSexvFMLhKhp1M8gXykgc/zNE9QPM8jXlBSioXkjYkrP8AZMN9Dju5oDbMyY88kofjCKUdK0kmgoQKjI1FcuPmh5oiKOzY/eZH7oqLUWFriDyPslONYhlfA06jJgvbrrYOF/mOvmVcGj3A5Xqm+wIYQv0f4HK9U12BB9YfXGrhaHgXurc7BhNo5wKU6pHZEOZ/wL3Qc7BhLo9wKU6tPZTC9fQd8kej39UwBjIwCPRCqZS63j3h3oOdgxWllfpVr7PP+0izLf8AAO9BzsGKws80tVnqJ72sMYYw4lUqNzZBzKtLRQ7p4cjfrVEjp0vPFdNzBSQUqUk+MlRBptgv8pr/AO5mf9PFzwyXKxwLyf2KYaTK7+ORCa4/rKhhYoqGld8pqyN8NXvzmPG5eKImp4kkqJJOZJJjqxOlA3Lz7dc0ppSvHieaK5+RRn8OLqYbuCDpylWCPJ5oqW1bcQlS0hQ3SlgGuBClEVHngi3LUUU0M1OXFblaNzQg513XFXLPKIJOM3cRjTAc1Yq50iVrcJ4WWOLnmSYixH3VvWdPyJalta82HGUM0BdUClSeQZHEg8YwNREf7pdosvoRqnUOUBBKTWhK0+4xFbPLam6qdfSTXIAgYjjNQc44TrSVHB5agKUvUBrTHCsDfJbAiCncLw6nTxIq5ny0mxFrzIFhztB1F0AQghOsrnuSFUxpzY8xglh9lBCkJCVJQUJxqKXVGu6rVeNKmuGEaJZFQlRC0YVpxV9cHfI5OuAcpj/005Upx4xSlW8MZSPsgcW4PUxWINVjrOA2cdBG09yhg8lVbgCUIuBKU5DDZ56+WGGih7/N/aZH7mqFqkpFQne403NMK4YbDB2iZ7/M/aZH7mqIpuzVHHofZD4phjhuG0qRMlrx01Dz7q4tH+ByvVN9hMHwDo9wOU6pvsJg6HVyS4T3gneg52DCfR/gUp1aeyIcT3gneg52DCawOByvVp7IhbEad9Eeh39UfHojKxlYWTSX294B3oOdgxVaF3bSYP7Gd9rFp28e8O9BzsGKknFUn2T+ynfawWiYzK9FuatSHNydWtbSmQgNtKeddJCEC9sFSdyCTzCAPzhndlnO+hNf8cam0EMzdnvOkhtpcwVkJUogam7kMTiRlEwd0rk0pvCYSQKGgqVbPog1Jxyh2i1rxJICX4xj8ZhcUaVBhc0AaRawP5Xc+aSWRa/yhu+UFtSVKQtsmtFJpXZljtoRtg0vYV2RF5G0UfOFgmjkxMOJwNSFKqMNhx2xLtFJhClN61tlaFgqWXUjcpSSbwUd7kMNsXwdNlSo4OEhoJieRHl8uq6Wm4twjK7hMjoJ376+aFm5JQUUOYKTSqSONII9YiLrZUtwNj6RpTnVT8YsrSWfacCXGUNKDm5W9cGsBTknEbjDGpzGUV3KLrMJPEpPbj2OotaynbKXGI+Y8/8ASb4diKjqL6jhBa2YPMAzbzBsbprKaKBxV1svLUMwkN0zHGrLHOggWdsdKUFaSTTGignl3QorHLKJTZ0xLMN61T5K3r4SNSVBIDlHAaKrut7ewwrSFmkCGk01LhcQ8hTiQU0ug/QJqaqFCNlKQ9iOHYZtOplYRAMH4tWgk3MjaPXpPz3hf/kHGalfDeNXzh72B4ilEPc0WytkWJiHaxYXSWx7M1q7tQlIFVHPaAABtO6h8NDxeu1mL1N7qBWnHvsuWBtEVBt9K1EBIKCTxAOJMWP+cMtXWazDFNLq72dcqZcscm9rjUINXwwIt8GkAky4Tv5dF3fEcfiaVaKTS4RsJv6FVrMyIZUE1qDkaUOdCCNhgKw8Jyc+0yH3MxIbfcDr7i0mqSpZSeQrNIjtkCk9Nj94kPuRjVwxLsK1zjJvfSYzCYFrxskeK1C7C0y7XMPs5W7o9wOV6pvsCDoBsDgcp1TXYTB0GXMLjPeCd6DnYMJLD4HKdWnsiHc54J3oOdgwmsLgcr0E9kQtiNO+iPQ175FGx6I8j2FU2l9unvDvQc7BinraPz1nq5v2pi4rd8A70HewYpy3OGs9XN+1MEp/yv8AJMYP/wCuh/kFq60labq8sxjSNVWYzdvBRrhVNV1zPLiMP6iHOj1hvTy1IZIAQAVrWTdFSaYgE1NDhDxzufOpJCpqTSRSoK1jM4ZpijDVj4JjvqF02K/43xYxGTxLagExtsT+2kBQlLYSKJFB/eJ44cyigEhKZppKcDRQVgbpNBRJw5dpjjbVkuSjpZdCQqgKVAkpUk1AIqK0wIxhvYehUxNMh9KmmkKrcKyupAqCaBOAz5+aJpPqsfNOQ/oSD9ITNathWUGuL2tpWjSOkCPt1noDr1FJ+ctDfDeqyBwI3O2AFtBKiApK6HBab1DiMRUVpzxKk9zyYKC409LPDGgQ4rGmwEileeI2gAZ4Xa3iRlStfVF6j6taDUJdykk+lyPRRh61A5vBcDGsACPoDz6a7owyyQRR5lV5WKglVcjQnDkHNWPSwlIJS60q9SqUpWDnTaMcq+WEjekDWaW3SNirqcYJkbWbdXqwlaFkEpCqY0zpQw7/ABOJeMr3uI5Fx/UrDoUOEMqtdRbTD5sRTaDPQhtuViPVOEbg3k55f2IaNtgk1eZIxoe+Y482EA2NZ633ClF3AFS1rNEpSNpgpKGRj8pbuYnXaqa1VPGv3KFG2+NzyxLqGHqGajGk9Wg/cJrFYqgx2V9QNd30KLS3UbIj8kKWjNj94kPuRiULlVMqSlRSoKSFIWki6pJ2g7YjTP6UnB+3s/7oqC1GhtOG2A5aaFY/EqgfSaQZBcPdWtYHA5TqmuwmDawFYHA5TqmuwmDawJYK5Tng3Og52FQlsIfM5Xq09kQ6m/BudBzsKhLYfA5XoD1CF6+nfRHoa98ijo9Ea0jaFE2gLd8A70HOyYpy2+Gs9XN+2i4bdPeHeg52TFQ2sKzzPVzftjBaQkPHRHwlsXQ/yCn3cd305/7PrXDm3dFnHpnWNuJS27TWhSSVCiQKo46gZGlDjjED0btxck4VNBCg6AFIUaA0OBqMqVPJjEvGnEztl5YDjM0jirxxdjmtZlM/KecrVx1DGMxrsRQLRmAF3NGgA0cRuJG2nUJL3UW7s0wkbJdsCp4nHIkVk/o+QSpRCFAhScADio4niwy2xXlt2w5OPa52iTQJSgA0SBUgY55k144kGjelDzbSZXVMvJbqUa1QSQCrKpNDvvNC9Sn4oeAYzefMHb6pnE4SqMFSp2zsubjk7QncE69LKbSSW/lSC0rC6utCMcE7NnPFVW2NzOc0z/viXv6ZPoSVIlZVsncpWlaSQSD9FOJyiIVrW9ur1bwrnWtfWYJhMIaTMmtydIG1o+SDw+k+mHl8QQAPiDtM0mRbcdeintj2Q6uTlFtKbN9mWIQULAALKNqVY8fLCPTqQLL1mBS75W5OEG4UnCWA4zhtiJy+ixUkFuaeSjEAawigHJfGHNBEnYWodC1uuPLCTdvLCgm9Wu048myH6eHOaZP/AGMekx3aFg4bA1GV2EhoLXAkgtmxB2JP0802lzRl8YXVBpLtSKXNcmoV+oTcCq7Ca4RxcLxcbU7raCt1wJRfuhAu3lKIcTMBwrCEJxIwu3MyrPcUDQBJvgoUF0ukEGoOGUb/AJLQSNycqBv5STuaUu1rfCaYXQrLDLCGH0HTb7j3V+KUXurl9oIH9QG0aEjlsi5NwapsJwbQqYDOCd5rshTAAK1gAGAAoMAIRy5rac4cfD2fn9jVD7dFQTRKbgCQlN26AAKAUwpllCGXQU2nNg1rr7P+5qia7MtETr+xS78Qx1GnSF3A+5/X9JCtmweBynVN9gQZAVgcDlOqb7Ag2FkiuU14NzoOdgwnsQfM5XoD1CHMz4NzoOdlUJ7D4HK9AeoQvX076I9DXvkUbGRkZCgTaXW54B3oOdgxUVrj56z1c57aLdtzwDvQc7Bio7VHz5nqpz2pg1EfzeSNhTGKon+5YpMeBP8AdBHYiPQmPCgu3OJgarRCY6AA8UepRHVIEP0sKfJZ1XGgGxlc0JjshJjdIjpWG2UIWdX4g1gl1l6lHGY6BQGUcAScBWDpORJxMMgNaufxnHHRDLBc0IKoYStn45QwlZIAYwYkgZR41Fy9fiLnnWVklIhMRJ4UtedHE/Z33NUTVpyIY9+l57r7O+5qhPFXb3yKJwyo51YydvcK0LA4HKdU32BBsBWBwOU6pvsCDYVWuucxvHOg52VQnsTgkt0B6hDmY3i+g52TCixOCS3QHqEL19O+iPQ176ouMjI9EKptLrd8A70HOwYqO0+HM9VOe1i3Ld8A70HOwYqG1hWeYp9XO+2MNYO7yqmr4T2P5GUVSMBj0IPLG6GaxrNaBoE8eJ0nCS5agx1Q2THdmWEFasCCSFm4jjLW2poVLcdEMVjoaCOqVhOJicy5+vjXvM7rvLSgGJpDWXSkcUJ2nrx5INEyEiImVmVnPcbpg89SOSF7YBadKjeOWyCUuVMSgZYsmUvxxEXP0rOn94s/7mqJSlykRVBraU4f3izvuaoWxI+DvkVpcJM1/l7hWjYHA5Tqm+wINgKwOBynVN9gQbCq3FpMbxfQc7JhRYnBJboD1CG7+8X0F9kwnsPgkt0B6hC9fTvoj0Ne+qMjYRrG0KpopbbvgHeg52DFS2gPn7PVTvtotq3vAO9BzsmKmnuHs9VO+2hrB/iFKY38JN2JZShUAUxxJ/usd0yKv2fnPuh1ZjCFLCVUAokCoqBU0rywfNS7bbi0FLZKMKhCeIebPKHa+Np0HFhBMRcRuJ3PK65WpinATtMfOJUaEovjb9I+6PFyrmwo9I+6GE5dSvc4AgGnnhih9hhhk6pDjzovKUsBVASaChyy/usN0iKrWuYCc2n7+SqK0tL3EBo6d+w5lRxEosGveyRTAk08uGIjwy7pABTLYLK71VXjhvThijbd49sSez5yXdWlp5hkhw01iAgUx8YfSxGGYxMIkiiwgk7+4T/mI8+EWgSQduvn9our53NbmG+xEESARI6ggjmL6LkiTcGRb9I+6Pfyc8o5tU6R90TKzrADqAs3UJO93AVUctcoFtKRLCgkgbqpSpIoDhj64SZjWuLfgcA4gTbewtM8tkN4rNYKpbDTF7b6WkkJQ1Z6wKAo9I+6OzVnuVxKPSPuh1o/LpdcUFgKCBWmytaY8cEzk0UrWluSCktlIU6ogJ2E0AFSRWGX1WtMQUfB8OrYtuZrmjzMaW3j5DXokEwytAqoCnGD/dIi0njaE4f3iz/uaose3ZVCDdSAAtKqp2ZRW9m8NmvtFn/clQPEEOpSO7FE4YxzMW5jtQPdqtPRxQVJSpHiAHpAUV5agwwiOSs78hm1ykxuWJlanZF472qiStk8SgSojjB5DEkEKrcWrgN1QGd1VPRMIdHHAqTlimlLv9cK+uJCMIhsnMfIJhySmNww8tTsg+cEG8aqZJ2KBOFcxSAVwSEaiYKkMbCNQQcRQxsBCibS+2wdQ5TxHOyYqOfIE8xlQon0DnCgr1GsXRNN1TT8IpTTOUelnapBCmV6+WcKTdULoStCjsqkJGO1H61YYwzstS6XxTM9Kyl63LoHEaQxlrXlnOGJcK0jB5CjVWA3w2kUpXbtEQazNMGShIcCmstytLmHIFgELHKaGGB0ok6eHa9JfwwzXwbatU1RUAmLFsiwA5jl8r3XIHB1mPJAkGLFsgxpv6RBFxMEy0Usqoccv9xhsJNbjMvMMNJmFNJuLavb1aVGhKc1px3ozwrUViGr0sldi2/SX8EcDpNKk79HpL+GH8M4UGta0g5RF9/QyPVGo4d7GZS0kW+hmbg/ZTSxrMmVvB6YQW20qvuuLSlAqMThhiacVBnCxTl5wrG1wqH8Qn8Yj6tJpXx0H/Mv4YIY0plTmtA51r+CC1KwebwABAAsAO/spdQflgNNySSTJJPW3vckyp5ZWl6Gmgh8FSkbwgbOWu3ZhAczbapx9BuFLaAaDOl4Zk0zN0YQgRpZJjJ9onpK+CCPzuk6eGa9Nfwxl0sEWls1Za0gxlAmDIk5jy5fVLvGMdTFN0loj+nWOZUw0acuurxFVJogE0qQcoNYkZxbIDi2WXXHSt5KQVi5gLoJ24DGIIdLZL65o/5l/DHROlsl9an0nfgjRIBMgjbUA6fP22CYoYitRpeF4RI+Y1+RU10idBUKEblKr2OWFfwisrKxnZnPGZkgOdEma+sQTa+mbQaOoQp47EoCwkn9o4sAJTxgVJy5Y37mdkuPTCXlVUhpbr0y/iErmHCk3UcaQAgcVAfGELVy1tMMBns/r9E1w+nVdiX4h7coO1+nPy1sDNt4tm0JFqYQWn20uNqzSocRwI4jyiI1bLbkkEBmYeUlWSXNUunIFKRepzkx7GQBaqXJt2Z+sH8Nr4Y5TNpuPJ1TwbdbUaFCmmyOfLPlj2MiF5aTcmuXZS43MP7oncq1KgMdlUV85jimcfw78r0GfgjIyF3tGY2TLXHKLrcTr/1yvQZ+COD7SniUrcVhQghDAINdhuRkZFco5K4ceaHs7RiWW6pCkmtcVpCG1Hn1aQD5oc/mdK8b/wDHXGRkXBMqhAXL81Zbjf8A47nvjPzVlvGf/mHPfHsZFpKgtC2Z0VlypKSqYoTj84c98NPzHlPGmf5p33xkZHpVClatGWPGf/mHPfHv5tseM/8AzDnvjyMiCSrQFt+bbHjP/wAdz3xqdG2PGf8A47nvjyMiZUwEZZmiEmpzdoUsppRSllR85iYS0uhtKUNpCEJySBQRkZEs5oLtYX//2Q==");
    let product2 = new Product("SamSung Galaxy A50", "SamSung", "data:image/jpeg;base64,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");
    products = [product1, product2];
    setLocalStorage(key, products)
  } else {
    getLocalStorage();
  }
}
function showProduct() {
  let tbproduct = $("#tbproduct");
  tbproduct.empty();
  let option = $("#brand");
  option.empty();
  for (let i = 0; i < brands.length; i++) {
    option.append(`<option value="${brands[i]}" >${brands[i]}</option> `);
  }
  for (let i = products.length - 1; i >= 0; i--) {
    tbproduct.append(`<tr id="tr_${i}">
                              <td>${i}</td>
                              <td>${products[i].name}</td>
                              <td>${products[i].brand}</td>
                              <td>
                                  <img class="image" src="${(products[i].image)}">
                              </td>
                              <td></td>
                              <td> <a href="javascript:;"  id="show" class="btn btn-outline-success "  onclick="editProduct(${i})"><i class="fa fa-edit"> Edit</i></a></td>  
                              <td> <a href="javascript:;" class="btn btn-danger" onclick="removeProduct(${i})">Delete</a></td>
                          </tr>
                          `);
  }
}

function setLocalStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage() {
  products = JSON.parse(window.localStorage.getItem(key));
}

function editProduct(i) {
  $("#submit").addClass("class d-none");
  $("#update").removeClass("d-none");
  $("#cancel").removeAttr("disabled");
  let product = JSON.parse(localStorage.getItem(key))[i];
  $("#name").val(product.name);
  $("#brand").val(product.brand);
  $("#update").val(i);
}

function cancelAll(){
  document.getElementById("submit").classList.remove("d-none");
  document.getElementById("update").classList.add("d-none");
  document.getElementById("cancel").setAttribute("disabled", true);
  clearData();
}

async function updateProduct(i) {
  products[i].name = $("#name").val();
  products[i].brand = $("#brand").val();
  const file = $('#fileInput')[0].files[0];
  if(file != undefined){
    products[i].image = await toBase64(file);
  }
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  });
  setLocalStorage(key, products);
  cancelAll();
  clearData();
  showProduct();
}

function removeProduct(i) {
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
      $("#tr_" + i).remove();
      showProduct();
    }
  })
}

function isNullOrEmpty(str) {
  return str == null || str.trim() == "" || str == undefined;
}

function clearData() {
  $("#name").val("");
  $("#fileInput").val("");
}

function documentReady() {
  init();
  showProduct();
}

documentReady();


