/* eslint-disable react/jsx-no-target-blank */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

function ProductTable({ products }) {
  const productRows = products.map(product => <ProductRow key={product.id} product={product} />);
  return (
    <table className="borderedTable">
      <thead align="left">
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.Name}</td>
      <td>
        $
        {product.Price}
      </td>
      <td>{product.Category}</td>
      <td><a href={product.Image} target="_blank">View</a></td>
    </tr>
  );
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
      productImage: form.prdImg.value,
    };
    const { createProduct } = this.props;
    createProduct(prd);
    form.prdName.value = '';
    form.prdPrice.value = '$';
    form.prdImg.value = '';
  }

  render() {
    return (
      <div>
        <form name="productAdd" className="formAdd" onSubmit={this.handleSubmit}>
          <div>
            <p>
              <label htmlFor="category">
                Category
                <br />
                <select id="prdCat" name="category">
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="jackets">Jackets</option>
                  <option value="sweaters">Sweaters</option>
                  <option value="accessories">Accessories</option>
                </select>
              </label>
            </p>
            <p>
              <label htmlFor="price">
                Price Per Unit
                <br />
                <input type="text" name="prdPrice" defaultValue="$" />
              </label>
            </p>
            <p>
              <input type="submit" id="btnAdd" value="Add Product" />
            </p>
          </div>
          <div>
            <p>
              <label htmlFor="name">
                Product Name
                <br />
                <input type="text" name="prdName" />
              </label>
            </p>
            <p>
              <label htmlFor="image">
                Image URL
                <br />
                <input type="text" name="prdImg" />
              </label>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

class Product extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const resposeResult = await response.json();
    this.setState({ products: resposeResult.data.productList });
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    this.loadData();
  }

  render() {
    const { products } = this.state;
    return (
      <div id="mainDiv">
        <h1>My Company Inventory</h1>
        <h3>Showing all availble products</h3>
        <hr />
        <br />
        <ProductTable products={products} />
        <h3>Add a new product to inventory</h3>
        <hr />
        <AddProduct createProduct={this.createProduct} />
      </div>
    );
  }
}

ReactDOM.render(<Product />, document.getElementById('section1'));
