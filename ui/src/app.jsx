/* eslint-disable react/jsx-no-target-blank */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

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
    const form = document.forms.productAddForm;
    const product = {
      Name: form.product.value,
      Price: form.price.value.slice(1),
      Category: form.category.value,
      Image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.price.value = '$';
    form.product.value = '';
    form.image.value = '';
  }

  render() {
    return (
      <div>
        <form name="productAddForm" className="formAdd" onSubmit={this.handleSubmit}>
          <div>
            <p>
              <label htmlFor="category">
                Category
                <br />
                <select id="prdCat" name="category">
                  <option value="shirt">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="jacket">Jackets</option>
                  <option value="sweater">Sweaters</option>
                  <option value="accessories">Accessories</option>
                </select>
              </label>
            </p>
            <p>
              <label htmlFor="price">
                Price Per Unit
                <br />
                <input type="text" name="price" defaultValue="$" />
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
                <input type="text" name="product" />
              </label>
            </p>
            <p>
              <label htmlFor="image">
                Image URL
                <br />
                <input type="text" name="image" />
              </label>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

function ProductTable({ products }) {
  const productRows = products.map(product => <ProductRow key={product.id} product={product} />);
  return (
    <table className="borderedTable">
      <thead>
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

class Product extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    document.forms.productAddForm.price.value = '$';
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
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const newProduct = product;
    const query = `mutation {
            productAdd(product:{
              Name: "${newProduct.Name}",
              Price: ${newProduct.Price},
              Image: "${newProduct.Image}",
              Category: ${newProduct.Category},
            }) {
              _id
            }
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
