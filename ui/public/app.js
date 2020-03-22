/* eslint-disable react/jsx-no-target-blank */

/* eslint linebreak-style: ["error", "windows"] */

/* eslint "react/react-in-jsx-scope": "off" */

/* globals React ReactDOM */

/* eslint "react/jsx-no-undef": "off" */

/* eslint "no-alert": "off" */
function ProductTable({
  products
}) {
  const productRows = products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "borderedTable"
  }, /*#__PURE__*/React.createElement("thead", {
    align: "left"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
}

function ProductRow({
  product
}) {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.Name), /*#__PURE__*/React.createElement("td", null, "$", product.Price), /*#__PURE__*/React.createElement("td", null, product.Category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: product.Image,
    target: "_blank"
  }, "View")));
}

class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    let price = form.prdPrice.value;
    price = price.slice(1);
    const prd = {
      productName: form.prdName.value,
      productPrice: price,
      productCategory: form.prdCat.value,
      productImage: form.prdImg.value
    };
    const {
      createProduct
    } = this.props;
    createProduct(prd);
    form.prdName.value = '';
    form.prdPrice.value = '$';
    form.prdImg.value = '';
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      className: "formAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "category"
    }, "Category", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
      id: "prdCat",
      name: "category"
    }, /*#__PURE__*/React.createElement("option", {
      value: "shirts"
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "jackets"
    }, "Jackets"), /*#__PURE__*/React.createElement("option", {
      value: "sweaters"
    }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
      value: "accessories"
    }, "Accessories")))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "price"
    }, "Price Per Unit", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdPrice",
      defaultValue: "$"
    }))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      id: "btnAdd",
      value: "Add Product"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Product Name", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdName"
    }))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "image"
    }, "Image URL", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "prdImg"
    }))))));
  }

}

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const resposeResult = await response.json();
    this.setState({
      products: resposeResult.data.productList
    });
  }

  async createProduct(newProduct) {
    const query = `mutation {
            productAdd(product:{
                Name: "${newProduct.productName}",
                Price: ${newProduct.productPrice},
                Image: "${newProduct.productImage}",
                Category: ${newProduct.productCategory},
            }) {_id}
        }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    this.loadData();
  }

  render() {
    const {
      products
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      id: "mainDiv"
    }, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all availble products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: products
    }), /*#__PURE__*/React.createElement("h3", null, "Add a new product to inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddProduct, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Product, null), document.getElementById('section1'));