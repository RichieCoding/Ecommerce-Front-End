import React, { Component } from "react";
import "./shop-product-page.styles.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/product-card/ProductCard";
import FilterComponent from "../../Components/filter-component/FilterComponent";

class ShopProductPage extends Component {
  state = {
    filterClicked: false,
    products: this.props.products
  };

  handleClick = () => {
    this.setState(prevState => {
      return { filterClicked: !prevState.filterClicked };
    });
  };

  renderFilterOptions = () => {
    const categories = [];
    this.props.products.map(product => {
      categories.push(product.category);
    });
    return [...new Set(categories)];
  };

  handleFilter = itemChecked => {
    // console.log(Object.keys(filter))
    if (!itemChecked) {
      console.log('bye')
      return this.state.products;
    } else {
      console.log('hello')
      const copiedProducts = [...this.state.products];
      const filterObj = Object.keys(itemChecked);
      for (let i = 0; i < filterObj.length; i++) {
        if (itemChecked[filterObj[i]]) {
          // console.log(filterObj[i])
          copiedProducts.filter(
            product => product.category === 'Funko'
          );
        }
      }
      return copiedProducts
    }
  };

  render() {
    const renderProductCards = this.handleFilter().map(product => {
      return (
        <ProductCard
          key={product.id}
          cart={this.props.cart}
          cartId={this.props.cartId}
          // addToCart={this.addToCart}
          product={product}
          handleCartFetch={this.props.handleCartFetch}
        />
      );
    });
    return (
      <>
        <div className='filter-banner'>
          <p className='filter-all'>All</p>
          <p className='filter-button' onClick={this.handleClick}>
            Filter
          </p>
        </div>
        <FilterComponent
          handleFilter={this.handleFilter}
          categories={this.renderFilterOptions()}
        />
        <div className='shop-product-page'>{renderProductCards}</div>
      </>
    );
  }
}

export default ShopProductPage;
